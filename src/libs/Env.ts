import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const Env = createEnv({
  // 服务器端环境变量，在客户端不可用。
  server: {
    AUTH_TRUST_HOST: z.string(),
    DATABASE_URL: z.string().url(),
    NEXT_AUTH_SECRET: z.string().min(1),
    NEXT_AUTH_URL: z.string().url(),
    GOOGLE_CLIENT_ID: z.string().optional(),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
  },
  /**
   * 客户端（和服务器）上可用的环境变量。
   * 如果这些没有前缀NEXT_PUBLIC_，则会出现类型错误。
   */
  client: {
  },
  shared: {
    NODE_ENV: z.enum(['test', 'development', 'production']).optional(),
  },
  runtimeEnv: {
    AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST,
    NEXT_AUTH_SECRET: process.env.NEXT_AUTH_SECRET,
    NEXT_AUTH_URL: process.env.NEXT_AUTH_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
  },
});
