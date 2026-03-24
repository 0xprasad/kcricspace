const authService = require('../services/auth.service');

// ─────────────────────────────────────────────────────────
// POST /auth/request-otp
// ─────────────────────────────────────────────────────────
async function requestOtp(req, res, next) {
  try {
    const { email, purpose, userType, ...restData } = req.body;

    if (!email || !purpose) {
      return res.status(400).json({
        success: false,
        message: 'Email and purpose are required',
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
      });
    }

    // Prepare profile data
    const profileData = { ...restData };
    if (userType) {
      profileData.userType = userType;
    }
    
    // Handle avatar file if present
    if (req.file) {
      profileData.avatar_url = req.file.path || req.file.location || null;
    }

    const result = await authService.requestOtp(email.toLowerCase().trim(), purpose, profileData);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
}

// ─────────────────────────────────────────────────────────
// POST /auth/verify-otp
// ─────────────────────────────────────────────────────────
async function verifyOtp(req, res, next) {
  try {
    const { email, otp, purpose, userType } = req.body;

    if (!email || !otp || !purpose) {
      return res.status(400).json({
        success: false,
        message: 'Email, OTP, and purpose are required',
      });
    }

    const meta = {
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent') || 'unknown',
    };

    const result = await authService.verifyOtp(
      email.toLowerCase().trim(),
      otp.toString().trim(),
      purpose,
      userType,
      meta
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
}

// ─────────────────────────────────────────────────────────
// POST /auth/refresh
// ─────────────────────────────────────────────────────────
async function refresh(req, res, next) {
  try {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      return res.status(400).json({
        success: false,
        message: 'Refresh token is required',
      });
    }

    const result = await authService.refreshToken(refresh_token);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
}

// ─────────────────────────────────────────────────────────
// POST /auth/logout
// ─────────────────────────────────────────────────────────
async function logout(req, res, next) {
  try {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      return res.status(400).json({
        success: false,
        message: 'Refresh token is required',
      });
    }

    const result = await authService.logout(refresh_token);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
}

module.exports = {
  requestOtp,
  verifyOtp,
  refresh,
  logout,
};
