import dotenv from 'dotenv'

import { defineConfig } from 'drizzle-kit'

dotenv.config({ path: '.env.local' })

export default defineConfig({
  out: './drizzle',
  schema: './schema/*',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DB_URL ?? '',
  },
  verbose: true,
  strict: true,
  casing: 'snake_case',
})
