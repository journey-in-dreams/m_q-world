import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { sendSignupEmail } from '@/lib/mail'
import { zodResolver } from '@hookform/resolvers/zod'
import NextForm from 'next/form'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

import { z } from 'zod'

const FormSchema = z.object({
  name: z.string().min(1, '用户名不能为空'),
  email: z.string().min(1, '邮箱地址不能为空').email('邮箱地址格式错误'),
  password: z.string().min(1, '密码不能为空'),
})

export default function Logon(props: { accept: boolean | 'indeterminate' }) {
  const { accept } = props
  const { toast } = useToast()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    sendSignupEmail(data.email)
    console.log(accept)
    toast({
      title: '',
      description: (
        <Link href="https://mail.qq.com" target="_blank">已向您的邮箱发送验证链接，点击前往</Link>
      ),
    })
  }

  return (
    <Form {...form}>
      <NextForm action="" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center h-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="mb-2">
              <div className="flex mb-1 items-center justify-between h-5">
                <FormLabel>用户名</FormLabel>
              </div>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-2">
              <div className="flex mb-1 items-center justify-between h-5">
                <FormLabel>邮箱</FormLabel>
              </div>
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
            <FormItem className="mb-2">
              <div className="flex mb-1 items-center justify-between h-5">
                <FormLabel>密码</FormLabel>
                <div className="text-xs">忘记密码？</div>
              </div>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          发送验证邮件
        </Button>
      </NextForm>
    </Form>
  )
}
