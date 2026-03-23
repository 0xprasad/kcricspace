import { query } from '../config/db.js';

export const listTournaments = async () => query(
  `SELECT t.*, COUNT(tt.team_id) AS registeredTeams
   FROM tournaments t
   LEFT JOIN tournament_teams tt ON tt.tournament_id = t.id
   GROUP BY t.id
   ORDER BY t.start_date DESC`
);

export const createTournament = async (payload) => {
  const result = await query(
    `INSERT INTO tournaments
      (name, slug, description, type, format, city, venue, start_date, end_date, registration_deadline, max_teams, entry_fee, prize_pool, status, created_by)
     VALUES (?, LOWER(REPLACE(?, ' ', '-')), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'draft', ?)`,
    [
      payload.name,
      payload.name,
      payload.description ?? null,
      payload.type,
      payload.format,
      payload.city,
      payload.venue ?? null,
      payload.startDate,
      payload.endDate,
      payload.registrationDeadline ?? payload.startDate,
      payload.maxTeams,
      payload.entryFee,
      payload.prizePool ?? 0,
      payload.createdBy
    ]
  );
  return query('SELECT * FROM tournaments WHERE id = ?', [result.insertId]).then((rows) => rows[0]);
};
