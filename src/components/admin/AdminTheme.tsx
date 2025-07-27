import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ThemeSettings {
  id?: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
}

const AdminTheme = () => {
  const [loading, setLoading] = useState(false);
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>({
    primary_color: '#3B82F6',
    secondary_color: '#10B981',
    accent_color: '#F59E0B'
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchThemeSettings();
  }, []);

  const fetchThemeSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('theme_settings')
        .select('*')
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setThemeSettings(data);
        applyTheme(data);
      }
    } catch (error) {
      console.error('Error fetching theme settings:', error);
    }
  };

  const applyTheme = (settings: ThemeSettings) => {
    const root = document.documentElement;
    
    // Convert hex to HSL
    const hexToHsl = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0, s = 0, l = (max + min) / 2;

      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }

      return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
    };

    root.style.setProperty('--primary', hexToHsl(settings.primary_color));
    root.style.setProperty('--secondary', hexToHsl(settings.secondary_color));
    root.style.setProperty('--accent', hexToHsl(settings.accent_color));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let result;
      
      if (themeSettings.id) {
        result = await supabase
          .from('theme_settings')
          .update({
            primary_color: themeSettings.primary_color,
            secondary_color: themeSettings.secondary_color,
            accent_color: themeSettings.accent_color
          })
          .eq('id', themeSettings.id);
      } else {
        result = await supabase
          .from('theme_settings')
          .insert([{
            primary_color: themeSettings.primary_color,
            secondary_color: themeSettings.secondary_color,
            accent_color: themeSettings.accent_color
          }]);
      }

      if (result.error) throw result.error;

      applyTheme(themeSettings);
      
      toast({
        title: "تم حفظ إعدادات الثيم بنجاح",
        description: "تم تطبيق الألوان الجديدة على الموقع",
      });

      fetchThemeSettings();
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في حفظ إعدادات الثيم",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetToDefault = () => {
    const defaultTheme = {
      primary_color: '#3B82F6',
      secondary_color: '#10B981',
      accent_color: '#F59E0B'
    };
    setThemeSettings(prev => ({ ...prev, ...defaultTheme }));
    applyTheme(defaultTheme);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">إعدادات الثيم</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>ألوان الموقع</CardTitle>
          <CardDescription>قم بتخصيص الألوان الرئيسية للموقع</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="primary">اللون الأساسي</Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="primary"
                    type="color"
                    value={themeSettings.primary_color}
                    onChange={(e) => setThemeSettings(prev => ({ ...prev, primary_color: e.target.value }))}
                    className="w-16 h-10 p-1 border rounded"
                  />
                  <Input
                    type="text"
                    value={themeSettings.primary_color}
                    onChange={(e) => setThemeSettings(prev => ({ ...prev, primary_color: e.target.value }))}
                    placeholder="#3B82F6"
                    className="flex-1"
                  />
                </div>
                <div 
                  className="w-full h-10 rounded border" 
                  style={{ backgroundColor: themeSettings.primary_color }}
                ></div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="secondary">اللون الثانوي</Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="secondary"
                    type="color"
                    value={themeSettings.secondary_color}
                    onChange={(e) => setThemeSettings(prev => ({ ...prev, secondary_color: e.target.value }))}
                    className="w-16 h-10 p-1 border rounded"
                  />
                  <Input
                    type="text"
                    value={themeSettings.secondary_color}
                    onChange={(e) => setThemeSettings(prev => ({ ...prev, secondary_color: e.target.value }))}
                    placeholder="#10B981"
                    className="flex-1"
                  />
                </div>
                <div 
                  className="w-full h-10 rounded border" 
                  style={{ backgroundColor: themeSettings.secondary_color }}
                ></div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accent">لون التركيز</Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="accent"
                    type="color"
                    value={themeSettings.accent_color}
                    onChange={(e) => setThemeSettings(prev => ({ ...prev, accent_color: e.target.value }))}
                    className="w-16 h-10 p-1 border rounded"
                  />
                  <Input
                    type="text"
                    value={themeSettings.accent_color}
                    onChange={(e) => setThemeSettings(prev => ({ ...prev, accent_color: e.target.value }))}
                    placeholder="#F59E0B"
                    className="flex-1"
                  />
                </div>
                <div 
                  className="w-full h-10 rounded border" 
                  style={{ backgroundColor: themeSettings.accent_color }}
                ></div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="submit" disabled={loading}>
                {loading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
              </Button>
              <Button type="button" variant="outline" onClick={resetToDefault}>
                إعادة تعيين للافتراضي
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>معاينة الألوان</CardTitle>
          <CardDescription>شاهد كيف ستبدو الألوان في العناصر المختلفة</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button style={{ backgroundColor: themeSettings.primary_color, color: 'white' }}>
              زر بالّلون الأساسي
            </Button>
            <Button style={{ backgroundColor: themeSettings.secondary_color, color: 'white' }}>
              زر بالّلون الثانوي
            </Button>
            <Button style={{ backgroundColor: themeSettings.accent_color, color: 'white' }}>
              زر بلون التركيز
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTheme;