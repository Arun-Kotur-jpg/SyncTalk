import { Router } from 'express';
import { getMessages, searchMessages } from '../controllers/messageController.js';
import auth from '../middleware/auth.js';
import membership from '../middleware/membership.js';

const router = Router();

router.get('/:conversationId', auth, membership, getMessages);
router.get('/:conversationId/search', auth, membership, searchMessages);

export default router;
