import Conversation from '../models/Conversation.js';
import User from '../models/User.js';

// POST /api/conversations
export const createConversation = async (req, res) => {
  try {
    const { type, name, description, participants } = req.body;
    const userId = req.user._id.toString();

    // Ensure creator is in participants
    const allParticipants = [...new Set([userId, ...participants])];

    // For direct chats, check if conversation already exists
    if (type === 'direct') {
      if (allParticipants.length !== 2) {
        return res.status(400).json({ message: 'Direct chat requires exactly 2 participants' });
      }

      const existing = await Conversation.findOne({
        type: 'direct',
        participants: { $all: allParticipants, $size: 2 },
      }).populate('participants', 'username email avatar status lastSeen');

      if (existing) {
        return res.json(existing);
      }
    }

    // For groups, require a name
    if (type === 'group' && !name) {
      return res.status(400).json({ message: 'Group name is required' });
    }

    // Verify all participants exist
    const validUsers = await User.find({ _id: { $in: allParticipants } });
    if (validUsers.length !== allParticipants.length) {
      return res.status(400).json({ message: 'One or more participants not found' });
    }

    const conversation = await Conversation.create({
      type,
      name: type === 'group' ? name : null,
      description: description || '',
      createdBy: userId,
      participants: allParticipants,
    });

    const populated = await conversation.populate(
      'participants',
      'username email avatar status lastSeen'
    );

    res.status(201).json(populated);
  } catch (error) {
    console.error('Create conversation error:', error);
    res.status(500).json({ message: 'Failed to create conversation' });
  }
};

// GET /api/conversations
export const getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user._id,
    })
      .populate('participants', 'username email avatar status lastSeen')
      .sort({ updatedAt: -1 });

    res.json(conversations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch conversations' });
  }
};

// GET /api/conversations/:id
export const getConversation = async (req, res) => {
  try {
    // req.conversation is set by membership middleware
    const conversation = await Conversation.findById(req.params.id)
      .populate('participants', 'username email avatar status lastSeen')
      .populate('createdBy', 'username');

    res.json(conversation);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch conversation' });
  }
};

// PUT /api/conversations/:id
export const updateConversation = async (req, res) => {
  try {
    const conversation = req.conversation;
    if (conversation.type !== 'group') {
      return res.status(400).json({ message: 'Cannot update direct conversations' });
    }

    const { name, description } = req.body;
    if (name) conversation.name = name;
    if (description !== undefined) conversation.description = description;

    await conversation.save();
    const updated = await conversation.populate(
      'participants',
      'username email avatar status lastSeen'
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update conversation' });
  }
};

// POST /api/conversations/:id/members
export const addMember = async (req, res) => {
  try {
    const conversation = req.conversation;
    if (conversation.type !== 'group') {
      return res.status(400).json({ message: 'Can only add members to groups' });
    }

    const { userId } = req.body;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if already a member
    if (conversation.participants.includes(userId)) {
      return res.status(409).json({ message: 'User is already a member' });
    }

    conversation.participants.push(userId);
    await conversation.save();

    const updated = await conversation.populate(
      'participants',
      'username email avatar status lastSeen'
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add member' });
  }
};

// DELETE /api/conversations/:id/members/:uid
export const removeMember = async (req, res) => {
  try {
    const conversation = req.conversation;
    if (conversation.type !== 'group') {
      return res.status(400).json({ message: 'Can only remove members from groups' });
    }

    const { uid } = req.params;

    // Prevent removing the creator
    if (conversation.createdBy.toString() === uid) {
      return res.status(400).json({ message: 'Cannot remove the group creator' });
    }

    // Only creator or self can remove
    const isCreator = conversation.createdBy.toString() === req.user._id.toString();
    const isSelf = uid === req.user._id.toString();
    if (!isCreator && !isSelf) {
      return res.status(403).json({ message: 'Only the creator can remove members' });
    }

    conversation.participants = conversation.participants.filter(
      (p) => p.toString() !== uid
    );
    await conversation.save();

    const updated = await conversation.populate(
      'participants',
      'username email avatar status lastSeen'
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove member' });
  }
};
