import { Router } from 'express';
import {
  createConversation,
  getConversations,
  getConversation,
  updateConversation,
  addMember,
  removeMember,
} from '../controllers/conversationController.js';
import {
  createConversationSchema,
  addMemberSchema,
} from '../validators/conversationValidator.js';
import auth from '../middleware/auth.js';
import membership from '../middleware/membership.js';
import validate from '../middleware/validate.js';

const router = Router();

router.post('/', auth, validate(createConversationSchema), createConversation);
router.get('/', auth, getConversations);
router.get('/:id', auth, membership, getConversation);
router.put('/:id', auth, membership, updateConversation);
router.post('/:id/members', auth, membership, validate(addMemberSchema), addMember);
router.delete('/:id/members/:uid', auth, membership, removeMember);

export default router;
