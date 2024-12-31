import { UserUpdateForm } from '@/components/admin/users/user-update-form';
import { getUserWithRelations } from '@/repositories/user-repository';
import { notFound } from 'next/navigation';

type Params = Promise<{ id: string }>;

export default async function Page(props: { params: Params }) {
  const { params } = props;
  const paramsInfo = await params;
  const { id } = paramsInfo;
  const userObj = await getUserWithRelations(id);

  if (!userObj) {
    notFound();
  }

  return (
    <div className="p-2">
      <h1 className="font-bold">Editing User</h1>
      <UserUpdateForm
        user={userObj}
      />
    </div>
  );
}
