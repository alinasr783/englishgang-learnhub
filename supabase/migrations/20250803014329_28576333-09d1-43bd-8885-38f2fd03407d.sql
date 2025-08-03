-- Add payment methods table
CREATE TABLE public.payment_methods (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- 'mobile_wallet', 'bank_account', 'crypto', etc.
  details TEXT NOT NULL, -- account number, wallet number, etc.
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID
);

-- Enable RLS
ALTER TABLE public.payment_methods ENABLE ROW LEVEL SECURITY;

-- Create policies for payment methods
CREATE POLICY "Anyone can view active payment methods" 
ON public.payment_methods 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Only authenticated users can manage payment methods" 
ON public.payment_methods 
FOR ALL 
USING (auth.uid() IS NOT NULL);

-- Add trigger for updated_at
CREATE TRIGGER update_payment_methods_updated_at
BEFORE UPDATE ON public.payment_methods
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some default payment methods
INSERT INTO public.payment_methods (name, type, details) VALUES
('Vodafone Cash', 'mobile_wallet', '01012345678'),
('Orange Money', 'mobile_wallet', '01112345678'),
('CIB Bank Account', 'bank_account', 'Account: 123456789 - Name: English Learning Center'),
('Instapay', 'instant_payment', 'egyptenglish@instapay.com');