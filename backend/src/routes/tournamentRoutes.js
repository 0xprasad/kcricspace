import { Router } from 'express';
import { create, getById, list, registerTeam } from '../controllers/tournamentController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { tournamentCreateValidator, tournamentIdValidator, tournamentRegistrationValidator } from '../validators/tournamentValidators.js';

const router = Router();
router.get('/', list);
router.get('/:id', tournamentIdValidator, validateRequest, getById);
router.post('/', authenticate, authorize('admin'), tournamentCreateValidator, validateRequest, create);
router.post('/:id/register', authenticate, tournamentRegistrationValidator, validateRequest, registerTeam);

export default router;
