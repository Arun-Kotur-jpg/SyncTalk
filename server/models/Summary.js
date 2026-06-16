import mongoose from 'mongoose';

const summarySchema = new mongoose.Schema(
  {
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true,
      index: true,
    },
    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bullets: {
      type: [String],
      required: true,
      validate: {
        validator: (v) => v.length >= 1 && v.length <= 6,
        message: 'Summary must have 1-6 bullet points',
      },
    },
    messageCount: {
      type: Number,
      required: true,
    },
    fromMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
    toMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
  },
  { timestamps: true }
);

const Summary = mongoose.model('Summary', summarySchema);
export default Summary;
