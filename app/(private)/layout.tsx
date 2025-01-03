import { PrivateHeader } from '@/components/private/private-header'
import { PrivateSidebar } from '@/components/private/private-sidebar'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { users } from '@/schema/users'
import dayjs from 'dayjs'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  console.log('expires: ', dayjs(session?.expires).format('YYYY-MM-DD HH:mm:ss'))
  console.log('session: ', session)

  if (!session?.user?.id) {
    redirect('/signin')
  }

  const userObj = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
  })

  if (!userObj) {
    redirect('/signin')
  }

  return (
    <div>
      <PrivateHeader user={userObj} />
      <div>
        <PrivateSidebar />
        <div className="ml-8 flex flex-col sm:ml-40">
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  )
}

export const dynamic = 'force-dynamic'
