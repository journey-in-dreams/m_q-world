import { AdminHeader } from '@/components/admin/admin-header'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { users } from '@/schema/users'
import { isAdmin } from '@/services/authorization-service'
import { eq } from 'drizzle-orm'
import { notFound, redirect } from 'next/navigation'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user?.id) {
    redirect('/admin-login')
  }

  if (!isAdmin(session)) {
    notFound()
  }

  const userObj = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
  })

  if (!userObj) {
    redirect('/admin-login')
  }

  return (
    <div>
      <AdminHeader user={userObj} />
      <div>
        <AdminSidebar />
        <div className="ml-8 flex flex-col sm:ml-40">
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  )
}

export const dynamic = 'force-dynamic'
