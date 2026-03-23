import { body } from 'express-validator';

export const createOrderValidator = [
  body('tournamentId').isInt({ min: 1 }),
  body('teamId').isInt({ min: 1 }),
  body('amount').isInt({ min: 100 })
];

export const verifyPaymentValidator = [
  body('paymentId').notEmpty(),
  body('orderId').notEmpty(),
  body('signature').notEmpty()
];
