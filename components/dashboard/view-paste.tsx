import { Paste } from '@/lib/types/paste';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { Eye, Lock, Clock, Copy, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ViewPasteProps {
  paste: Paste;
}

export function ViewPaste({ paste }: ViewPasteProps) {
  const { toast } = useToast();

  const copyToClipboard = async (text: string) => {
    if (typeof navigator !== 'undefined') {
      await navigator.clipboard.writeText(text);
      toast({
        title: 'Copied to clipboard',
        description: 'The content has been copied to your clipboard.',
      });
    }
  };

  const shareUrl = `${window.location.origin}/paste/${paste.short_code}`;

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{paste.title}</h1>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => copyToClipboard(paste.content)}
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => copyToClipboard(shareUrl)}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{paste.content}</code>
        </pre>
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
            {paste.view_count} views
          </span>
          {!paste.is_public && <span className="text-red-500">Private Paste</span>}
        </div>
        <div className="flex items-center space-x-4">
          {paste.expires_at && (
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              Expires {formatDistanceToNow(new Date(paste.expires_at), { addSuffix: true })}
            </span>
          )}
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            Created {formatDistanceToNow(new Date(paste.created_at), { addSuffix: true })}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
