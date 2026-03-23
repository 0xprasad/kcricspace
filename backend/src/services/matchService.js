import { query, pool } from '../config/db.js';

export const createMatch = async (payload) => {
  const result = await query(
    `INSERT INTO matches
      (tournament_id, team_a_id, team_b_id, ground_name, city, scheduled_at, overs_per_innings, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, 'scheduled')`,
    [payload.tournamentId, payload.teamAId, payload.teamBId, payload.groundName, payload.city ?? null, payload.scheduledAt, payload.oversPerInnings]
  );
  return query('SELECT * FROM matches WHERE id = ?', [result.insertId]).then((rows) => rows[0]);
};

export const recordBall = async (matchId, event) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [inningsRows] = await connection.execute(
      `SELECT id FROM innings WHERE match_id = ? AND innings_number = ? LIMIT 1`,
      [matchId, event.inningsNumber]
    );

    let inningsId = inningsRows[0]?.id;
    if (!inningsId) {
      const [inningsResult] = await connection.execute(
        `INSERT INTO innings (match_id, innings_number, batting_team_id, bowling_team_id, total_runs, wickets, overs_bowled)
         VALUES (?, ?, 0, 0, 0, 0, 0)`,
        [matchId, event.inningsNumber]
      );
      inningsId = inningsResult.insertId;
    }

    const totalRuns = event.runsBat + (event.extrasRuns ?? 0);
    await connection.execute(
      `INSERT INTO balls
        (innings_id, over_number, ball_in_over, striker_id, bowler_id, runs_bat, extras_type, extras_runs, is_wicket)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [inningsId, event.overNumber, event.ballInOver, event.strikerId, event.bowlerId, event.runsBat, event.extrasType ?? 'none', event.extrasRuns ?? 0, event.isWicket ?? false]
    );

    await connection.execute(
      `UPDATE innings
       SET total_runs = total_runs + ?,
           wickets = wickets + ?,
           overs_bowled = GREATEST(overs_bowled, ? + (? / 10))
       WHERE id = ?`,
      [totalRuns, event.isWicket ? 1 : 0, event.overNumber, event.ballInOver, inningsId]
    );

    await connection.commit();
    return { inningsId, totalRuns };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const getLeaderboard = async () => ({
  topBatsmen: await query(
    `SELECT p.id, p.full_name, ps.runs_scored, ps.batting_average
     FROM player_stats ps JOIN players p ON p.id = ps.player_id
     ORDER BY ps.runs_scored DESC LIMIT 10`
  ),
  topBowlers: await query(
    `SELECT p.id, p.full_name, ps.wickets_taken, ps.bowling_average
     FROM player_stats ps JOIN players p ON p.id = ps.player_id
     ORDER BY ps.wickets_taken DESC LIMIT 10`
  ),
  teamRankings: await query(
    `SELECT t.id, t.name, ts.matches_won, ts.points, ts.net_run_rate
     FROM team_stats ts JOIN teams t ON t.id = ts.team_id
     ORDER BY ts.points DESC, ts.net_run_rate DESC LIMIT 10`
  )
});
