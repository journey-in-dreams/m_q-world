import type { User } from '@/schema/users';
import type { Adapter } from 'next-auth/adapters';
import type { Provider } from 'next-auth/providers';
import { db } from '@/lib/db';
import { accounts, sessions, verificationTokens } from '@/schema/auth-tables';
import { users } from '@/schema/users';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import bcrypt from 'bcrypt';

import { eq } from 'drizzle-orm';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

const adapter = {
  ...(DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }) as Adapter),
  createUser: async (data: User) => {
    const newUser = {
      id: crypto.randomUUID(),
      email: data.email,
      name: data.name,
      image: data.image,
      emailVerified: data.emailVerified,
      role: 'user',
    };

    await db.insert(users).values(newUser);
    return newUser;
  },
};

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: {},
      password: { type: 'password' },
    },
    authorize: async (credentials) => {
      const email = credentials.email as string;
      const password = credentials.password as string;
      const userObj = await db.query.users.findFirst({
        where: eq(users.email, email),
      });
      if (!userObj) {
        throw new Error('User not found.');
      }
      if (!userObj.password) {
        throw new Error('Password not found.');
      }
      const valid = bcrypt.compareSync(password, userObj.password);
      if (!valid) {
        throw new Error('Invalid password.');
      }
      return userObj;
    },
  }),
  GitHub,
  Google,
];

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  adapter,

  session: {
    strategy: 'jwt',
  },
  providers,
  pages: {
    signIn: '/signin',
  },

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role as string;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      return session;
    },
  },
});
