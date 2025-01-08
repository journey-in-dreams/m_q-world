import Login from '@/components/login'

// type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function Page() {
  // const { searchParams } = props
  // const searchParamsInfo = await searchParams

  return (
    <div className="flex min-h-screen items-center justify-center">
      {/* <Card>
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

          <Separator className="my-4" />
          {searchParamsInfo.error && (
            <p>Login failed</p>
          )}
        </CardContent>
      </Card> */}
      <Login />
    </div>
  )
}
