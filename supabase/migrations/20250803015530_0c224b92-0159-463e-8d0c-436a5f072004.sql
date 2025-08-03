-- Fix security issues from the linter

-- Enable RLS on admins table since it has policies
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Fix the verify_admin_password function to have proper search_path
CREATE OR REPLACE FUNCTION public.verify_admin_password(admin_email text, admin_password text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
BEGIN
  -- Simple check: allow login for admins in the table
  RETURN EXISTS (
    SELECT 1 FROM public.admins 
    WHERE email = admin_email 
    AND password = admin_password
  );
END;
$$;