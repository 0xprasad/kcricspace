import { ok } from '../utils/apiResponse.js';
import { getAdminOverview } from '../services/adminService.js';

export const overview = async (req, res, next) => {
  try {
    return ok(res, await getAdminOverview());
  } catch (error) {
    next(error);
  }
};
