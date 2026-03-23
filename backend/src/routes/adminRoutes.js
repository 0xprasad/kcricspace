import { Router } from 'express';
import { overview } from '../controllers/adminController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = Router();
router.get('/overview', authenticate, authorize('admin'), overview);

export default router;
