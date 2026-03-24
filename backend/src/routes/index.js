const express = require('express');
const router = express.Router();

const authRoutes       = require('./auth.routes');
const tournamentRoutes  = require('./tournament.routes');
const uploadRoutes      = require('./upload.routes');

router.use('/auth',        authRoutes);
router.use('/tournaments', tournamentRoutes);
router.use('/upload',      uploadRoutes);

module.exports = router;
