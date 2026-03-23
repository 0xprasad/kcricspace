import { query, withTransaction } from '../config/db.js';
import { AppError, assertFound } from '../utils/errors.js';

export const createMatch = async (payload) => {
  if (payload.teamAId === payload.teamBId) throw new AppError('A match requires two distinct teams', 422);

  const result = await query(
    `INSERT INTO matches
      (tournament_id, team_a_id, team_b_id, ground_name, city, scheduled_at, overs_per_innings, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, 'scheduled')`,
    [payload.tournamentId, payload.teamAId, payload.teamBId, payload.groundName, payload.city ?? null, payload.scheduledAt, payload.oversPerInnings]
  );
  return getMatchById(result.insertId);
};

export const getMatchById = async (matchId) => {
  const matches = await query(
    `SELECT m.*, ta.name AS team_a_name, tb.name AS team_b_name, w.name AS winner_team_name
     FROM matches m
     JOIN teams ta ON ta.id = m.team_a_id
     JOIN teams tb ON tb.id = m.team_b_id
     LEFT JOIN teams w ON w.id = m.winner_team_id
     WHERE m.id = ?`,
    [matchId]
  );
  const match = assertFound(matches[0], 'Match not found');
  const innings = await query(
    `SELECT i.*, bt.name AS batting_team_name, bowl.name AS bowling_team_name
     FROM innings i
     JOIN teams bt ON bt.id = i.batting_team_id
     JOIN teams bowl ON bowl.id = i.bowling_team_id
     WHERE i.match_id = ?
     ORDER BY i.innings_number`,
    [matchId]
  );
  return { ...match, innings };
};

const resolveInningsTeams = (match, inningsNumber) => {
  const firstInningsBattingTeamId = match.elected_to === 'bowl' ? match.team_b_id : match.team_a_id;
  const firstInningsBowlingTeamId = firstInningsBattingTeamId === match.team_a_id ? match.team_b_id : match.team_a_id;
  const battingTeamId = inningsNumber % 2 === 1 ? firstInningsBattingTeamId : firstInningsBowlingTeamId;
  const bowlingTeamId = battingTeamId === match.team_a_id ? match.team_b_id : match.team_a_id;
  return { battingTeamId, bowlingTeamId };
};

export const recordBall = async (matchId, event) => withTransaction(async (connection) => {
  const [matchRows] = await connection.execute(
    `SELECT id, team_a_id, team_b_id, elected_to, status
     FROM matches WHERE id = ? LIMIT 1`,
    [matchId]
  );
  const match = assertFound(matchRows[0], 'Match not found');

  const [inningsRows] = await connection.execute(
    `SELECT id FROM innings WHERE match_id = ? AND innings_number = ? LIMIT 1`,
    [matchId, event.inningsNumber]
  );

  let inningsId = inningsRows[0]?.id;
  if (!inningsId) {
    const { battingTeamId, bowlingTeamId } = resolveInningsTeams(match, event.inningsNumber);
    const [inningsResult] = await connection.execute(
      `INSERT INTO innings (match_id, innings_number, batting_team_id, bowling_team_id, total_runs, wickets, overs_bowled)
       VALUES (?, ?, ?, ?, 0, 0, 0)`,
      [matchId, event.inningsNumber, battingTeamId, bowlingTeamId]
    );
    inningsId = inningsResult.insertId;
  }

  const totalRuns = event.runsBat + (event.extrasRuns ?? 0);
  const isLegalDelivery = !['wide', 'no_ball'].includes(event.extrasType ?? 'none');

  await connection.execute(
    `INSERT INTO balls
      (innings_id, over_number, ball_in_over, striker_id, non_striker_id, bowler_id, runs_bat, extras_type, extras_runs, is_wicket, dismissal_type)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      inningsId,
      event.overNumber,
      event.ballInOver,
      event.strikerId,
      event.nonStrikerId ?? null,
      event.bowlerId,
      event.runsBat,
      event.extrasType ?? 'none',
      event.extrasRuns ?? 0,
      event.isWicket ?? false,
      event.dismissalType ?? null
    ]
  );

  await connection.execute(
    `UPDATE innings
     SET total_runs = total_runs + ?,
         wickets = wickets + ?,
         overs_bowled = CASE WHEN ? THEN GREATEST(overs_bowled, ? + (? / 10)) ELSE overs_bowled END
     WHERE id = ?`,
    [totalRuns, event.isWicket ? 1 : 0, isLegalDelivery ? 1 : 0, event.overNumber, event.ballInOver, inningsId]
  );

  await connection.execute(`UPDATE matches SET status = 'live', started_at = COALESCE(started_at, NOW()) WHERE id = ?`, [matchId]);

  return getMatchById(matchId);
});

export const getLeaderboard = async () => ({
  topBatsmen: await query(
    `SELECT p.id, p.full_name, p.role, t.name AS team_name, ps.runs_scored, ps.batting_average, ps.strike_rate
     FROM player_stats ps
     JOIN players p ON p.id = ps.player_id
     LEFT JOIN teams t ON t.id = p.team_id
     ORDER BY ps.runs_scored DESC, ps.strike_rate DESC LIMIT 10`
  ),
  topBowlers: await query(
    `SELECT p.id, p.full_name, p.role, t.name AS team_name, ps.wickets_taken, ps.bowling_average, ps.economy_rate
     FROM player_stats ps
     JOIN players p ON p.id = ps.player_id
     LEFT JOIN teams t ON t.id = p.team_id
     ORDER BY ps.wickets_taken DESC, ps.economy_rate ASC LIMIT 10`
  ),
  teamRankings: await query(
    `SELECT t.id, t.name, t.city, ts.matches_won, ts.points, ts.net_run_rate
     FROM team_stats ts
     JOIN teams t ON t.id = ts.team_id
     ORDER BY ts.points DESC, ts.net_run_rate DESC LIMIT 10`
  )
});
