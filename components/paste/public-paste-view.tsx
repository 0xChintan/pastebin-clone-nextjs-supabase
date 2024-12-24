import { Paste } from '@/lib/types/paste';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { Eye, Clock, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PublicPasteViewProps {
  paste: Paste;
}

export function PublicPasteView({ paste }: PublicPasteViewProps) {
  const { toast } = useToast();

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to clipboard',
      description: 'The content has been copied to your clipboard.',
    });
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{paste.title}</h1>
          <Button
            variant="outline"
            size="icon"
            onClick={() => copyToClipboard(paste.content)}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{paste.content}</code>
        </pre>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <span className="flex items-center">
          <Eye className="w-4 h-4 mr-1" />
          {paste.view_count} views
        </span>
        <span className="flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          Created {formatDistanceToNow(new Date(paste.created_at), { addSuffix: true })}
        </span>
      </CardFooter>
    </Card>
  );
}