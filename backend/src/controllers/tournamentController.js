import { ok } from '../utils/apiResponse.js';
import { createTournament, getTournamentById, listTournaments, registerTeamForTournament } from '../services/tournamentService.js';

export const list = async (req, res, next) => {
  try {
    return ok(res, await listTournaments());
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    return ok(res, await getTournamentById(req.params.id));
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    return ok(res, await createTournament({ ...req.body, createdBy: req.user.sub }), 'Tournament created', 201);
  } catch (error) {
    next(error);
  }
};

export const registerTeam = async (req, res, next) => {
  try {
    return ok(res, await registerTeamForTournament({ tournamentId: Number(req.params.id), teamId: req.body.teamId }), 'Team registration submitted', 201);
  } catch (error) {
    next(error);
  }
};
