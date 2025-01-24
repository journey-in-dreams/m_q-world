import type { Session } from 'next-auth'

export function isLogon(session: Session) {
  return Boolean(session?.user?.role)
}

export function isAdmin(session: Session) {
  return session?.user?.role === 'admin'
}
