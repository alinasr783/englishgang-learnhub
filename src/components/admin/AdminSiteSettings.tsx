import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, Save, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface SiteSettings {
  id: string;
  site_name: string;
  logo_url: string | null;
}

const AdminSiteSettings = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setSettings(data);
      } else {
        // Create default settings if none exist
        const { data: newSettings, error: createError } = await supabase
          .from('site_settings')
          .insert([{ site_name: 'English Learning Platform' }])
          .select()
          .single();

        if (createError) throw createError;
        setSettings(newSettings);
      }
    } catch (error) {
      console.error('Error fetching site settings:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل إعدادات الموقع",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    if (!settings) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('site_settings')
        .update({
          site_name: settings.site_name,
          logo_url: settings.logo_url,
        })
        .eq('id', settings.id);

      if (error) throw error;

      toast({
        title: "تم الحفظ",
        description: "تم حفظ إعدادات الموقع بنجاح",
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "خطأ",
        description: "فشل في حفظ إعدادات الموقع",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `logo.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('teacher-images')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('teacher-images')
        .getPublicUrl(fileName);

      setSettings(prev => prev ? { ...prev, logo_url: data.publicUrl } : null);

      toast({
        title: "تم الرفع",
        description: "تم رفع الشعار بنجاح",
      });
    } catch (error) {
      console.error('Error uploading logo:', error);
      toast({
        title: "خطأ",
        description: "فشل في رفع الشعار",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>إعدادات الموقع</CardTitle>
          <CardDescription>
            إدارة اسم الموقع والشعار والإعدادات العامة
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Site Name */}
          <div className="space-y-2">
            <Label htmlFor="siteName">اسم الموقع</Label>
            <Input
              id="siteName"
              value={settings?.site_name || ''}
              onChange={(e) => setSettings(prev => 
                prev ? { ...prev, site_name: e.target.value } : null
              )}
              placeholder="أدخل اسم الموقع"
            />
          </div>

          {/* Logo Upload */}
          <div className="space-y-2">
            <Label htmlFor="logo">شعار الموقع</Label>
            {settings?.logo_url && (
              <div className="mb-4">
                <img
                  src={settings.logo_url}
                  alt="Site Logo"
                  className="h-16 w-auto object-contain border rounded"
                />
              </div>
            )}
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                disabled={uploading}
                onClick={() => document.getElementById('logoInput')?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                {uploading ? 'جاري الرفع...' : 'رفع شعار'}
              </Button>
              <input
                id="logoInput"
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSaveSettings}
              disabled={saving}
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          سيتم تطبيق التغييرات على جميع صفحات الموقع بعد الحفظ.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default AdminSiteSettings;