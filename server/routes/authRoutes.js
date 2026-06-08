import { Router } from 'express';
import { register, login, refreshAccessToken, logout } from '../controllers/authController.js';
import { registerSchema, loginSchema } from '../validators/authValidator.js';
import validate from '../middleware/validate.js';
import auth from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/register', authLimiter, validate(registerSchema), register);
router.post('/login', authLimiter, validate(loginSchema), login);
router.post('/refresh', refreshAccessToken);
router.post('/logout', auth, logout);

export default router;
