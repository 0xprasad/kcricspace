import { Router } from 'express';
import { create, list } from '../controllers/tournamentController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { tournamentCreateValidator } from '../validators/tournamentValidators.js';

const router = Router();
router.get('/', list);
router.post('/', authenticate, authorize('admin'), tournamentCreateValidator, validateRequest, create);

export default router;
