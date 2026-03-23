import { ok } from '../utils/apiResponse.js';
import { assignPlayerToTeam, createPlayer, getPlayerById, listPlayers } from '../services/playerService.js';

export const list = async (req, res, next) => {
  try {
    return ok(res, await listPlayers());
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    return ok(res, await getPlayerById(req.params.id));
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    return ok(res, await createPlayer(req.body), 'Player profile created', 201);
  } catch (error) {
    next(error);
  }
};

export const assignTeam = async (req, res, next) => {
  try {
    return ok(res, await assignPlayerToTeam({ playerId: Number(req.params.id), teamId: req.body.teamId }), 'Player assigned to team');
  } catch (error) {
    next(error);
  }
};
