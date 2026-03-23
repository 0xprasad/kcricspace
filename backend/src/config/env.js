import dotenv from 'dotenv';

dotenv.config();

const required = ['PORT', 'JWT_SECRET', 'DB_HOST', 'DB_USER', 'DB_NAME'];
required.forEach((key) => {
  if (!process.env[key]) {
    console.warn(`[env] Missing ${key}. Configure backend/.env before production use.`);
  }
});

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 5000),
  appUrl: process.env.APP_URL ?? 'http://localhost:5173',
  jwtSecret: process.env.JWT_SECRET ?? 'unsafe-dev-secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
  db: {
    host: process.env.DB_HOST ?? '127.0.0.1',
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USER ?? 'root',
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_NAME ?? 'cricket_platform'
  },
  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID ?? '',
    keySecret: process.env.RAZORPAY_KEY_SECRET ?? '',
    webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET ?? ''
  },
  googleClientId: process.env.GOOGLE_CLIENT_ID ?? ''
};
