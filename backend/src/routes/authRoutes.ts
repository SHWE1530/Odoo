import { Router } from 'express';
import { register, verifyOTP, login, logout } from '../controllers/authController';

const router = Router();

router.post('/register', register);
router.post('/verify-otp', verifyOTP);
router.post('/login', login);
router.post('/logout', logout);

export default router;
