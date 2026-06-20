import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true,
      index: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      default: '',
      maxlength: 5000,
    },
    type: {
      type: String,
      enum: ['text', 'voice', 'system', 'summary'],
      default: 'text',
    },
    voiceUrl: {
      type: String,
      default: null,
    },
    transcription: {
      type: String,
      default: null,
    },
    replyTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
      default: null,
    },
    mentions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    readBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    clearedMentions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    delivered: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Compound index for fetching conversation messages in order
messageSchema.index({ conversation: 1, createdAt: -1 });
// Text index for search
messageSchema.index({ content: 'text' });

const Message = mongoose.model('Message', messageSchema);
export default Message;
