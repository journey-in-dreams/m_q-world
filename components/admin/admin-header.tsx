import type { User } from '@/schema/users';
import { LogOutIcon, SettingsIcon, User2Icon } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const items = [
  { title: 'Settings', url: '/admin/settings', icon: SettingsIcon },
  { title: 'Sign out', url: '/signout', icon: LogOutIcon },
];

export function AdminHeader({ user }: { user: User }) {
  return (
    <header className="fixed z-20 flex h-8 w-full shrink-0 items-center justify-between gap-2 border-b bg-background">
      <div className="flex w-full items-center justify-between">
        <div className="px-2 font-mono font-bold">
          <Link href="/">shadrizz</Link>
        </div>
        <div>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="flex h-8 items-center gap-2 px-2 hover:bg-muted focus:outline-none">
              <Avatar className="size-6">
                <AvatarImage src={user.image ?? undefined} />
                <AvatarFallback>
                  <User2Icon />
                </AvatarFallback>
              </Avatar>
              <div>{user.name}</div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {items.map(item => (
                <DropdownMenuItem key={item.title} asChild>
                  <Link
                    key={item.title}
                    href={item.url}
                    className="flex items-center gap-2 text-sm"
                  >
                    <item.icon className="size-4 shrink-0" />
                    <span>{item.title}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
