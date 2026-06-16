import { z } from 'zod';

export const createConversationSchema = z.object({
  type: z.enum(['direct', 'group']),
  name: z.string().min(1).max(60).optional().nullable(),
  description: z.string().max(200).optional().default(''),
  participants: z.array(z.string()).min(1, 'At least one participant required'),
});

export const addMemberSchema = z.object({
  userId: z.string().min(1, 'User ID required'),
});
