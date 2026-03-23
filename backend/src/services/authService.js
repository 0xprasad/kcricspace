import { query } from '../config/db.js';
import { comparePassword, hashPassword, signToken } from '../utils/auth.js';

export const registerUser = async (payload) => {
  const existing = await query('SELECT id FROM users WHERE email = ?', [payload.email]);
  if (existing.length) {
    const error = new Error('Email already registered');
    error.statusCode = 409;
    throw error;
  }

  const passwordHash = await hashPassword(payload.password);
  const result = await query(
    `INSERT INTO users (role_id, name, email, phone, password_hash, status)
     VALUES ((SELECT id FROM roles WHERE name = ?), ?, ?, ?, ?, 'active')`,
    [payload.role ?? 'user', payload.name, payload.email, payload.phone ?? null, passwordHash]
  );

  return {
    id: result.insertId,
    token: signToken({ sub: result.insertId, email: payload.email, role: payload.role ?? 'user' })
  };
};

export const loginUser = async ({ email, password }) => {
  const rows = await query(
    `SELECT u.id, u.email, u.password_hash, r.name AS role, u.name
     FROM users u
     JOIN roles r ON r.id = u.role_id
     WHERE u.email = ?`,
    [email]
  );
  const user = rows[0];
  if (!user || !(await comparePassword(password, user.password_hash))) {
    const error = new Error('Invalid credentials');
    error.statusCode = 401;
    throw error;
  }

  return {
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    token: signToken({ sub: user.id, email: user.email, role: user.role })
  };
};
