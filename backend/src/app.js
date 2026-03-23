import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { env } from './config/env.js';
import authRoutes from './routes/authRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import playerRoutes from './routes/playerRoutes.js';
import tournamentRoutes from './routes/tournamentRoutes.js';
import matchRoutes from './routes/matchRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { pool } from './config/db.js';

export const app = express();
app.use(helmet());
app.use(cors({ origin: env.appUrl, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 500 }));

app.get('/health', async (req, res) => {
  let db = 'disconnected';
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    db = 'connected';
  } catch {
    db = 'disconnected';
  }

  res.json({ status: 'ok', service: 'cricket-platform-api', environment: env.nodeEnv, db });
});

app.use('/auth', authRoutes);
app.use('/teams', teamRoutes);
app.use('/players', playerRoutes);
app.use('/tournaments', tournamentRoutes);
app.use('/matches', matchRoutes);
app.use('/payments', paymentRoutes);
app.use('/admin', adminRoutes);

app.use(notFound);
app.use(errorHandler);
