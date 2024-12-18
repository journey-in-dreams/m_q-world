import type { AdapterAccountType } from 'next-auth/adapters';
import { boolean, integer, pgTable, primaryKey, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: timestamp('email_verified', { mode: 'date' }),
  image: text('image'),
  // phoneNumber: text('phone_number').unique(),
  // password: text('password').notNull(),
  // createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  // updatedAt: timestamp('updated_at', { mode: 'date' })
  //   .defaultNow()
  //   .$onUpdate(() => new Date()),
});

export const accounts = pgTable('account', {
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  type: text('type').$type<AdapterAccountType>().notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('provider_account_id').notNull(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: integer('expires_at'),
  token_type: text('token_type'),
  scope: text('scope'),
  id_token: text('id_token'),
  session_state: text('session_state'),
}, (account) => {
  return [
    {
      pk: primaryKey({ columns: [account.provider, account.providerAccountId] }),
    },
  ];
});

export const sessions = pgTable('session', {
  sessionToken: text('session_token').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokens = pgTable('verificationToken', {
  identifier: text('identifier').notNull(),
  token: text('token').notNull(),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
}, (verificationToken) => {
  return [{
    pk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  }];
});

export const authenticators = pgTable('authenticator', {
  credentialID: text('credential_id').notNull().unique(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  providerAccountId: text('provider_account_id').notNull(),
  credentialPublicKey: text('credential_public_key').notNull(),
  counter: integer('counter').notNull(),
  credentialDeviceType: text('credential_device_type').notNull(),
  credentialBackedUp: boolean('credential_backed_up').notNull(),
  transports: text('transports'),
}, (authenticator) => {
  return [{
    pk: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  }];
});
