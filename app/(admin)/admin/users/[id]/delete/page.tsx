import { UserDeleteForm } from '@/components/admin/users/user-delete-form';
import { db } from '@/lib/db';
import { users } from '@/schema/users';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';

type Params = Promise<{ id: string }>;

export default async function Page(props: { params: Params }) {
  const { params } = props;
  const paramsInfo = await params;
  const { id } = paramsInfo;
  const userObj = await db.query.users.findFirst({ where: eq(users.id, id) });

  if (!userObj) {
    notFound();
  }

  return (
    <div className="p-2">
      <h1 className="font-bold">Delete User</h1>
      <UserDeleteForm user={userObj} />
    </div>
  );
}
