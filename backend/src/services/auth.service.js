const { Op } = require('sequelize');
const { User, EmailOtp, UserSession, PlayerProfile, CorporateProfile } = require('../models');
const { generateOtp, hashOtp, compareOtp } = require('../utils/generateOtp');
const { generateAccessToken, generateRefreshToken, hashToken } = require('../utils/generateToken');
const emailService = require('./email.service');

const OTP_EXPIRY_MINUTES = 5;
const OTP_MAX_ATTEMPTS = 3;
const OTP_RATE_LIMIT_WINDOW_MINUTES = 10;
const OTP_RATE_LIMIT_MAX = 5;
const REFRESH_TOKEN_EXPIRY_DAYS = 7;

// ─────────────────────────────────────────────────────────
// 1. REQUEST OTP
// ─────────────────────────────────────────────────────────
async function requestOtp(email, purpose, profileData = {}, meta = {}) {
  // Validate purpose
  if (!['signup', 'login'].includes(purpose)) {
    throw createError(400, 'Purpose must be "signup" or "login"');
  }

  const existingUser = await User.findOne({ where: { email } });

  // Purpose-specific checks
  if (purpose === 'signup') {
    if (existingUser && existingUser.email_verified) {
      throw createError(409, 'An account with this email already exists and is verified.');
    }

    // Determine user_type from profileData or default to 'ordinary'
    const userType = profileData.userType || 'ordinary';

    if (!existingUser) {
      // Create UNVERIFIED user
      const newUser = await User.create({
        email,
        email_verified: false,
        user_type: userType,
      });

      // Create associated profile
      if (userType === 'corporate') {
        await CorporateProfile.create({
          user_id: newUser.id,
          company_name: profileData.company_name,
          employee_id: profileData.employee_id,
          designation: profileData.designation,
          state: profileData.state,
          city: profileData.city,
          playing_role: profileData.playing_role,
          batting_style: profileData.batting_style,
          bowling_style: profileData.bowling_style,
          avatar_url: profileData.avatar_url,
        });
      } else {
        await PlayerProfile.create({
          user_id: newUser.id,
          full_name: profileData.full_name || 'Unknown',
          dob: profileData.dob || null,
          city: profileData.city,
          playing_role: profileData.playing_role,
          batting_style: profileData.batting_style,
          bowling_style: profileData.bowling_style,
          avatar_url: profileData.avatar_url,
        });
      }
    } else {
      // User exists but is unverified. We could update their profile here if needed.
      // For simplicity, we assume their profile was already created in a previous attempt.
    }
  }

  if (purpose === 'login' && (!existingUser || !existingUser.email_verified)) {
    throw createError(404, "You're not in the squad yet. Please sign up to take the field.");
  }

  // Rate limiting: max 3 OTPs per 10 minutes
  const windowStart = new Date(Date.now() - OTP_RATE_LIMIT_WINDOW_MINUTES * 60 * 1000);
  const recentOtps = await EmailOtp.count({
    where: {
      email,
      last_sent_at: { [Op.gte]: windowStart },
    },
  });

  if (recentOtps >= OTP_RATE_LIMIT_MAX) {
    throw createError(429, 'Too many OTP requests. Please try again later.');
  }

  // Generate and hash OTP
  const otp = generateOtp();
  const otpHash = await hashOtp(otp);

  // Store in DB
  await EmailOtp.create({
    email,
    otp_hash: otpHash,
    purpose,
    expires_at: new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000),
    attempts: 0,
    last_sent_at: new Date(),
  });

  // Send Email with Nodemailer
  await emailService.sendOtpEmail(email, otp, purpose);
  console.log(`📧 [MOCK FALLBACK VERBOSE] OTP for ${email}: ${otp}`);

  return {
    message: 'OTP sent successfully',
    expiresInMinutes: OTP_EXPIRY_MINUTES,
  };
}

