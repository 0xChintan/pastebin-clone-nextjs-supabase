'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { PublicPasteView } from '@/components/paste/public-paste-view';
import { PasswordPrompt } from '@/components/paste/password-prompt';
import type { Paste } from '@/lib/types/paste';

export default function PublicPastePage() {
  const { shortCode } = useParams();
  console.log(shortCode);
  const [paste, setPaste] = useState<Paste | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPasswordProtected, setIsPasswordProtected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPaste = async (password?: string) => {
    try {
      const { data, error } = await supabase
        .from('pastes')
        .select('*')
        .eq('short_code', shortCode)
        .single();

      if (error) throw error;
      if (!data) throw new Error('Paste not found');

      if (data.password_hash && !password) {
        setIsPasswordProtected(true);
        setLoading(false);
        return;
      }

      setPaste(data);
    } catch (err) {
      setError('Paste not found or has expired');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaste();
  }, [shortCode]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-destructive">{error}</h1>
      </div>
    );
  }

  if (isPasswordProtected && !paste) {
    return <PasswordPrompt onSubmit={fetchPaste} />;
  }

  if (!paste) {
    return <div className="container mx-auto px-4 py-8">Paste not found</div>;
  }

  return <PublicPasteView paste={paste} />;
}