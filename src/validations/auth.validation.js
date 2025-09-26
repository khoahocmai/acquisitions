import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long').trim(),
  email: z.email('Invalid email address').toLowerCase().trim(),
  password: z.string().min(6, 'Password must be at least 6 characters long').max(100, 'Password must be at most 100 characters long'),
  role: z.enum(['user', 'admin']).default('user').optional()
});

export const signinSchema = z.object({
  email: z.email('Invalid email address').toLowerCase().trim(),
  password: z.string().min(6, 'Password must be at least 6 characters long').max(100, 'Password must be at most 100 characters long')
});