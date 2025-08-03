import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Teacher {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  reviews: number;
  hourly_rate: number;
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
        title: "Error",
        description: "Failed to fetch teachers",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `teacher_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from('teacher-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('teacher-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Image upload error:', error);
      toast({
        title: "خطأ في رفع الصورة",
        description: "فشل في رفع صورة المعلم. حاول مرة أخرى.",
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
        languages: formData.languages.split(',').map(l => l.trim()),
        bio: formData.bio,
        education: formData.education,
        certifications: formData.certifications.split('\n').filter(c => c.trim()),
        is_online: formData.is_online,
        image_url: imageUrl,
        rating: editingTeacher?.rating || 0,
        reviews: editingTeacher?.reviews || 0,
        experience: 1, // Default value since we're removing experience display
      };

      if (editingTeacher) {
        const { error } = await supabase
          .from('teachers')
          .update(teacherData)
          .eq('id', editingTeacher.id);

        if (error) throw error;
        toast({ title: "Teacher updated successfully" });
      } else {
        const { error } = await supabase
          .from('teachers')
          .insert([teacherData]);

        if (error) throw error;
        toast({ title: "Teacher added successfully" });
      }

      resetForm();
      fetchTeachers();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save teacher",
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
      languages: teacher.languages.join(', '),
      bio: teacher.bio || '',
      education: teacher.education || '',
      certifications: teacher.certifications?.join('\n') || '',
      is_online: teacher.is_online
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this teacher?')) return;

    try {
      const { error } = await supabase
        .from('teachers')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Teacher deleted successfully" });
      fetchTeachers();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete teacher",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      specialization: '',
      hourly_rate: '',
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
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Teachers</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Teacher
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingTeacher ? 'Edit Teacher' : 'Add New Teacher'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="specialization">Specialization</Label>
                  <Input
                    id="specialization"
                    value={formData.specialization}
                    onChange={(e) => setFormData(prev => ({ ...prev, specialization: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="hourly_rate">Hourly Rate (EGP)</Label>
                  <Input
                    id="hourly_rate"
                    type="number"
                    value={formData.hourly_rate}
                    onChange={(e) => setFormData(prev => ({ ...prev, hourly_rate: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="languages">Languages (comma separated)</Label>
                  <Input
                    id="languages"
                    value={formData.languages}
                    onChange={(e) => setFormData(prev => ({ ...prev, languages: e.target.value }))}
                    placeholder="Arabic, English"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="education">Education</Label>
                  <Input
                    id="education"
                    value={formData.education}
                    onChange={(e) => setFormData(prev => ({ ...prev, education: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="certifications">Certifications (one per line)</Label>
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
                <Label htmlFor="is_online">Available Online</Label>
              </div>

              <div>
                <Label htmlFor="image">Teacher Photo</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                  {editingTeacher ? 'Update' : 'Add'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
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
              <div className="w-full h-48 bg-muted rounded-lg overflow-hidden">
                {teacher.image_url ? (
                  <img
                    src={teacher.image_url}
                    alt={teacher.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(teacher.name)}&background=random&color=fff&size=200`;
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <Users className="w-16 h-16" />
                  </div>
                )}
              </div>
              <CardTitle className="text-lg">{teacher.name}</CardTitle>
              <CardDescription>{teacher.specialization}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Rate:</span>
                  <span>{teacher.hourly_rate} EGP/hour</span>
                </div>
                <div className="flex justify-between">
                  <span>Rating:</span>
                  <span>⭐ {teacher.rating}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <Badge variant={teacher.is_online ? "default" : "secondary"}>
                    {teacher.is_online ? "Available" : "Unavailable"}
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