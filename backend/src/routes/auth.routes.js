const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const upload = require('../middleware/upload.middleware');

// ─── Email OTP Flow ──────────────────────────────────────
router.post('/request-otp', upload.single('avatar'), authController.requestOtp);
router.post('/verify-otp', authController.verifyOtp);

// ─── Token Management ────────────────────────────────────
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);

module.exports = router;
