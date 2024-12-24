'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreatePasteForm } from '@/components/dashboard/create-paste-form';
import { supabase } from '@/lib/supabase/client';
import { generateShortCode } from '@/lib/utils/paste';

export default function CreatePastePage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (formData: any) => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const shortCode = generateShortCode();
      const { data, error } = await supabase.from('pastes').insert({
        ...formData,
        user_id: user.id,
        short_code: shortCode,
      }).select().single();

      if (error) throw error;
      router.push(`/dashboard/paste/${data.id}`);
    } catch (error) {
      console.error('Error creating paste:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Paste</h1>
      <CreatePasteForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}