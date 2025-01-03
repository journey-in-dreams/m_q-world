import { Button } from '@/components/ui/button'
import { signOut } from '@/lib/auth'

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex max-w-xs flex-col items-center gap-2 rounded border p-5">
        <h5>Are you sure you want to sign out?</h5>
        <form
          action={async () => {
            'use server'
            await signOut({ redirectTo: '/' })
          }}
        >
          <Button type="submit">Sign out</Button>
        </form>
      </div>
    </div>
  )
}
