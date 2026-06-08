import Conversation from '../models/Conversation.js';

/**
 * Middleware that checks if the authenticated user is a participant
 * in the conversation specified by :id or :conversationId param.
 */
const membership = async (req, res, next) => {
  try {
    const conversationId = req.params.id || req.params.conversationId;
    if (!conversationId) {
      return res.status(400).json({ message: 'Conversation ID required' });
    }

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    const isMember = conversation.participants.some(
      (p) => p.toString() === req.user._id.toString()
    );

    if (!isMember) {
      return res.status(403).json({ message: 'Not a member of this conversation' });
    }

    req.conversation = conversation;
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Membership check failed' });
  }
};

export default membership;
