'use client'

import { cn } from '@/lib/utils'
import { GaugeIcon, Table2Icon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const items = [
  { title: 'Admin', url: '/admin', icon: GaugeIcon },
  { title: 'Users', url: '/admin/users', icon: Table2Icon },
// [CODE_MARK admin-sidebar-items]
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="fixed top-8 z-20 flex min-h-screen w-8 flex-col border-r bg-background text-sm sm:w-40">
      {items.map(item => (
        <Link
          key={item.title}
          href={item.url}
          className={cn(
            'flex items-center gap-1 p-1 hover:bg-muted m-1 rounded',
            pathname === item.url && 'bg-muted',
          )}
        >
          <item.icon className="size-4 shrink-0" />
          <span className="hidden sm:block">{item.title}</span>
        </Link>
      ))}
    </div>
  )
}
