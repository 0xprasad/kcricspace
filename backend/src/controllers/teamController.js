import { ok } from '../utils/apiResponse.js';
import { createTeam, getTeamById, listTeams } from '../services/teamService.js';

export const create = async (req, res, next) => {
  try {
    const team = await createTeam({ ownerUserId: req.user.sub, ...req.body });
    return ok(res, team, 'Team created', 201);
  } catch (error) {
    next(error);
  }
};

export const list = async (req, res, next) => {
  try {
    return ok(res, await listTeams());
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const team = await getTeamById(req.params.id);
    return ok(res, team);
  } catch (error) {
    next(error);
  }
};
