import { pgTable, text, timestamp, unique, uuid } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
  id: uuid().defaultRandom().primaryKey().notNull(),
  name: text(),
  email: text().notNull(),
  image: text(),
  phoneNumber: text('phone_number'),
  password: text().notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
}, (table) => {
  return {
    userEmailUnique: unique('user_email_unique').on(table.email),
    userPhoneNumberUnique: unique('user_phone_number_unique').on(table.phoneNumber),
  };
});
