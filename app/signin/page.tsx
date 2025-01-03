import { SignInForm } from '@/components/signin/signin-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { signIn } from '@/lib/auth'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function Page(props: {
  searchParams: SearchParams
}) {
  const { searchParams } = props
  const searchParamsInfo = await searchParams

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            key="google"
            className="flex w-full flex-col items-center gap-2"
            action={async () => {
              'use server'
              try {
                await signIn('google', {
                  redirectTo: '/dashboard',
                })
              } catch (error) {
                if (error instanceof AuthError) {
                  return redirect(`/signin/?error=${error.type}`)
                }
                throw error
              }
            }}
          >
            <Button className="w-full" type="submit">
              <span>Sign in with Google</span>
            </Button>
          </form>
          <Separator className="my-4" />
          <form
            key="github"
            className="flex w-full flex-col items-center gap-2"
            action={async () => {
              'use server'
              try {
                await signIn('github', {
                  redirectTo: '/dashboard',
                })
              } catch (error) {
                if (error instanceof AuthError) {
                  return redirect(`/signin/?error=${error.type}`)
                }
                throw error
              }
            }}
          >
            <Button className="w-full" type="submit">
              <span>Sign in with GitHub</span>
            </Button>
          </form>
          <Separator className="my-4" />
          <SignInForm />
          <Separator className="my-4" />
          {searchParamsInfo.error && (
            <p>Login failed</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
