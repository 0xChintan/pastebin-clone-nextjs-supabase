import { Paste } from '@/lib/types/paste';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { Eye, Lock, Clock } from 'lucide-react';
import Link from 'next/link';

interface PasteListProps {
  pastes: Paste[];
  loading: boolean;
}

export function PasteList({ pastes, loading }: PasteListProps) {
  console.log('Pastes:', pastes);
console.log('Loading:', loading);
  if (loading) {
    return <div className="text-center">Loading your pastes...</div>;
  }

  if (pastes.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        You haven&apos;t created any pastes yet.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {pastes.map((paste) => (
        <Link key={paste.id} href={`/dashboard/paste/${paste.id}`}>
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardHeader>
              <h3 className="text-lg font-semibold">{paste.title}</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {paste.content}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between text-sm text-muted-foreground">
              <div className="flex items-center space-x-4">
                {paste.password_hash && (
                  <span className="flex items-center">
                    <Lock className="w-4 h-4 mr-1" />
                    Protected
                  </span>
                )}
                <span className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {paste.view_count}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {formatDistanceToNow(new Date(paste.created_at), { addSuffix: true })}
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}