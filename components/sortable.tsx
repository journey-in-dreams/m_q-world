'use client'

import type { ReactNode } from 'react'
import { MoveDownIcon, MoveUpIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type SortOrder = 'asc' | 'desc' | 'none'

export function Sortable({
  children,
  column,
}: {
  children: ReactNode
  column: string
}) {
  const [sortOrder, setSortOrder] = useState<SortOrder>('none')
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  useEffect(() => {
    const sort = searchParams.get('sort')
    if (sort !== column) {
      setSortOrder('none')
    }
  }, [searchParams, column])

  function handleClick() {
    const params = new URLSearchParams(searchParams)

    switch (sortOrder) {
      case 'asc':
        setSortOrder('desc')
        params.set('sortOrder', 'desc')
        params.set('sort', column)
        break
      case 'desc':
        setSortOrder('none')
        params.delete('sortOrder')
        params.delete('sort')
        break
      case 'none':
        setSortOrder('asc')
        params.set('sortOrder', 'asc')
        params.set('sort', column)
        break
      default:
        throw new Error(`unhandled case: ${sortOrder}`)
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick()
        }
      }}
      role="button"
      tabIndex={0}
      className="flex cursor-pointer select-none items-center"
    >
      <div className="text-nowrap">{children}</div>
      {sortOrder === 'asc' && <MoveUpIcon className="size-3" />}
      {sortOrder === 'desc' && <MoveDownIcon className="size-3" />}
      {sortOrder === 'none' && <div className="size-3"></div>}
    </div>
  )
}
