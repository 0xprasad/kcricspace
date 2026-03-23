import { query } from '../config/db.js';

export const createTeam = async ({ ownerUserId, ...payload }) => {
  const result = await query(
    `INSERT INTO teams (owner_user_id, name, short_code, city, home_ground, captain_player_id)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [ownerUserId, payload.name, payload.shortCode, payload.city, payload.homeGround ?? null, payload.captainPlayerId ?? null]
  );
  return query('SELECT * FROM teams WHERE id = ?', [result.insertId]).then((rows) => rows[0]);
};

export const getTeamById = async (id) => {
  const [team] = await query('SELECT * FROM teams WHERE id = ?', [id]);
  const players = await query('SELECT * FROM players WHERE team_id = ? ORDER BY full_name', [id]);
  const stats = await query('SELECT * FROM team_stats WHERE team_id = ?', [id]);
  return { ...team, players, stats: stats[0] ?? null };
};
