import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Trash2, Edit, Save, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface Admin {
  id: string;
  email: string;
  name: string | null;
  created_at: string;
}

const AdminManageAdmins = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newAdmin, setNewAdmin] = useState({ email: '', name: '', password: '' });
  const [editAdmin, setEditAdmin] = useState({ name: '', password: '' });
  const { toast } = useToast();

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const { data, error } = await supabase
        .from('admins')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAdmins(data || []);
    } catch (error) {
      console.error('Error fetching admins:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل قائمة المديرين",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddAdmin = async () => {
    if (!newAdmin.email || !newAdmin.password) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('admins')
        .insert([{
          email: newAdmin.email,
          name: newAdmin.name || null,
          password: newAdmin.password,
        }]);

      if (error) throw error;

      toast({
        title: "تم الإضافة",
        description: "تم إضافة المدير بنجاح",
      });

      setNewAdmin({ email: '', name: '', password: '' });
      setShowAddForm(false);
      fetchAdmins();
    } catch (error) {
      console.error('Error adding admin:', error);
      toast({
        title: "خطأ",
        description: "فشل في إضافة المدير",
        variant: "destructive",
      });
    }
  };

  const handleUpdateAdmin = async (id: string) => {
    try {
      const updateData: any = {};
      if (editAdmin.name) updateData.name = editAdmin.name;
      if (editAdmin.password) updateData.password = editAdmin.password;

      const { error } = await supabase
        .from('admins')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "تم التحديث",
        description: "تم تحديث بيانات المدير بنجاح",
      });

      setEditingId(null);
      setEditAdmin({ name: '', password: '' });
      fetchAdmins();
    } catch (error) {
      console.error('Error updating admin:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحديث بيانات المدير",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAdmin = async (id: string) => {
    try {
      const { error } = await supabase
        .from('admins')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "تم الحذف",
        description: "تم حذف المدير بنجاح",
      });

      fetchAdmins();
    } catch (error) {
      console.error('Error deleting admin:', error);
      toast({
        title: "خطأ",
        description: "فشل في حذف المدير",
        variant: "destructive",
      });
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
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>إدارة المديرين</CardTitle>
              <CardDescription>
                إضافة وتعديل وحذف المديرين
              </CardDescription>
            </div>
            <Button onClick={() => setShowAddForm(!showAddForm)}>
              <Plus className="w-4 h-4 mr-2" />
              إضافة مدير
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Add Admin Form */}
          {showAddForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">إضافة مدير جديد</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="newEmail">البريد الإلكتروني *</Label>
                    <Input
                      id="newEmail"
                      type="email"
                      value={newAdmin.email}
                      onChange={(e) => setNewAdmin(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="admin@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newName">الاسم</Label>
                    <Input
                      id="newName"
                      value={newAdmin.name}
                      onChange={(e) => setNewAdmin(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="اسم المدير"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">كلمة المرور *</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newAdmin.password}
                      onChange={(e) => setNewAdmin(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="كلمة المرور"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAddAdmin}>
                    <Save className="w-4 h-4 mr-2" />
                    حفظ
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>
                    <X className="w-4 h-4 mr-2" />
                    إلغاء
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Admins Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>البريد الإلكتروني</TableHead>
                <TableHead>الاسم</TableHead>
                <TableHead>تاريخ الإنشاء</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admins.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell className="font-medium">{admin.email}</TableCell>
                  <TableCell>
                    {editingId === admin.id ? (
                      <Input
                        value={editAdmin.name}
                        onChange={(e) => setEditAdmin(prev => ({ ...prev, name: e.target.value }))}
                        placeholder={admin.name || 'اسم المدير'}
                      />
                    ) : (
                      admin.name || <Badge variant="secondary">غير محدد</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(admin.created_at).toLocaleDateString('ar-EG')}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {editingId === admin.id ? (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleUpdateAdmin(admin.id)}
                          >
                            <Save className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingId(null);
                              setEditAdmin({ name: '', password: '' });
                            }}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingId(admin.id);
                              setEditAdmin({ name: admin.name || '', password: '' });
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="destructive">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
                                <AlertDialogDescription>
                                  هل أنت متأكد من حذف هذا المدير؟ لا يمكن التراجع عن هذا الإجراء.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteAdmin(admin.id)}>
                                  حذف
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {admins.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              لا توجد حسابات مديرين
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminManageAdmins;