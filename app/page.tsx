import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl font-bold">Welcome to PasteBin</h1>
        <p className="text-xl text-muted-foreground">
          Share code snippets, text, and more with our modern pastebin service.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/auth/login">
            <Button size="lg">Login</Button>
          </Link>
          <Link href="/auth/register">
            <Button size="lg" variant="outline">Register</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}