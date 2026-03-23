import { ok } from '../utils/apiResponse.js';
import { createTournament, listTournaments } from '../services/tournamentService.js';

export const list = async (req, res, next) => {
  try {
    return ok(res, await listTournaments());
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
