import { Router } from 'express';
import { generateSummary, getSummaries } from '../controllers/summaryController.js';
import auth from '../middleware/auth.js';
import membership from '../middleware/membership.js';
import { summaryLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/:conversationId', auth, membership, summaryLimiter, generateSummary);
router.get('/:conversationId', auth, membership, getSummaries);

export default router;
