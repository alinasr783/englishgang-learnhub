-- Fix the function security issue
DROP FUNCTION public.verify_admin_password(text, text);

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