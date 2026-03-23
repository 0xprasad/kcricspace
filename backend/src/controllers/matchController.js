import { ok } from '../utils/apiResponse.js';
import { createMatch, getLeaderboard, recordBall } from '../services/matchService.js';

export const create = async (req, res, next) => {
  try {
    return ok(res, await createMatch(req.body), 'Match created', 201);
  } catch (error) {
    next(error);
  }
};

export const score = async (req, res, next) => {
  try {
    return ok(res, await recordBall(req.params.id, req.body), 'Ball recorded');
  } catch (error) {
    next(error);
  }
};

export const leaderboard = async (req, res, next) => {
  try {
    return ok(res, await getLeaderboard());
  } catch (error) {
    next(error);
  }
};
