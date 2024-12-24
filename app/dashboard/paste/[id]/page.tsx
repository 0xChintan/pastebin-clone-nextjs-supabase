'use client';

import { useEffect, useState } from 'react';
import { Paste } from '@/lib/types/paste';
import { supabase } from '@/lib/supabase/client';
import { ViewPaste } from '@/components/dashboard/view-paste';
import { useParams } from 'next/navigation';

export default function PasteViewPage() {
  const { id } = useParams();
  const [paste, setPaste] = useState<Paste | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log('ID:', );
    async function fetchPaste() {
      const { data, error } = await supabase
        .from('pastes')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching paste:', error);
        return;
      }

      setPaste(data);
      setLoading(false);
    }

    fetchPaste();
  }, [id]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!paste) {
    return <div className="container mx-auto px-4 py-8">Paste not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ViewPaste paste={paste} />
    </div>
  );
}