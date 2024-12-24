/*
  # Create view count trigger for pastes

  1. Functions
    - Create function to increment view count
  2. Triggers
    - Create trigger to automatically increment view count
*/

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

-- Create trigger for view count
CREATE TRIGGER increment_view_count_trigger
  AFTER INSERT ON pastes
  FOR EACH ROW
  EXECUTE FUNCTION increment_paste_view_count();