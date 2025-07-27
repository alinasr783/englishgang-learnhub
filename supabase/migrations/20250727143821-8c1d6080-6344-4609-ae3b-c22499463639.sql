-- Enable pgcrypto extension
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create function to verify admin password
CREATE OR REPLACE FUNCTION public.verify_admin_password(admin_email text, password_input text)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admins 
    WHERE email = admin_email 
    AND password = crypt(password_input, password)
  );
$$;