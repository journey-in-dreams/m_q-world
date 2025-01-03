import type { Adapter, AdapterUser } from 'next-auth/adapters'
import type { Provider } from 'next-auth/providers'
import { db } from '@/lib/db'

import { accounts, sessions, verificationTokens } from '@/schema/auth-tables'
import { users } from '@/schema/users'

import { DrizzleAdapter } from '@auth/drizzle-adapter'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { eq } from 'drizzle-orm'

import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

dotenv.config({ path: '.env.local' })

const adapter = {
  ...(DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }) as Adapter),
}

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: {},
      password: { type: 'password' },
    },
    authorize: async (credentials) => {
      const email = credentials.email as string
      const password = credentials.password as string
      const userObj = await db.query.users.findFirst({
        where: eq(users.email, email),
      })
      if (!userObj) {
        throw new Error('User not found.')
      }
      if (!userObj.password) {
        throw new Error('Password not found.')
      }
      const valid = bcrypt.compareSync(password, userObj.password)
      if (!valid) {
        throw new Error('Invalid password.')
      }
      return userObj
    },
  }),
  GitHub,
  Google({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
    profile(profile) {
      return {
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: profile.picture,
        emailVerified: profile.email_verified,
        role: 'user',
      }
    },
  }),
]

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  adapter,
  providers,
  session: {
    maxAge: 24 * 60 * 60,
  },
  pages: {
    signIn: '/signin',
  },
  events: {
    linkAccount: async ({ user, profile }) => {
      // 第三方(Google, GitHub)认证过的邮箱直接认证
      const adapterProfile = profile as AdapterUser
      const partialUser: Partial<AdapterUser> & Pick<AdapterUser, 'id'> = {
        id: user.id as string,
        emailVerified: adapterProfile.emailVerified ? new Date() : null,
      }
      if (adapter && adapter.updateUser) {
        await adapter.updateUser(partialUser)
      } else {
        console.error('Adapter or updateUser function is undefined')
      }
    },
  },
})
