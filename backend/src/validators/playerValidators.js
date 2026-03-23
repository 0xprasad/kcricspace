import { body, param } from 'express-validator';

export const playerCreateValidator = [
  body('fullName').trim().isLength({ min: 2, max: 120 }),
  body('role').isIn(['batsman', 'bowler', 'all_rounder', 'wicket_keeper']),
  body('battingHand').optional().isIn(['right', 'left']),
  body('dateOfBirth').optional().isISO8601(),
  body('teamId').optional().isInt({ min: 1 })
];

export const playerIdValidator = [param('id').isInt({ min: 1 })];
export const assignTeamValidator = [param('id').isInt({ min: 1 }), body('teamId').isInt({ min: 1 })];
