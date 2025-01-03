'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { users } from '@/schema/users'
import { isAdmin } from '@/services/authorization-service'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const insertUserSchema = z.object({
  name: z.coerce.string(),
  email: z.coerce.string(),
  emailVerified: z.coerce.date(),
  image: z.coerce.string(),
  role: z.coerce.string(),
  password: z.coerce.string(),
})

export interface CreateUserState {
  errors?: {
    id?: string[]
    name?: string[]
    email?: string[]
    emailVerified?: string[]
    image?: string[]
    role?: string[]
    password?: string[]
  }
  message?: string
}

export async function createUser(
  _prevState: CreateUserState,
  formData: FormData,
): Promise<CreateUserState> {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error('unauthenticated')
  }

  if (!isAdmin(session)) {
    throw new Error('unauthorized')
  }

  const validatedFields = insertUserSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    emailVerified: formData.get('emailVerified'),
    image: formData.get('image'),
    role: formData.get('role'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'invalid data',
    }
  }

  try {
    await db.insert(users).values(validatedFields.data)
  } catch (error) {
    console.error(error)
    return {
      message: 'database error',
    }
  }

  revalidatePath('/admin/users')
  redirect('/admin/users')
}