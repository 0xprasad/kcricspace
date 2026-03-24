const { Tournament } = require('../models');

/**
 * Create a new tournament
 */
exports.createTournament = async (req, res, next) => {
  try {
    // Strip created_by from the body to avoid a string being inserted into
    // the INTEGER column. Set it from req.user.id once auth middleware is added.
    const { created_by, ...rest } = req.body;
    const tournament = await Tournament.create({ ...rest, created_by: null });
    res.status(201).json({
      success: true,
      message: 'Tournament created successfully',
      data: tournament,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Get all tournaments
 */
exports.getAllTournaments = async (req, res, next) => {
  try {
    const tournaments = await Tournament.findAll({
      order: [['created_at', 'DESC']],
    });
    res.status(200).json({
      success: true,
      data: tournaments,
    });
  } catch (err) {
    next(err);
  }
};
