import { Router } from 'express';
import { getMe, updateProfile, getUsers, searchUsers } from '../controllers/userController.js';
import auth from '../middleware/auth.js';

const router = Router();

router.get('/me', auth, getMe);
router.put('/me', auth, updateProfile);
router.get('/search', auth, searchUsers);
router.get('/', auth, getUsers);

export default router;
