import { Router } from 'express';
import { create, leaderboard, score } from '../controllers/matchController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { matchCreateValidator, scoreValidator } from '../validators/matchValidators.js';

const router = Router();
router.get('/leaderboard', leaderboard);
router.post('/', authenticate, authorize('admin'), matchCreateValidator, validateRequest, create);
router.post('/:id/score', authenticate, authorize('admin', 'user'), scoreValidator, validateRequest, score);

export default router;
