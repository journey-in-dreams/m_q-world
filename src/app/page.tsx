import { signIn } from '@/auth';
import Text from '@/components/text';
import Button from '@/components/ui/button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form
        action={async () => {
          'use server';
          // 登录完成后，重定向到user页面
          await signIn('google', { redirectTo: '/user' });
        }}
      >
        <Button>google登录</Button>
        <Text />
      </form>
    </main>
  );
}
