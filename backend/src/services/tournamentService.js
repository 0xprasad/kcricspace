import { query } from '../config/db.js';
import { AppError, assertFound } from '../utils/errors.js';

export const listTournaments = async () => query(
  `SELECT t.*, COUNT(tt.team_id) AS registeredTeams
   FROM tournaments t
   LEFT JOIN tournament_teams tt ON tt.tournament_id = t.id AND tt.registration_status IN ('pending', 'approved')
   GROUP BY t.id
   ORDER BY t.start_date DESC`
);

export const getTournamentById = async (id) => {
  const rows = await query(
    `SELECT t.*, creator.name AS organizer_name, COUNT(tt.team_id) AS registered_teams
     FROM tournaments t
     JOIN users creator ON creator.id = t.created_by
     LEFT JOIN tournament_teams tt ON tt.tournament_id = t.id AND tt.registration_status IN ('pending', 'approved')
     WHERE t.id = ?
     GROUP BY t.id`,
    [id]
  );

  const tournament = assertFound(rows[0], 'Tournament not found');
  const teams = await query(
    `SELECT tt.id, tt.registration_status, tt.registered_at, team.id AS team_id, team.name, team.short_code
     FROM tournament_teams tt
     JOIN teams team ON team.id = tt.team_id
     WHERE tt.tournament_id = ?
     ORDER BY tt.registered_at DESC`,
    [id]
  );
  const matches = await query(
    `SELECT id, team_a_id, team_b_id, winner_team_id, scheduled_at, status
     FROM matches WHERE tournament_id = ? ORDER BY scheduled_at`,
    [id]
  );

  return { ...tournament, teams, matches };
};

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
  return getTournamentById(result.insertId);
};

export const registerTeamForTournament = async ({ tournamentId, teamId }) => {
  const tournament = await query('SELECT id, max_teams FROM tournaments WHERE id = ?', [tournamentId]);
  const team = await query('SELECT id FROM teams WHERE id = ?', [teamId]);
  assertFound(tournament[0], 'Tournament not found');
  assertFound(team[0], 'Team not found');

  const countRows = await query(
    `SELECT COUNT(*) AS total FROM tournament_teams WHERE tournament_id = ? AND registration_status IN ('pending', 'approved')`,
    [tournamentId]
  );
  if (countRows[0].total >= tournament[0].max_teams) {
    throw new AppError('Tournament registration capacity reached', 409);
  }

  try {
    await query(
      `INSERT INTO tournament_teams (tournament_id, team_id, registration_status)
       VALUES (?, ?, 'pending')`,
      [tournamentId, teamId]
    );
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') throw new AppError('Team is already registered in this tournament', 409);
    throw error;
  }

  return getTournamentById(tournamentId);
};
