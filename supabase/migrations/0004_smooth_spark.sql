/*
  # Enable RLS and create policies for pastes table

  1. Security
    - Enable Row Level Security
    - Create policies for:
      - Reading own pastes
      - Reading public pastes
      - Creating pastes
      - Updating own pastes
      - Deleting own pastes
*/

-- Enable RLS
ALTER TABLE pastes ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own pastes
CREATE POLICY "Users can read their own pastes"
  ON pastes
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy: Anyone can read public pastes
CREATE POLICY "Anyone can read public pastes"
  ON pastes
  FOR SELECT
  TO public
  USING (
    is_public = true 
    AND (expires_at IS NULL OR expires_at > now())
  );

-- Policy: Only authenticated users can create pastes
CREATE POLICY "Only authenticated users can create pastes"
  ON pastes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own pastes
CREATE POLICY "Users can update their own pastes"
  ON pastes
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own pastes
CREATE POLICY "Users can delete their own pastes"
  ON pastes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);