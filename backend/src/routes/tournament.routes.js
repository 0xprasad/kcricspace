const express = require('express');
const router = express.Router();
const tournamentController = require('../controllers/tournament.controller');

router.post('/', tournamentController.createTournament);
router.get('/', tournamentController.getAllTournaments);

module.exports = router;
