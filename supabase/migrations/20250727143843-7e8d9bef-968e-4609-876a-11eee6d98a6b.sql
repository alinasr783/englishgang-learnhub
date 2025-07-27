-- Update admins table to use plain text password for simplicity (in production this should be hashed)
-- For now, let's use a simple approach
UPDATE public.admins 
SET password = 'Alinasr89#' 
WHERE email = 'alinasreldin783@gmail.com';

-- Create simple function to verify admin password
CREATE OR REPLACE FUNCTION public.verify_admin_password(admin_email text, password_input text)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admins 
    WHERE email = admin_email 
    AND password = password_input
  );
$$;