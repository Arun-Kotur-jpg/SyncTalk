import { z } from 'zod';

export const sendMessageSchema = z.object({
  content: z.string().max(5000).optional().default(''),
  type: z.enum(['text', 'voice', 'system', 'summary']).optional().default('text'),
  replyTo: z.string().optional().nullable(),
  mentions: z.array(z.string()).optional().default([]),
});