// ─────────────────────────────────────────────────────────
// 2. VERIFY OTP
// ─────────────────────────────────────────────────────────
async function verifyOtp(email, otp, purpose, userType = 'ordinary', meta = {}) {
  // Fetch latest unused OTP
  const otpRecord = await EmailOtp.findOne({
    where: {
      email,
      purpose,
      used_at: null,
    },
    order: [['created_at', 'DESC']],
  });

  if (!otpRecord) {
    throw createError(400, 'No OTP found. Please request a new one.');
  }

  // Check expiry
  if (new Date() > otpRecord.expires_at) {
    throw createError(400, 'OTP has expired. Please request a new one.');
  }

  // Check max attempts
  if (otpRecord.attempts >= OTP_MAX_ATTEMPTS) {
    throw createError(400, 'Maximum verification attempts exceeded. Please request a new OTP.');
  }

  // Compare OTP
  const isValid = await compareOtp(otp, otpRecord.otp_hash);

  if (!isValid) {
    // Increment attempts
    await otpRecord.increment('attempts');
    const remaining = OTP_MAX_ATTEMPTS - otpRecord.attempts - 1;
    throw createError(401, `Invalid OTP. ${remaining} attempt(s) remaining.`);
  }

  // Mark as used
  await otpRecord.update({ used_at: new Date() });

  let user = await User.findOne({ where: { email } });

  if (purpose === 'signup') {
    if (!user) {
      throw createError(404, 'Registration data not found. Please sign up again.');
    }
    // Mark as verified
    await user.update({ email_verified: true });
  } else {
    // Login
    if (!user || !user.email_verified) {
      throw createError(404, "You're not in the squad yet.");
    }
  }

  // Generate tokens
  const tokens = await createSession(user, meta);

  return {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    user: sanitizeUser(user),
  };
}

// ─────────────────────────────────────────────────────────
// 3. REFRESH TOKEN
// ─────────────────────────────────────────────────────────
async function refreshToken(token) {
  if (!token) {
    throw createError(400, 'Refresh token is required');
  }

  const tokenHash = hashToken(token);

  const session = await UserSession.findOne({
    where: {
      refresh_token_hash: tokenHash,
      is_revoked: false,
      expires_at: { [Op.gt]: new Date() },
    },
    include: [{ model: User, as: 'user' }],
  });

  if (!session) {
    throw createError(401, 'Invalid or expired refresh token');
  }

  // Generate new access token
  const accessToken = generateAccessToken(session.user);

  return { accessToken };
}

// ─────────────────────────────────────────────────────────
// 4. LOGOUT
// ─────────────────────────────────────────────────────────
async function logout(token) {
  if (!token) {
    throw createError(400, 'Refresh token is required');
  }

  const tokenHash = hashToken(token);

  const session = await UserSession.findOne({
    where: { refresh_token_hash: tokenHash },
  });

  if (!session) {
    throw createError(400, 'Invalid refresh token');
  }

  await session.update({ is_revoked: true });

  return { message: 'Logged out successfully' };
}

// ─────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────

/**
 * Create a user session with access + refresh tokens.
 */
async function createSession(user, meta = {}) {
  const accessToken = generateAccessToken(user);
  const refreshTokenPlain = generateRefreshToken();
  const refreshTokenHash = hashToken(refreshTokenPlain);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_EXPIRY_DAYS);

  await UserSession.create({
    user_id: user.id,
    refresh_token_hash: refreshTokenHash,
    expires_at: expiresAt,
    ip_address: meta.ipAddress || null,
    user_agent: meta.userAgent || null,
  });

  return {
    accessToken,
    refreshToken: refreshTokenPlain,
  };
}

/**
 * Strip sensitive data from user object.
 */
function sanitizeUser(user) {
  const { id, email, email_verified, user_type } = user;
  return { id, email, email_verified, user_type };
}

/**
 * Create an error with a status code.
 */
function createError(statusCode, message) {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
}

module.exports = {
  requestOtp,
  verifyOtp,
  refreshToken,
  logout,
};
