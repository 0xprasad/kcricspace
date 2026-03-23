import crypto from 'crypto';
import { ok } from '../utils/apiResponse.js';
import { env } from '../config/env.js';
import { createOrder, verifyPayment } from '../services/paymentService.js';

export const createPaymentOrder = async (req, res, next) => {
  try {
    return ok(res, await createOrder({ ...req.body, userId: req.user.sub }), 'Order created', 201);
  } catch (error) {
    next(error);
  }
};

export const verify = async (req, res, next) => {
  try {
    return ok(res, await verifyPayment(req.body), 'Payment verified');
  } catch (error) {
    next(error);
  }
};

export const webhook = async (req, res, next) => {
  try {
    const receivedSignature = req.headers['x-razorpay-signature'];
    const expectedSignature = crypto
      .createHmac('sha256', env.razorpay.webhookSecret)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (receivedSignature !== expectedSignature) {
      throw Object.assign(new Error('Invalid webhook signature'), { statusCode: 400 });
    }

    return ok(res, { acknowledged: true }, 'Webhook processed');
  } catch (error) {
    next(error);
  }
};
