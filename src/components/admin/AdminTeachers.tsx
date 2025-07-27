import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Teacher {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  reviews: number;
  hourly_rate: number;
  experience: number;
  languages: string[];
  image_url: string | null;
  is_online: boolean;
  bio: string | null;
  education: string | null;
  certifications: string[] | null;
}

const AdminTeachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    hourly_rate: '',
    experience: '',
    languages: '',
    bio: '',
    education: '',
    certifications: '',
    is_online: false
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const { data, error } = await supabase
        .from('teachers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTeachers(data || []);
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في جلب المعلمين",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `teacher-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('teacher-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('teacher-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في رفع الصورة",
        variant: "destructive",
      });
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = editingTeacher?.image_url || null;

      if (imageFile) {
        imageUrl = await handleImageUpload(imageFile);
        if (!imageUrl) return;
      }

      const teacherData = {
        name: formData.name,
        specialization: formData.specialization,
        hourly_rate: parseFloat(formData.hourly_rate),
        experience: parseInt(formData.experience),
        languages: formData.languages.split(',').map(l => l.trim()),
        bio: formData.bio,
        education: formData.education,
        certifications: formData.certifications.split('\n').filter(c => c.trim()),
        is_online: formData.is_online,
        image_url: imageUrl,
        rating: editingTeacher?.rating || 0,
        reviews: editingTeacher?.reviews || 0,
      };

      if (editingTeacher) {
        const { error } = await supabase
          .from('teachers')
          .update(teacherData)
          .eq('id', editingTeacher.id);

        if (error) throw error;
        toast({ title: "تم تحديث المعلم بنجاح" });
      } else {
        const { error } = await supabase
          .from('teachers')
          .insert([teacherData]);

        if (error) throw error;
        toast({ title: "تم إضافة المعلم بنجاح" });
      }

      resetForm();
      fetchTeachers();
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في حفظ المعلم",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setFormData({
      name: teacher.name,
      specialization: teacher.specialization,
      hourly_rate: teacher.hourly_rate.toString(),
      experience: teacher.experience.toString(),
      languages: teacher.languages.join(', '),
      bio: teacher.bio || '',
      education: teacher.education || '',
      certifications: teacher.certifications?.join('\n') || '',
      is_online: teacher.is_online
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المعلم؟')) return;

    try {
      const { error } = await supabase
        .from('teachers')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "تم حذف المعلم بنجاح" });
      fetchTeachers();
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في حذف المعلم",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      specialization: '',
      hourly_rate: '',
      experience: '',
      languages: '',
      bio: '',
      education: '',
      certifications: '',
      is_online: false
    });
    setEditingTeacher(null);
    setShowForm(false);
    setImageFile(null);
  };

  if (loading && teachers.length === 0) {
    return <div className="text-center py-8">جاري التحميل...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">إدارة المعلمين</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          إضافة معلم جديد
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingTeacher ? 'تعديل المعلم' : 'إضافة معلم جديد'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">الاسم</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="specialization">التخصص</Label>
                  <Input
                    id="specialization"
                    value={formData.specialization}
                    onChange={(e) => setFormData(prev => ({ ...prev, specialization: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="hourly_rate">الأجر بالساعة (جنيه مصري)</Label>
                  <Input
                    id="hourly_rate"
                    type="number"
                    value={formData.hourly_rate}
                    onChange={(e) => setFormData(prev => ({ ...prev, hourly_rate: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="experience">سنوات الخبرة</Label>
                  <Input
                    id="experience"
                    type="number"
                    value={formData.experience}
                    onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="languages">اللغات (مفصولة بفاصلة)</Label>
                  <Input
                    id="languages"
                    value={formData.languages}
                    onChange={(e) => setFormData(prev => ({ ...prev, languages: e.target.value }))}
                    placeholder="العربية, الإنجليزية"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="education">التعليم</Label>
                  <Input
                    id="education"
                    value={formData.education}
                    onChange={(e) => setFormData(prev => ({ ...prev, education: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bio">نبذة مختصرة</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="certifications">الشهادات (سطر واحد لكل شهادة)</Label>
                <Textarea
                  id="certifications"
                  value={formData.certifications}
                  onChange={(e) => setFormData(prev => ({ ...prev, certifications: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_online"
                  checked={formData.is_online}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_online: checked }))}
                />
                <Label htmlFor="is_online">متاح أونلاين</Label>
              </div>

              <div>
                <Label htmlFor="image">صورة المعلم</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                  {editingTeacher ? 'تحديث' : 'إضافة'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  إلغاء
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((teacher) => (
          <Card key={teacher.id}>
            <CardHeader>
              {teacher.image_url && (
                <img
                  src={teacher.image_url}
                  alt={teacher.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}
              <CardTitle className="text-lg">{teacher.name}</CardTitle>
              <CardDescription>{teacher.specialization}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>الأجر:</span>
                  <span>{teacher.hourly_rate} ج.م/ساعة</span>
                </div>
                <div className="flex justify-between">
                  <span>الخبرة:</span>
                  <span>{teacher.experience} سنة</span>
                </div>
                <div className="flex justify-between">
                  <span>التقييم:</span>
                  <span>⭐ {teacher.rating}</span>
                </div>
                <div className="flex justify-between">
                  <span>الحالة:</span>
                  <Badge variant={teacher.is_online ? "default" : "secondary"}>
                    {teacher.is_online ? "متاح" : "غير متاح"}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {teacher.languages.map((lang, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(teacher)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(teacher.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminTeachers;