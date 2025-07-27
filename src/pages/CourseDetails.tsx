import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Star, Clock, Users, Award, CheckCircle, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  students: number;
  rating: number;
  price: number;
  instructor: string;
  image_url: string | null;
  category: string;
  features: string[];
  content_outline?: string[] | null;
  prerequisites?: string[] | null;
}

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchCourse(id);
    }
  }, [id]);

  const fetchCourse = async (courseId: string) => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single();

      if (error) throw error;
      setCourse(data);
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في جلب بيانات الكورس",
        variant: "destructive",
      });
      navigate('/courses');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    toast({
      title: "سيتم إضافة نظام التسجيل قريباً",
      description: "نعمل على تطوير نظام التسجيل في الكورسات",
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

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">الكورس غير موجود</h2>
          <Button onClick={() => navigate('/courses')}>
            العودة إلى قائمة الكورسات
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
            {/* Course Info */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {course.image_url && (
                  <img
                    src={course.image_url}
                    alt={course.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                )}
                
                <div>
                  <Badge variant="secondary" className="mb-2">{course.category}</Badge>
                  <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
                  <p className="text-lg text-muted-foreground mb-6">{course.description}</p>
                  
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="font-medium">{course.rating}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Users className="w-5 h-5 text-primary" />
                      <span>{course.students} طالب</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Clock className="w-5 h-5 text-secondary" />
                      <span>{course.duration}</span>
                    </div>
                    
                    <Badge variant="outline">{course.level}</Badge>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    <span className="font-medium">المدرس: {course.instructor}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Registration Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-center">سجل في الكورس</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">
                      {course.price} ج.م
                    </div>
                    <div className="text-muted-foreground">السعر الكامل</div>
                  </div>
                  
                  <Separator />
                  
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleRegister}
                  >
                    سجل الآن
                  </Button>
                  
                  <div className="text-xs text-center text-muted-foreground">
                    ضمان استرداد المال خلال 30 يوم
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
            {/* What you'll learn */}
            {course.features && course.features.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>ما ستتعلمه في هذا الكورس</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {course.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
            
            {/* Course Content */}
            {course.content_outline && course.content_outline.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>محتوى الكورس</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {course.content_outline.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">
                          {index + 1}
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
            
            {/* Prerequisites */}
            {course.prerequisites && course.prerequisites.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>المتطلبات المسبقة</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {course.prerequisites.map((prerequisite, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span>{prerequisite}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>تفاصيل الكورس</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">المستوى:</span>
                  <Badge variant="outline">{course.level}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">المدة:</span>
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">عدد الطلاب:</span>
                  <span className="font-medium">{course.students}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">التقييم:</span>
                  <span className="font-medium">⭐ {course.rating}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">الفئة:</span>
                  <span className="font-medium">{course.category}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>المدرس</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">👨‍🏫</span>
                  </div>
                  <h3 className="font-medium">{course.instructor}</h3>
                  <p className="text-sm text-muted-foreground">مدرس متخصص</p>
                </div>
              </CardContent>
            </Card>
            
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => navigate('/courses')}
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              العودة إلى قائمة الكورسات
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;