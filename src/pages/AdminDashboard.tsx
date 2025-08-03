import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Users, BookOpen, Palette, LogOut, Calendar, CreditCard, Settings, UserCog } from 'lucide-react';
import AdminCourses from '@/components/admin/AdminCourses';
import AdminTeachers from '@/components/admin/AdminTeachers';
import AdminTheme from '@/components/admin/AdminTheme';
import AdminBookings from '@/components/admin/AdminBookings';
import AdminPayments from '@/components/admin/AdminPayments';
import AdminSiteSettings from '@/components/admin/AdminSiteSettings';
import AdminManageAdmins from '@/components/admin/AdminManageAdmins';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check authentication
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin-login');
        return;
      }
      setUser(session.user);
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate('/admin-login');
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card shadow-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gradient">لوحة التحكم</h1>
            <p className="text-muted-foreground text-sm">إدارة شاملة للموقع والمحتوى</p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="hidden sm:flex items-center gap-2 bg-muted px-3 py-2 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-muted-foreground">
                مرحباً، {user.email}
              </span>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout} className="hover:bg-destructive hover:text-destructive-foreground transition-colors">
              <LogOut className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">تسجيل خروج</span>
              <span className="sm:hidden">خروج</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-7 h-auto p-1 bg-muted rounded-xl">
            <TabsTrigger value="courses" className="flex items-center gap-2 py-3 text-sm rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">الكورسات</span>
              <span className="sm:hidden">كورس</span>
            </TabsTrigger>
            <TabsTrigger value="teachers" className="flex items-center gap-2 py-3 text-sm rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">المعلمين</span>
              <span className="sm:hidden">معلم</span>
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center gap-2 py-3 text-sm rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">الحجوزات</span>
              <span className="sm:hidden">حجز</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2 py-3 text-sm rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all">
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">المدفوعات</span>
              <span className="sm:hidden">دفع</span>
            </TabsTrigger>
            <TabsTrigger value="theme" className="flex items-center gap-2 py-3 text-sm rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all">
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">التصميم</span>
              <span className="sm:hidden">لون</span>
            </TabsTrigger>
            <TabsTrigger value="site-settings" className="flex items-center gap-2 py-3 text-sm rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">إعدادات الموقع</span>
              <span className="sm:hidden">إعداد</span>
            </TabsTrigger>
            <TabsTrigger value="admins" className="flex items-center gap-2 py-3 text-sm rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all">
              <UserCog className="w-4 h-4" />
              <span className="hidden sm:inline">المديرين</span>
              <span className="sm:hidden">مدير</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="courses">
            <AdminCourses />
          </TabsContent>

          <TabsContent value="teachers">
            <AdminTeachers />
          </TabsContent>

          <TabsContent value="bookings">
            <AdminBookings />
          </TabsContent>

          <TabsContent value="payments">
            <AdminPayments />
          </TabsContent>

          <TabsContent value="theme">
            <AdminTheme />
          </TabsContent>

          <TabsContent value="site-settings">
            <AdminSiteSettings />
          </TabsContent>

          <TabsContent value="admins">
            <AdminManageAdmins />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;