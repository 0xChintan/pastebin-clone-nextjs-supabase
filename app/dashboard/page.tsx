'use client';

import { useEffect, useState } from 'react';
import { Paste } from '@/lib/types/paste';
import { supabase } from '@/lib/supabase/client';
import { PasteList } from '@/components/dashboard/paste-list';
import { CreatePasteButton } from '@/components/dashboard/create-paste-button';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';

export default function DashboardPage() {
  const [pastes, setPastes] = useState<Paste[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPastes() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('pastes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching pastes:', error);
        return;
      }

      setPastes(data || []);
      setLoading(false);
    }

    fetchPastes();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader />
      <div className="mb-8">
        <CreatePasteButton />
      </div>
      <PasteList pastes={pastes} loading={loading} />
    </div>
  );
}