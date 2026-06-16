import Message from '../models/Message.js';
import Summary from '../models/Summary.js';
import { summarizeMessages } from '../services/aiSummarizer.js';

// POST /api/summary/:conversationId
export const generateSummary = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const conversation = req.conversation;

    // Only allow summaries for group chats
    if (conversation.type !== 'group') {
      return res.status(400).json({ message: 'Summaries are only available for group chats' });
    }

    // Get the latest 50-100 messages
    const messages = await Message.find({
      conversation: conversationId,
      type: { $in: ['text', 'voice'] },
    })
      .populate('sender', 'username')
      .sort({ createdAt: -1 })
      .limit(100);

    if (messages.length < 3) {
      return res
        .status(400)
        .json({ message: 'Not enough messages to generate a summary (minimum 3)' });
    }

    // Reverse to chronological order
    const orderedMessages = messages.reverse();

    // Format messages for AI
    const formatted = orderedMessages.map((m) => ({
      sender: m.sender.username,
      content: m.transcription || m.content,
      timestamp: m.createdAt,
    }));

    // Call AI summarizer
    const bullets = await summarizeMessages(formatted);

    // Store summary
    const summary = await Summary.create({
      conversation: conversationId,
      generatedBy: req.user._id,
      bullets,
      messageCount: orderedMessages.length,
      fromMessage: orderedMessages[0]._id,
      toMessage: orderedMessages[orderedMessages.length - 1]._id,
    });

    const populated = await summary.populate('generatedBy', 'username');

    res.status(201).json(populated);
  } catch (error) {
    console.error('Summary generation error:', error);
    res.status(500).json({ message: error.message || 'Failed to generate summary' });
  }
};

// GET /api/summary/:conversationId
export const getSummaries = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const summaries = await Summary.find({ conversation: conversationId })
      .populate('generatedBy', 'username')
      .sort({ createdAt: -1 })
      .limit(20);

    res.json(summaries);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch summaries' });
  }
};
