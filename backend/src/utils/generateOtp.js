const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const OTP_LENGTH = 6;
const SALT_ROUNDS = 10;

/**
 * Generate a cryptographically secure 6-digit OTP.
 * @returns {string} 6-digit OTP string
 */
function generateOtp() {
  // Use crypto for better randomness than Math.random
  const otp = crypto.randomInt(100000, 999999).toString();
  return otp;
}

/**
 * Hash an OTP using bcrypt.
 * @param {string} otp - Plain text OTP
 * @returns {Promise<string>} Hashed OTP
 */
async function hashOtp(otp) {
  return bcrypt.hash(otp, SALT_ROUNDS);
}

/**
 * Compare plain OTP with its bcrypt hash.
 * @param {string} otp - Plain text OTP
 * @param {string} hash - Bcrypt hash
 * @returns {Promise<boolean>}
 */
async function compareOtp(otp, hash) {
  return bcrypt.compare(otp, hash);
}

module.exports = {
  generateOtp,
  hashOtp,
  compareOtp,
};
