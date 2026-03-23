import { body, param } from 'express-validator';

export const tournamentCreateValidator = [
  body('name').trim().isLength({ min: 3, max: 150 }),
  body('type').isIn(['league', 'knockout', 'hybrid']),
  body('format').isIn(['T10', 'T20', 'ODI', 'TEST']),
  body('city').trim().isLength({ min: 2, max: 80 }),
  body('startDate').isISO8601(),
  body('endDate').isISO8601(),
  body('entryFee').isFloat({ min: 0 }),
  body('maxTeams').isInt({ min: 2, max: 128 })
];

export const tournamentIdValidator = [param('id').isInt({ min: 1 })];
export const tournamentRegistrationValidator = [param('id').isInt({ min: 1 }), body('teamId').isInt({ min: 1 })];
