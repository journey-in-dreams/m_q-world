import { users } from '@/schema/users'
import bcrypt from 'bcrypt'
import { openConnection } from './sdb'

async function main() {
  const { sdb, closeConnection } = await openConnection()
  const email = process.argv[2] as string
  const password = process.argv[3] as string
  const hash = bcrypt.hashSync(password, 10)
  await sdb.insert(users).values({ email, password: hash, role: 'user' })
  console.log(`created user ${email}`)
  await closeConnection()
}

main()
