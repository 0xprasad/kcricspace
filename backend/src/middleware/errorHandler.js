import { fail } from '../utils/apiResponse.js';

export const notFound = (req, res) => fail(res, `Route ${req.originalUrl} not found`, 404);

export const errorHandler = (error, req, res, next) => {
  console.error(error);
  if (res.headersSent) return next(error);
  return fail(res, error.message || 'Internal server error', error.statusCode || 500, error.details);
};
