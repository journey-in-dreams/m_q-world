import { ModeToggle } from '@/components/mode-toggle'
import Link from 'next/link'

export function Header() {
  return (
    <header className="mt-5 w-full sm:mt-0 sm:border-b">
      <div className="container mx-auto flex h-14 flex-col items-center justify-between gap-5 sm:flex-row sm:gap-0">
        <div className="flex items-center">
          <Link href="/" className="font-mono font-bold">
            shadrizz
          </Link>
        </div>
        <div>
          <Link href="/signin">Sign In</Link>
          <div className="ml-5 inline-block">
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
