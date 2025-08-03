-- Update RLS policies for admins table to allow authenticated users to manage admins
DROP POLICY IF EXISTS "Anyone can verify admin credentials" ON public.admins;

-- Allow authenticated users to view all admins
CREATE POLICY "Authenticated users can view admins" 
ON public.admins 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Allow authenticated users to insert new admins  
CREATE POLICY "Authenticated users can insert admins" 
ON public.admins 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

-- Allow authenticated users to update admins
CREATE POLICY "Authenticated users can update admins" 
ON public.admins 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

-- Allow authenticated users to delete admins
CREATE POLICY "Authenticated users can delete admins" 
ON public.admins 
FOR DELETE 
USING (auth.uid() IS NOT NULL);