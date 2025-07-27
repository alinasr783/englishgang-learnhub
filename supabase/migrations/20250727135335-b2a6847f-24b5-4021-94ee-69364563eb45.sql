-- Create profiles table for admin users
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Admins can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create teachers table
CREATE TABLE public.teachers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  specialization TEXT NOT NULL,
  rating DECIMAL(2,1) DEFAULT 0,
  reviews INTEGER DEFAULT 0,
  hourly_rate DECIMAL(10,2) NOT NULL,
  experience INTEGER NOT NULL,
  languages TEXT[] NOT NULL,
  image_url TEXT,
  is_online BOOLEAN DEFAULT false,
  bio TEXT,
  education TEXT,
  certifications TEXT[],
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for teachers
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;

-- Create policies for teachers
CREATE POLICY "Anyone can view teachers" 
ON public.teachers 
FOR SELECT 
USING (true);

CREATE POLICY "Only authenticated users can manage teachers" 
ON public.teachers 
FOR ALL 
USING (auth.uid() IS NOT NULL);

-- Create courses table
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  level TEXT NOT NULL CHECK (level IN ('مبتدئ', 'متوسط', 'متقدم')),
  duration TEXT NOT NULL,
  students INTEGER DEFAULT 0,
  rating DECIMAL(2,1) DEFAULT 0,
  price DECIMAL(10,2) NOT NULL,
  instructor TEXT NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL,
  features TEXT[] NOT NULL,
  content_outline TEXT[],
  prerequisites TEXT[],
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for courses
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Create policies for courses
CREATE POLICY "Anyone can view courses" 
ON public.courses 
FOR SELECT 
USING (true);

CREATE POLICY "Only authenticated users can manage courses" 
ON public.courses 
FOR ALL 
USING (auth.uid() IS NOT NULL);

-- Create theme settings table
CREATE TABLE public.theme_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  primary_color TEXT NOT NULL DEFAULT '#3B82F6',
  secondary_color TEXT NOT NULL DEFAULT '#10B981',
  accent_color TEXT NOT NULL DEFAULT '#F59E0B',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for theme settings
ALTER TABLE public.theme_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for theme settings
CREATE POLICY "Anyone can view theme settings" 
ON public.theme_settings 
FOR SELECT 
USING (true);

CREATE POLICY "Only authenticated users can manage theme settings" 
ON public.theme_settings 
FOR ALL 
USING (auth.uid() IS NOT NULL);

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES 
('course-images', 'course-images', true),
('teacher-images', 'teacher-images', true);

-- Create storage policies for course images
CREATE POLICY "Anyone can view course images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'course-images');

CREATE POLICY "Authenticated users can upload course images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'course-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update course images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'course-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete course images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'course-images' AND auth.uid() IS NOT NULL);

-- Create storage policies for teacher images
CREATE POLICY "Anyone can view teacher images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'teacher-images');

CREATE POLICY "Authenticated users can upload teacher images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'teacher-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update teacher images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'teacher-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete teacher images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'teacher-images' AND auth.uid() IS NOT NULL);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_teachers_updated_at
    BEFORE UPDATE ON public.teachers
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_courses_updated_at
    BEFORE UPDATE ON public.courses
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_theme_settings_updated_at
    BEFORE UPDATE ON public.theme_settings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger to create profile after user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (user_id, email, role)
    VALUES (NEW.id, NEW.email, 'admin');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();