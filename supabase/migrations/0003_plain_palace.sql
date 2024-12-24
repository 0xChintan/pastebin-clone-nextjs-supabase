/*
  # Create indexes for pastes table

  1. Indexes
    - Unique index on short_code for fast lookups
    - Index on user_id for faster user queries
    - Index on expires_at for cleanup
*/

-- Create indexes
CREATE UNIQUE INDEX IF NOT EXISTS pastes_short_code_idx ON pastes(short_code);
CREATE INDEX IF NOT EXISTS pastes_user_id_idx ON pastes(user_id);
CREATE INDEX IF NOT EXISTS pastes_expires_at_idx ON pastes(expires_at);