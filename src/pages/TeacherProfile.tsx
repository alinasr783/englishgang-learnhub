import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Star, MapPin, Award, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Teacher {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  reviews: number;
  hourly_rate: number;
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
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        title: "Error",
        description: "Failed to fetch teacher data",
        variant: "destructive",
      });
      navigate('/teachers');
    } finally {
      setLoading(false);
    }
  };

  const handleBookLesson = () => {
    navigate(`/booking?teacher=${teacher?.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Teacher Not Found</h2>
          <Button onClick={() => navigate('/teachers')}>
            Back to Teachers
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Teacher Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Teacher Avatar */}
            <div className="flex-shrink-0">
              {teacher.image_url ? (
                <img
                  src={teacher.image_url}
                  alt={teacher.name}
                  className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0 border-4 border-primary/10"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mx-auto md:mx-0">
                  <span className="text-4xl text-primary">👤</span>
                </div>
              )}
            </div>
            
            {/* Teacher Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{teacher.name}</h1>
                  <p className="text-xl text-muted-foreground mb-3">{teacher.specialization}</p>
                </div>
                <div className="text-center md:text-right">
                  <div className="text-3xl font-bold text-primary mb-1">${teacher.hourly_rate}</div>
                  <div className="text-sm text-muted-foreground">per lesson</div>
                </div>
              </div>
              
              {/* Stats */}
              <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-semibold">{teacher.rating}</span>
                  <span className="text-muted-foreground">({teacher.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${teacher.is_online ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  <span className={teacher.is_online ? 'text-green-600' : 'text-gray-500'}>
                    {teacher.is_online ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
              
              {/* Bio */}
              {teacher.bio && (
                <p className="text-muted-foreground leading-relaxed mb-6">{teacher.bio}</p>
              )}
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  size="lg"
                  onClick={handleBookLesson}
                  disabled={!teacher.is_online}
                  className="bg-primary hover:bg-primary/90 text-white px-8"
                >
                  Book Trial Lesson
                </Button>
                <Button variant="outline" size="lg" className="px-8">
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Education */}
            {teacher.education && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Education
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
                    Certifications
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
            
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rating:</span>
                  <span className="font-medium">⭐ {teacher.rating}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reviews:</span>
                  <span className="font-medium">{teacher.reviews}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant={teacher.is_online ? "default" : "secondary"}>
                    {teacher.is_online ? "Available" : "Unavailable"}
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
              Back to Teachers
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;