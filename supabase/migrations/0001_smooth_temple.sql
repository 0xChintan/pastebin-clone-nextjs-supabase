/*
  # Pastebin Schema Setup

  1. Tables Modified
    - `pastes` table:
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `content` (text, required)
      - `password_hash` (text, optional)
      - `expires_at` (timestamptz, optional)
      - `created_at` (timestamptz)
      - `user_id` (uuid, references auth.users)
      - `is_public` (boolean)
      - `view_count` (integer)
      - `short_code` (text, unique)

  2. Security
    - Enable RLS on `pastes` table
    - Add policies for:
      - Users can read their own pastes
      - Anyone can read public pastes
      - Only authenticated users can create pastes
      - Users can only update/delete their own pastes
*/

-- Drop existing constraints and columns if any
DO $$ 
BEGIN
  ALTER TABLE pastes DROP CONSTRAINT IF EXISTS pastes_user_id_fkey;
  ALTER TABLE pastes DROP CONSTRAINT IF EXISTS pastes_pkey;
END $$;

-- Recreate table with all required columns
ALTER TABLE pastes ADD COLUMN IF NOT EXISTS id uuid PRIMARY KEY DEFAULT gen_random_uuid();
ALTER TABLE pastes ADD COLUMN IF NOT EXISTS title text NOT NULL;
ALTER TABLE pastes ADD COLUMN IF NOT EXISTS content text NOT NULL;
ALTER TABLE pastes ADD COLUMN IF NOT EXISTS password_hash text;
ALTER TABLE pastes ADD COLUMN IF NOT EXISTS expires_at timestamptz;
ALTER TABLE pastes ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now();
ALTER TABLE pastes ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users;
ALTER TABLE pastes ADD COLUMN IF NOT EXISTS is_public boolean DEFAULT true;
ALTER TABLE pastes ADD COLUMN IF NOT EXISTS view_count integer DEFAULT 0;
ALTER TABLE pastes ADD COLUMN IF NOT EXISTS short_code text;

-- Create unique index for short_code
CREATE UNIQUE INDEX IF NOT EXISTS pastes_short_code_idx ON pastes(short_code);

-- Enable Row Level Security
ALTER TABLE pastes ENABLE ROW LEVEL SECURITY;

-- Policies for paste access
CREATE POLICY "Users can read their own pastes"
  ON pastes
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can read public pastes"
  ON pastes
  FOR SELECT
  TO public
  USING (
    is_public = true 
    AND (expires_at IS NULL OR expires_at > now())
  );

CREATE POLICY "Only authenticated users can create pastes"
  ON pastes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pastes"
  ON pastes
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own pastes"
  ON pastes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Function to increment view count
CREATE OR REPLACE FUNCTION increment_paste_view_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE pastes
  SET view_count = view_count + 1
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for view count
CREATE TRIGGER increment_view_count_trigger
  AFTER INSERT ON pastes
  FOR EACH ROW
  EXECUTE FUNCTION increment_paste_view_count();