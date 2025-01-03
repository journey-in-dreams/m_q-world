'use server'

import { signIn } from '@/lib/auth'
import { db } from '@/lib/db'
import { users } from '@/schema/users'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'

export interface AdminLoginState {
  message?: string
}

export async function adminLogin(
  _prevState: AdminLoginState,
  formData: FormData,
): Promise<AdminLoginState> {
  'use server'
  try {
    const userObj = await db.query.users.findFirst({
      where: eq(users.email, formData.get('email') as string),
    })

    if (userObj?.role !== 'admin') {
      return {
        message: 'Unauthorized',
      }
    }

    await signIn('credentials', {
      redirect: false,
      email: formData.get('email'),
      password: formData.get('password'),
    })
  } catch (error) {
    console.error(error)
    return {
      message: 'Login failed.',
    }
  }
  redirect('/admin')
}
