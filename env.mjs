import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    TINA_TOKEN: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_TINA_CLIENT_ID: z.string().min(1),
    NEXT_PUBLIC_TINA_BRANCH: z.string().optional(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_TINA_CLIENT_ID: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
    TINA_TOKEN: process.env.TINA_TOKEN,
    NEXT_PUBLIC_TINA_BRANCH: process.env.NEXT_PUBLIC_TINA_BRANCH,
  },
});
