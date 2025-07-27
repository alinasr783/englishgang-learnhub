import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Star, MapPin, Clock, Award, Languages, ArrowRight } from 'lucide-react';
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

const TeacherProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchTeacher(id);
    }
  }, [id]);

  const fetchTeacher = async (teacherId: string) => {
    try {
      const { data, error } = await supabase
        .from('teachers')
        .select('*')
        .eq('id', teacherId)
        .single();

      if (error) throw error;
      setTeacher(data);
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في جلب بيانات المعلم",
        variant: "destructive",
      });
      navigate('/teachers');
    } finally {
      setLoading(false);
    }
  };

  const handleBookLesson = () => {
    toast({
      title: "سيتم إضافة نظام الحجز قريباً",
      description: "نعمل على تطوير نظام حجز الدروس",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">المعلم غير موجود</h2>
          <Button onClick={() => navigate('/teachers')}>
            العودة إلى قائمة المعلمين
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary/10 to-background py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Teacher Info */}
            <div className="lg:col-span-2">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  {teacher.image_url ? (
                    <img
                      src={teacher.image_url}
                      alt={teacher.name}
                      className="w-48 h-48 rounded-lg object-cover mx-auto md:mx-0"
                    />
                  ) : (
                    <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center mx-auto md:mx-0">
                      <span className="text-4xl text-muted-foreground">👤</span>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 text-center md:text-right">
                  <h1 className="text-3xl font-bold mb-2">{teacher.name}</h1>
                  <p className="text-xl text-muted-foreground mb-4">{teacher.specialization}</p>
                  
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="font-medium">{teacher.rating}</span>
                      <span className="text-muted-foreground">({teacher.reviews} تقييم)</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Clock className="w-5 h-5 text-primary" />
                      <span>{teacher.experience} سنة خبرة</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <MapPin className="w-5 h-5 text-secondary" />
                      <Badge variant={teacher.is_online ? "default" : "secondary"}>
                        {teacher.is_online ? "متاح أونلاين" : "غير متاح"}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                    {teacher.languages.map((language, index) => (
                      <Badge key={index} variant="outline">
                        {language}
                      </Badge>
                    ))}
                  </div>
                  
                  {teacher.bio && (
                    <p className="text-muted-foreground leading-relaxed">{teacher.bio}</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Booking Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-center">احجز درسك الآن</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">
                      {teacher.hourly_rate} ج.م
                    </div>
                    <div className="text-muted-foreground">لكل ساعة</div>
                  </div>
                  
                  <Separator />
                  
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleBookLesson}
                    disabled={!teacher.is_online}
                  >
                    {teacher.is_online ? 'احجز درس تجريبي' : 'غير متاح حالياً'}
                  </Button>
                  
                  <div className="text-xs text-center text-muted-foreground">
                    درس تجريبي مجاني لمدة 30 دقيقة
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      {/* Details Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Education */}
            {teacher.education && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    التعليم
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{teacher.education}</p>
                </CardContent>
              </Card>
            )}
            
            {/* Certifications */}
            {teacher.certifications && teacher.certifications.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    الشهادات والمؤهلات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {teacher.certifications.map((cert, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
            
            {/* Languages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Languages className="w-5 h-5" />
                  اللغات المتاحة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {teacher.languages.map((language, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {language}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>معلومات سريعة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">سنوات الخبرة:</span>
                  <span className="font-medium">{teacher.experience} سنة</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">التقييم:</span>
                  <span className="font-medium">⭐ {teacher.rating}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">عدد التقييمات:</span>
                  <span className="font-medium">{teacher.reviews}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">الحالة:</span>
                  <Badge variant={teacher.is_online ? "default" : "secondary"}>
                    {teacher.is_online ? "متاح" : "غير متاح"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => navigate('/teachers')}
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              العودة إلى قائمة المعلمين
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;