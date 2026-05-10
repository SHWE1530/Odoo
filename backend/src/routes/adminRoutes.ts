import { Router } from 'express';
import { getPlatformStats, getAllUsers, deleteUser, getUserSignupsAnalytics } from '../controllers/adminController';
import { authenticate, requireAdmin } from '../middleware/authMiddleware';

const router = Router();

// Protect all admin routes automatically
router.use(authenticate, requireAdmin);

router.get('/stats', getPlatformStats);
router.get('/users', getAllUsers);
router.delete('/users/:userId', deleteUser);
router.get('/analytics/signups', getUserSignupsAnalytics);

export default router;
