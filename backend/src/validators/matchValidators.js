import { body, param } from 'express-validator';

export const matchCreateValidator = [
  body('tournamentId').isInt({ min: 1 }),
  body('teamAId').isInt({ min: 1 }),
  body('teamBId').isInt({ min: 1 }),
  body('groundName').trim().isLength({ min: 3, max: 120 }),
  body('scheduledAt').isISO8601(),
  body('oversPerInnings').isInt({ min: 1, max: 90 })
];

export const matchIdValidator = [param('id').isInt({ min: 1 })];

export const scoreValidator = [
  param('id').isInt({ min: 1 }),
  body('inningsNumber').isInt({ min: 1, max: 4 }),
  body('overNumber').isInt({ min: 0, max: 90 }),
  body('ballInOver').isInt({ min: 1, max: 9 }),
  body('runsBat').isInt({ min: 0, max: 6 }),
  body('extrasType').optional().isIn(['none', 'wide', 'no_ball', 'bye', 'leg_bye']),
  body('extrasRuns').optional().isInt({ min: 0, max: 6 }),
  body('isWicket').optional().isBoolean(),
  body('dismissalType').optional().isLength({ min: 2, max: 32 }),
  body('strikerId').isInt({ min: 1 }),
  body('nonStrikerId').optional().isInt({ min: 1 }),
  body('bowlerId').isInt({ min: 1 })
];
