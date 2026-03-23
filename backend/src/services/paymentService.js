import crypto from 'crypto';
import Razorpay from 'razorpay';
import { env } from '../config/env.js';
import { query } from '../config/db.js';

const razorpay = new Razorpay({ key_id: env.razorpay.keyId, key_secret: env.razorpay.keySecret });

export const createOrder = async ({ tournamentId, teamId, amount, userId }) => {
  const order = await razorpay.orders.create({ amount, currency: 'INR', receipt: `tour-${tournamentId}-team-${teamId}` });

  await query(
    `INSERT INTO payments (user_id, tournament_id, team_id, provider, provider_order_id, amount, currency, status)
     VALUES (?, ?, ?, 'razorpay', ?, ?, 'INR', 'created')`,
    [userId, tournamentId, teamId, order.id, amount / 100]
  );

  return order;
};

export const verifyPayment = async ({ paymentId, orderId, signature }) => {
  const expected = crypto.createHmac('sha256', env.razorpay.keySecret).update(`${orderId}|${paymentId}`).digest('hex');
  if (expected !== signature) {
    const error = new Error('Payment signature mismatch');
    error.statusCode = 400;
    throw error;
  }

  await query(
    `UPDATE payments SET provider_payment_id = ?, provider_signature = ?, status = 'captured', paid_at = NOW()
     WHERE provider_order_id = ?`,
    [paymentId, signature, orderId]
  );

  return { verified: true };
};
