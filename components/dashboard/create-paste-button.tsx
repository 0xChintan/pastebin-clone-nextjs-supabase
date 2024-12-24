import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export function CreatePasteButton() {
  return (
    <Link href="/dashboard/create">
      <Button className="w-full sm:w-auto">
        <Plus className="w-4 h-4 mr-2" />
        Create New Paste
      </Button>
    </Link>
  );
}