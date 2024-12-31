'use client';

import type { DeleteUserState } from '@/actions/admin/users/delete-user';
import type { User } from '@/schema/users';
import { deleteUser } from '@/actions/admin/users/delete-user';
import { Button } from '@/components/ui/button';
import { useActionState } from 'react';

export function UserDeleteForm({ user }: { user: User }) {
  const initialState: DeleteUserState = {};
  const [state, dispatch] = useActionState(deleteUser, initialState);

  return (
    <div>
      <form action={dispatch} className="flex flex-col gap-2">
        <input type="hidden" name="id" value={user.id} />
        <div>
          <Button type="submit" variant="destructive">
            Delete
          </Button>
        </div>
        {state.message && <p>{state.message}</p>}
      </form>
    </div>
  );
}
