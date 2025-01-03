import type { UsersWithRelationsList } from '@/repositories/user-repository'
import { Sortable } from '@/components/sortable'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { EllipsisIcon, EyeIcon, PencilIcon, TrashIcon } from 'lucide-react'
import Link from 'next/link'

export function UserTable({ userList }: { userList: UsersWithRelationsList }) {
  return (
    <Table>
      <TableHeader className="bg-background">
        <TableRow>
          <TableHead><Sortable column="id">Id</Sortable></TableHead>
          <TableHead><Sortable column="name">Name</Sortable></TableHead>
          <TableHead><Sortable column="email">Email</Sortable></TableHead>
          <TableHead><Sortable column="emailVerified">Email Verified</Sortable></TableHead>
          <TableHead><Sortable column="image">Image</Sortable></TableHead>
          <TableHead><Sortable column="role">Role</Sortable></TableHead>
          <TableHead><Sortable column="password">Password</Sortable></TableHead>
          <TableHead><Sortable column="createdAt">Created At</Sortable></TableHead>
          <TableHead><Sortable column="updatedAt">Updated At</Sortable></TableHead>
          <TableHead className="sticky right-0"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        { userList.map(userObj => (
          <TableRow key={userObj.id}>
            <TableCell>{ userObj.id }</TableCell>
            <TableCell>{ userObj.name }</TableCell>
            <TableCell>{ userObj.email }</TableCell>
            <TableCell>{ userObj.emailVerified?.toLocaleString() }</TableCell>
            <TableCell>{ userObj.image }</TableCell>
            <TableCell>{ userObj.role }</TableCell>
            <TableCell>{ userObj.password }</TableCell>
            <TableCell>{ userObj.createdAt?.toLocaleString() }</TableCell>
            <TableCell>{ userObj.updatedAt?.toLocaleString() }</TableCell>
            <TableCell className="sticky right-0 h-full w-6 bg-primary-foreground p-0 align-top">
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <EllipsisIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/users/${userObj.id}`} className="flex items-center gap-2 text-sm">
                      <EyeIcon className="size-4 shrink-0" />
                      {' '}
                      View
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/users/${userObj.id}/edit`} className="flex items-center gap-2 text-sm">
                      <PencilIcon className="size-4 shrink-0" />
                      {' '}
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/users/${userObj.id}/delete`} className="flex items-center gap-2 text-sm">
                      <TrashIcon className="size-4 shrink-0" />
                      {' '}
                      Delete
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
