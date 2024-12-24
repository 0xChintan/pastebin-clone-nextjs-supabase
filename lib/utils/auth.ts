import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export async function requireAuth() {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/auth/login');
  }
  
  return session;
}