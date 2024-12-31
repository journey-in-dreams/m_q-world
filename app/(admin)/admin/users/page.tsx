import { UserTable } from '@/components/admin/users/user-table';
import { Pagination } from '@/components/pagination';
import { SearchInput } from '@/components/search-input';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';
import { parseSearchParams } from '@/lib/search-params-utils';
import { getUsersWithRelationsList } from '@/repositories/user-repository';
import { users } from '@/schema/users';
import { like } from 'drizzle-orm';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: {
  searchParams: SearchParams;
}) {
  const { searchParams } = props;
  const searchParamsInfo = await searchParams;

  const {
    page = 1,
    pageIndex = 0,
    pageSize = 10,
    search,
    sort = 'createdAt',
    sortOrder = 'desc',
  } = parseSearchParams(searchParamsInfo);
  const filters = search ? like(users.id, `%${search}%`) : undefined;
  const count = await db.$count(users, filters);
  const totalPages = Math.ceil(count / pageSize);
  const userList = await getUsersWithRelationsList({
    filters,
    sort,
    sortOrder,
    limit: pageSize,
    offset: pageIndex * pageSize,
  });

  return (
    <div className="flex flex-col gap-2 p-2">
      <h1 className="font-bold">Users</h1>
      <div className="flex flex-wrap justify-between gap-2">
        <div>
          <SearchInput />
        </div>
        <div>
          <Link href="/admin/users/new">
            <Button variant="secondary">
              <PlusIcon />
              {' '}
              New
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <UserTable userList={userList} />
      </div>
      <div className="p-2">
        <Pagination
          page={page}
          pageSize={pageSize}
          totalPages={totalPages}
          count={count}
        />
      </div>
    </div>
  );
}
