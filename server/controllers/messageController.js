import Message from '../models/Message.js';
import Conversation from '../models/Conversation.js';

// GET /api/messages/:conversationId
export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    const messages = await Message.find({ conversation: conversationId })
      .populate('sender', 'username avatar')
      .populate('replyTo', 'content sender')
      .populate('mentions', 'username')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Message.countDocuments({ conversation: conversationId });

    res.json({
      messages: messages.reverse(), // Return in chronological order
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
};

// GET /api/messages/:conversationId/search?q=keyword
export const searchMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { q } = req.query;

    if (!q || q.length < 2) {
      return res.status(400).json({ message: 'Search query must be at least 2 characters' });
    }

    const messages = await Message.find({
      conversation: conversationId,
      $text: { $search: q },
    })
      .populate('sender', 'username avatar')
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(messages);
  } catch (error) {
    // Fallback to regex search if text index not available
    try {
      const { conversationId } = req.params;
      const { q } = req.query;
      const messages = await Message.find({
        conversation: conversationId,
        content: { $regex: q, $options: 'i' },
      })
        .populate('sender', 'username avatar')
        .sort({ createdAt: -1 })
        .limit(50);

      res.json(messages);
    } catch (fallbackError) {
      res.status(500).json({ message: 'Search failed' });
    }
  }
};

// GET /api/messages/user/mentions
export const getMentions = async (req, res) => {
  try {
    const messages = await Message.find({
      mentions: req.user._id,
      clearedMentions: { $ne: req.user._id }
    })
      .populate('sender', 'username avatar')
      .populate('conversation', 'name type')
      .sort({ createdAt: -1 })
      .limit(8);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch mentions' });
  }
};

// @desc    Clear a mention for the current user
// @route   DELETE /api/messages/:messageId/mentions
// @access  Private
export const clearMention = async (req, res) => {
  try {
    const message = await Message.findById(req.params.messageId);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    if (!message.clearedMentions.includes(req.user._id)) {
      message.clearedMentions.push(req.user._id);
      await message.save();
    }

    res.json({ message: 'Mention cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to clear mention' });
  }
};
