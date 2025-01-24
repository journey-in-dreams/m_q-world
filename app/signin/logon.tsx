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
import { toast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import NextForm from 'next/form'
import { useForm } from 'react-hook-form'

import { z } from 'zod'

const FormSchema = z.object({
  email: z.string().min(1, '邮箱地址不能为空').email('邮箱地址格式错误'),
  password: z.string().min(1, '密码不能为空'),
})

export default function Logon(props: { accept: boolean | 'indeterminate' }) {
  const { accept } = props
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    console.log(accept)
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
    <Form {...form}>
      <NextForm action="" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center h-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-9">
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
            <FormItem className="mb-9">
              <div className="flex mb-1 items-center justify-between h-5">
                <FormLabel>密码</FormLabel>
                <div className=" text-xs">忘记密码？</div>
              </div>
              <FormControl>
                <Input type="password" placeholder="密码" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          登录
        </Button>
      </NextForm>
    </Form>
  )
}
