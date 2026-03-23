import { Router } from 'express';
import { createPaymentOrder, verify, webhook } from '../controllers/paymentController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { createOrderValidator, verifyPaymentValidator } from '../validators/paymentValidators.js';

const router = Router();
router.post('/create-order', authenticate, createOrderValidator, validateRequest, createPaymentOrder);
router.post('/verify', authenticate, verifyPaymentValidator, validateRequest, verify);
router.post('/webhook', webhook);

export default router;
