import { query } from '../config/db.js';
import { AppError, assertFound } from '../utils/errors.js';

export const createPlayer = async (payload) => {
  if (payload.teamId) {
    const team = await query('SELECT id FROM teams WHERE id = ?', [payload.teamId]);
    assertFound(team[0], 'Team not found for player registration');
  }

  const result = await query(
    `INSERT INTO players
      (user_id, team_id, full_name, date_of_birth, city, role, batting_hand, bowling_style, jersey_number, avatar_url)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      payload.userId ?? null,
      payload.teamId ?? null,
      payload.fullName,
      payload.dateOfBirth ?? null,
      payload.city ?? null,
      payload.role,
      payload.battingHand ?? 'right',
      payload.bowlingStyle ?? null,
      payload.jerseyNumber ?? null,
      payload.avatarUrl ?? null
    ]
  );

  await query('INSERT INTO player_stats (player_id) VALUES (?)', [result.insertId]);
  return getPlayerById(result.insertId);
};

export const listPlayers = async () => query(
  `SELECT p.id, p.full_name, p.role, p.batting_hand, p.bowling_style, t.name AS team_name,
          ps.matches_played, ps.runs_scored, ps.wickets_taken, ps.batting_average, ps.strike_rate
   FROM players p
   LEFT JOIN teams t ON t.id = p.team_id
   LEFT JOIN player_stats ps ON ps.player_id = p.id
   ORDER BY p.full_name`
);

export const getPlayerById = async (id) => {
  const rows = await query(
    `SELECT p.*, t.name AS team_name, t.city AS team_city,
            ps.matches_played, ps.innings_batted, ps.runs_scored, ps.batting_average,
            ps.strike_rate, ps.wickets_taken, ps.bowling_average, ps.economy_rate,
            ps.catches, ps.run_outs
     FROM players p
     LEFT JOIN teams t ON t.id = p.team_id
     LEFT JOIN player_stats ps ON ps.player_id = p.id
     WHERE p.id = ?`,
    [id]
  );

  return assertFound(rows[0], 'Player not found');
};

export const assignPlayerToTeam = async ({ playerId, teamId }) => {
  const team = await query('SELECT id FROM teams WHERE id = ?', [teamId]);
  assertFound(team[0], 'Team not found');

  const result = await query('UPDATE players SET team_id = ? WHERE id = ?', [teamId, playerId]);
  if (!result.affectedRows) throw new AppError('Player not found', 404);

  return getPlayerById(playerId);
};
