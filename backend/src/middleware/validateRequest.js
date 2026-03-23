import { validationResult } from 'express-validator';
import { fail } from '../utils/apiResponse.js';

export const validateRequest = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return fail(res, 'Validation failed', 422, result.array());
  }
  next();
};
