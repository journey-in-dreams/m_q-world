import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { ExternalLinkIcon, GaugeIcon, LayoutDashboardIcon } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex h-screen flex-col justify-center">
      <Header />
      <main className="m-auto flex w-72 flex-1 flex-col justify-center gap-5">
        <h1 className="font-mono text-4xl font-bold">shadrizz</h1>
        <Link href="https://docs.shadrizz.com" target="_blank">
          <Button className="w-full">
            <ExternalLinkIcon />
            {' '}
            View Documentation
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button className="w-full" variant="outline">
            <LayoutDashboardIcon />
            {' '}
            User Dashboard
          </Button>
        </Link>
        <Link href="/admin">
          <Button className="w-full" variant="outline">
            <GaugeIcon />
            {' '}
            Admin Dashboard
          </Button>
        </Link>
      </main>
      <Footer />
    </div>
  );
}
