import { body } from 'express-validator';

export const registerValidator = [
  body('name').trim().isLength({ min: 2, max: 120 }),
  body('email').isEmail().normalizeEmail(),
  body('password').isStrongPassword({ minLength: 8, minSymbols: 0 }),
  body('phone').optional().isMobilePhone('any'),
  body('role').optional().isIn(['user', 'admin'])
];

export const loginValidator = [body('email').isEmail(), body('password').isLength({ min: 8 })];
