/*
  # Create pastes table and setup security

  1. New Tables
    - `pastes`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `password_hash` (text, optional)
      - `expires_at` (timestamptz, optional)
      - `created_at` (timestamptz)
      - `user_id` (uuid, references auth.users)
      - `is_public` (boolean)
      - `view_count` (integer)
      - `short_code` (text, unique)

  2. Security
    - Enable RLS
    - Add policies for CRUD operations
    - Setup view count trigger
*/

-- Create the pastes table
CREATE TABLE IF NOT EXISTS pastes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  password_hash text,
  expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users,
  is_public boolean DEFAULT true,
  view_count integer DEFAULT 0,
  short_code text UNIQUE
);