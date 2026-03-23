import { fail } from '../utils/apiResponse.js';
import { verifyToken } from '../utils/auth.js';

export const authenticate = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return fail(res, 'Authentication required', 401);
  try {
    req.user = verifyToken(header.split(' ')[1]);
    next();
  } catch {
    return fail(res, 'Invalid or expired token', 401);
  }
};

export const authorize = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return fail(res, 'Forbidden', 403);
  }
  next();
};
