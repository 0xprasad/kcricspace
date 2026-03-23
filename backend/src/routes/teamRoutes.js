import { Router } from 'express';
import { create, getById } from '../controllers/teamController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { teamCreateValidator, teamIdValidator } from '../validators/teamValidators.js';

const router = Router();
router.post('/', authenticate, teamCreateValidator, validateRequest, create);
router.get('/:id', teamIdValidator, validateRequest, getById);

export default router;
