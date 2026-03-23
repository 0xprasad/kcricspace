import { query } from '../config/db.js';
import { AppError, assertFound } from '../utils/errors.js';

export const createTeam = async ({ ownerUserId, ...payload }) => {
  const duplicate = await query('SELECT id FROM teams WHERE name = ? OR short_code = ?', [payload.name, payload.shortCode]);
  if (duplicate.length) throw new AppError('Team name or short code already exists', 409);

  const result = await query(
    `INSERT INTO teams (owner_user_id, name, short_code, city, home_ground, captain_player_id)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [ownerUserId, payload.name, payload.shortCode, payload.city, payload.homeGround ?? null, payload.captainPlayerId ?? null]
  );
  return getTeamById(result.insertId);
};

export const listTeams = async () => query(
  `SELECT t.id, t.name, t.short_code, t.city, t.home_ground,
          captain.full_name AS captain_name,
          COALESCE(ts.matches_played, 0) AS matches_played,
          COALESCE(ts.matches_won, 0) AS matches_won,
          COALESCE(ts.points, 0) AS points,
          COALESCE(ts.net_run_rate, 0) AS net_run_rate
   FROM teams t
   LEFT JOIN players captain ON captain.id = t.captain_player_id
   LEFT JOIN team_stats ts ON ts.team_id = t.id
   ORDER BY t.name`
);

export const getTeamById = async (id) => {
  const rows = await query(
    `SELECT t.*, owner.name AS owner_name, captain.full_name AS captain_name
     FROM teams t
     JOIN users owner ON owner.id = t.owner_user_id
     LEFT JOIN players captain ON captain.id = t.captain_player_id
     WHERE t.id = ?`,
    [id]
  );

  const team = assertFound(rows[0], 'Team not found');
  const players = await query(
    `SELECT p.*, ps.matches_played, ps.runs_scored, ps.wickets_taken
     FROM players p
     LEFT JOIN player_stats ps ON ps.player_id = p.id
     WHERE p.team_id = ?
     ORDER BY p.full_name`,
    [id]
  );
  const stats = await query('SELECT * FROM team_stats WHERE team_id = ?', [id]);
  return { ...team, players, stats: stats[0] ?? null };
};
