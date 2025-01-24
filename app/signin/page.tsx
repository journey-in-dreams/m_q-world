'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { Ellipsis } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { z } from 'zod'
import Logon from './logon'
import Signup from './signup'

const _typeEnum = z.enum(['logon', 'signup'])
type ITypeEnum = z.infer<typeof _typeEnum>

export default function Page() {
  const [type, setType] = useState<ITypeEnum>()
  const [accept, setAccept] = useState<boolean | 'indeterminate'>(false)

  return (
    <div className="flex min-h-screen items-center justify-center bg-[url('/bg.gif')] bg-no-repeat bg-center bg-cover">
      <div className="flex flex-col">
        <Card className="overflow-hidden">
          <CardContent className="relative grid h-[608px] w-[760px] grid-cols-2 bg-muted p-4">
            <div className={cn('absolute top-4 h-[576px] w-[356px]', 'translate-x-[16px]', type ? type === 'logon' ? `animate-logon-form` : 'animate-signup-form' : '')}>
              <div className="h-[576px] rounded-xl bg-white p-4">
                <div className="flex flex-col gap-4 h-full">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">欢迎回来</h1>
                  </div>
                  <div className="flex-auto">
                    { type === 'signup' ? <Signup accept={accept} /> : <Logon accept={accept} />}
                  </div>
                  <div className="relative text-center text-xs after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                      使用其他方式登录
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button variant="outline" className="w-9 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path
                            d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                            fill="currentColor"
                          />
                        </svg>
                      </Button>
                      <Button variant="outline" className="w-9 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path
                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                            fill="currentColor"
                          />
                        </svg>
                      </Button>
                      <Button variant="outline" className="w-9 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path
                            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                            fill="currentColor"
                          />
                        </svg>
                      </Button>
                      <Button variant="outline" className="w-9 rounded-full">
                        <Ellipsis />
                      </Button>
                    </div>
                    <div className="cursor-pointer text-xs underline underline-offset-4" onClick={() => setType(type === 'signup' ? 'logon' : 'signup')}>
                      {type === 'signup' ? '已有账号登录' : '注册新账号'}
                    </div>
                  </div>
                  <div className="flex items-center justify-center text-xs text-muted-foreground">
                    <Checkbox
                      checked={accept}
                      onCheckedChange={value => setAccept(value)}
                    />
                    <span className="ml-2">同意</span>
                    <Link href="#">《服务条款》</Link>
                    <span>与</span>
                    <Link href="#">《隐私政策》</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className={cn('absolute top-4 h-[576px] w-[356px] rounded-xl bg-[url("/bg-logon.png")] bg-cover', 'translate-x-[388px]', type ? type === 'logon' ? `animate-logon-logo` : 'animate-signup-logo' : '')}>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
