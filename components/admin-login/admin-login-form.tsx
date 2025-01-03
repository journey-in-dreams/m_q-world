'use client'

import type { AdminLoginState } from '@/actions/admin-login/admin-login'
import { adminLogin } from '@/actions/admin-login/admin-login'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { startTransition, useActionState } from 'react'

export function AdminLoginForm() {
  const initialState: AdminLoginState = {}
  const [state, dispatch] = useActionState(adminLogin, initialState)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    startTransition(() => dispatch(formData))
  }

  return (
    <form
      key="credentials"
      className="mb-5 flex w-full flex-col items-center gap-2"
      action={dispatch}
      onSubmit={handleSubmit}
    >
      <div className="w-full">
        <Label>Email</Label>
        <Input type="text" name="email" placeholder="user@example.com" />
      </div>
      <div className="w-full">
        <Label>Password</Label>
        <Input type="password" name="password" placeholder="password" />
      </div>
      <Button className="w-full" type="submit">
        <span>Sign in</span>
      </Button>
      {state.message && <p>{state.message}</p>}
    </form>
  )
}
