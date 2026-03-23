import { Router } from 'express';
import { assignTeam, create, getById, list } from '../controllers/playerController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { assignTeamValidator, playerCreateValidator, playerIdValidator } from '../validators/playerValidators.js';

const router = Router();
router.get('/', list);
router.get('/:id', playerIdValidator, validateRequest, getById);
router.post('/', authenticate, playerCreateValidator, validateRequest, create);
router.patch('/:id/team', authenticate, authorize('admin'), assignTeamValidator, validateRequest, assignTeam);

export default router;
