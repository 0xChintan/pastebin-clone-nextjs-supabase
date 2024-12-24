export interface Paste {
  id: string;
  title: string;
  content: string;
  password_hash?: string;
  expires_at?: string | null;
  created_at: string;
  user_id: string;
  is_public: boolean;
  view_count: number;
  short_code: string;
}