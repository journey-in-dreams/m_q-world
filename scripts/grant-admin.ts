import { db } from '@/lib/db'
import { users } from '@/schema/users'
import { eq } from 'drizzle-orm'
import { openConnection } from './sdb'

async function main() {
  const { sdb, closeConnection } = await openConnection()

  const email = process.argv[2] as string

  const userObj = await sdb.query.users.findFirst({
    where: eq(users.email, email),
  })

  if (!userObj) {
    throw new Error(`user not found ${email}`)
  }

  await db.update(users).set({ role: 'admin' }).where(eq(users.email, email))

  console.log(`granted admin role to user ${email}`)

  await closeConnection()

  process.exit(0)
}

main()
