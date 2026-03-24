const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').config();

/**
 * Generate a JWT access token for a user.
 * @param {object} user - User object with id, email, user_type
 * @returns {string} Signed JWT
 */
function generateAccessToken(user) {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      userType: user.user_type,
    },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRY || '1d' }
  );
}

/**
 * Generate a cryptographically random refresh token.
 * @returns {string} Hex-encoded 40-byte token
 */
function generateRefreshToken() {
  return crypto.randomBytes(40).toString('hex');
}

/**
 * Hash a token using SHA-256 (for storing refresh tokens in DB).
 * @param {string} token - Plain text token
 * @returns {string} SHA-256 hex digest
 */
function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

/**
 * Verify and decode a JWT access token.
 * @param {string} token - JWT string
 * @returns {object} Decoded payload
 * @throws {Error} If token is invalid or expired
 */
function verifyAccessToken(token) {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  hashToken,
  verifyAccessToken,
};
