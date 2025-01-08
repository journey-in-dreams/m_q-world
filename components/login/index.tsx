'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { Ellipsis } from 'lucide-react'
import NextForm from 'next/form'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const FormSchema = z.object({
  email: z.string().min(1, '邮箱地址不能为空').email('邮箱地址格式错误'),
  password: z.string().min(1, '密码不能为空'),
})

export default function Login({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [type, setType] = useState<'signIn' | 'signUp' | null>()
  const [accept, setAccept] = useState<boolean | 'indeterminate'>(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="relative grid h-[532px] w-[648px] grid-cols-2 bg-muted p-4">
          <div className={cn('absolute top-4 h-[500px] w-[300px]', 'translate-x-[16px]', type ? type === 'signIn' ? `animate-signInForm` : 'animate-signUpForm' : '')}>
            <div className="h-[500px] rounded-xl bg-white p-4">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">欢迎回来</h1>
                </div>
                <Form {...form}>
                  <NextForm action="" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mb-2">邮箱</FormLabel>
                          <FormControl>
                            <Input placeholder="m@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mb-2">密码</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="密码" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">密码</Label>
                        <Link
                          href="#"
                          className="ml-auto text-sm underline-offset-2 hover:underline"
                        >
                          忘记密码?
                        </Link>
                      </div>
                      <Input id="password" type="password" placeholder="密码" required />
                    </div> */}
                    <Button type="submit" className="w-full">
                      登录
                    </Button>
                  </NextForm>
                </Form>
                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
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
                      <Ellipsis />
                    </Button>
                  </div>
                  <div className="cursor-pointer text-xs underline underline-offset-4" onClick={() => setType(type === 'signUp' ? 'signIn' : 'signUp')}>
                    {type === 'signUp' ? '登录已有账号' : '注册新账号'}
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
          <div className={cn('absolute top-4 h-[500px] w-[300px] rounded-xl', 'translate-x-[332px]', type ? type === 'signIn' ? `animate-signInLogo` : 'animate-signUpLogo' : '')}>
            <div className="relative h-full overflow-hidden rounded-xl">
              <Image
                src="/seat.svg"
                alt=""
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
