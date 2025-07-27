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
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary/10 to-background py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Teacher Info */}
            <div className="lg:col-span-2">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  {teacher.image_url ? (
                    <img
                      src={teacher.image_url}
                      alt={teacher.name}
                      className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-lg object-cover mx-auto sm:mx-0"
                    />
                  ) : (
                    <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-muted rounded-lg flex items-center justify-center mx-auto sm:mx-0">
                      <span className="text-2xl sm:text-3xl lg:text-4xl text-muted-foreground">👤</span>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                  <h1 className="text-2xl sm:text-3xl font-bold mb-2">{teacher.name}</h1>
                  <p className="text-lg sm:text-xl text-muted-foreground mb-3 sm:mb-4">{teacher.specialization}</p>
                  
                  <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="font-medium">{teacher.rating}</span>
                      <span className="text-muted-foreground">({teacher.reviews} reviews)</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <MapPin className="w-5 h-5 text-secondary" />
                      <Badge variant={teacher.is_online ? "default" : "secondary"}>
                        {teacher.is_online ? "Available Online" : "Unavailable"}
                      </Badge>
                    </div>
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
                  <CardTitle className="text-center">Book Your Lesson</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">
                      {teacher.hourly_rate} EGP
                    </div>
                    <div className="text-muted-foreground">per hour</div>
                  </div>
                  
                  <Separator />
                  
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleBookLesson}
                    disabled={!teacher.is_online}
                  >
                    {teacher.is_online ? 'Book Trial Lesson' : 'Currently Unavailable'}
                  </Button>
                  
                  <div className="text-xs text-center text-muted-foreground">
                    Free 30-minute trial lesson
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      {/* Details Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
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