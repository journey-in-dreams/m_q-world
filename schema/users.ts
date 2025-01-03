import {
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid().primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text(),
  email: text().notNull(),
  emailVerified: timestamp({ mode: 'date' }),
  image: text(),
  role: text().notNull(),
  password: text(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow().$onUpdate(() => new Date()),
  // [CODE_MARK users-table]
})

export type User = typeof users.$inferSelect
