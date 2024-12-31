/* eslint-disable unused-imports/no-unused-imports */

import type { DefaultSession, User as IUser } from 'next-auth';
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User extends IUser {
    id: string;
    role: string;
  }

  interface Account {}

  interface Session extends DefaultSession {
    user?: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
  }
}
