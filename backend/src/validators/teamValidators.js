import { body, param } from 'express-validator';

export const teamCreateValidator = [
  body('name').trim().isLength({ min: 3, max: 120 }),
  body('city').trim().isLength({ min: 2, max: 80 }),
  body('shortCode').trim().isLength({ min: 2, max: 8 }),
  body('captainPlayerId').optional().isInt({ min: 1 })
];

export const teamIdValidator = [param('id').isInt({ min: 1 })];
