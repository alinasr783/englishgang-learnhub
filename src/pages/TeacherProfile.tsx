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
                  <p className="text-sm text-muted-foreground mb-3">Teacher since Aug 24, 2019</p>
                </div>
                <div className="text-center md:text-right">
                  <div className="text-3xl font-bold text-destructive mb-1">EGP {teacher.hourly_rate}+</div>
                  <div className="text-sm text-muted-foreground">Package with 10% off</div>
                </div>
              </div>
              
              {/* Bio */}
              {teacher.bio && (
                <p className="text-muted-foreground leading-relaxed mb-6">{teacher.bio}</p>
              )}
            </div>
          </div>
        </div>

        {/* Teacher Statistics */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="flex items-center justify-center gap-1 mb-2">
                <Star className="w-6 h-6 text-yellow-500 fill-current" />
                <span className="text-2xl font-bold">{teacher.rating}</span>
              </div>
              <p className="text-sm text-muted-foreground">Rating</p>
            </div>
            <div>
              <div className="text-2xl font-bold mb-2">670</div>
              <p className="text-sm text-muted-foreground">Students</p>
            </div>
            <div>
              <div className="text-2xl font-bold mb-2">5444</div>
              <p className="text-sm text-muted-foreground">Lessons</p>
            </div>
            <div>
              <div className="text-2xl font-bold mb-2">100%</div>
              <p className="text-sm text-muted-foreground">Attendance rate</p>
            </div>
          </div>
        </div>

        {/* English Lessons Section */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <h2 className="text-2xl font-bold mb-6">English Lessons</h2>
          
          {/* Trial Lesson */}
          <div className="border-b pb-6 mb-6">
            <h3 className="text-xl font-semibold mb-2">Trial Lesson</h3>
            <p className="text-muted-foreground mb-3">154 lessons completed</p>
            <div className="text-2xl font-bold text-destructive mb-4">EGP 340.68+</div>
            <Button 
              className="w-full bg-destructive hover:bg-destructive/90 text-white"
              onClick={handleBookLesson}
            >
              Book now
            </Button>
          </div>

          {/* Course Listings */}
          <div className="space-y-6">
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold mb-2">
                English Fluency Practice (Real-Time Corrections and Feedback all the time)
              </h3>
              <p className="text-sm text-muted-foreground mb-2">B1 - C2 | Conversation</p>
              <p className="text-sm text-muted-foreground mb-3">4,334 lessons completed</p>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xl font-bold text-destructive">EGP 292.01+</span>
                <span className="text-sm text-muted-foreground">Package with 8% off</span>
              </div>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleBookLesson}
              >
                Book now
              </Button>
            </div>

            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold mb-2">
                Advanced & Upper Advanced Speaking & Writing (IELTS & TOEFL)
              </h3>
              <p className="text-sm text-muted-foreground mb-2">B1 - C2 | Language Essentials</p>
              <p className="text-sm text-muted-foreground mb-3">549 lessons completed</p>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xl font-bold text-destructive">EGP 243.34+</span>
                <span className="text-sm text-muted-foreground">Package with 15% off</span>
              </div>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleBookLesson}
              >
                Book now
              </Button>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">
                Mastering Business English: Professional Communication for Success
              </h3>
              <p className="text-sm text-muted-foreground mb-2">B1 - C2 | Language Essentials</p>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xl font-bold text-destructive">EGP 243.34+</span>
                <span className="text-sm text-muted-foreground">Package with 10% off</span>
              </div>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleBookLesson}
              >
                Book now
              </Button>
            </div>
          </div>
        </div>

        {/* Availability Section */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Availability</h2>
          <p className="text-muted-foreground mb-6">Available 05:45 PM Today</p>
          
          {/* Weekly Calendar */}
          <div className="overflow-x-auto">
            <div className="grid grid-cols-8 gap-1 mb-4 text-center text-sm">
              <div></div>
              <div className="font-medium">Sun<br/>3</div>
              <div className="font-medium">Mon<br/>4</div>
              <div className="font-medium">Tue<br/>5</div>
              <div className="font-medium">Wed<br/>6</div>
              <div className="font-medium">Thu<br/>7</div>
              <div className="font-medium">Fri<br/>8</div>
              <div className="font-medium">Sat<br/>9</div>
            </div>
            
            <div className="grid grid-cols-8 gap-1 text-sm">
              {/* Time slots */}
              {['00 - 04 AM', '04 - 08 AM', '08 - 12 AM', '12 - 04 PM', '04 - 08 PM', '08 - 00 PM'].map((timeSlot, index) => (
                <React.Fragment key={timeSlot}>
                  <div className="text-muted-foreground py-2">{timeSlot}</div>
                  {Array.from({length: 7}, (_, dayIndex) => (
                    <div 
                      key={`${index}-${dayIndex}`}
                      className={`h-8 border border-gray-200 ${
                        (index >= 2 && index <= 4) ? 'bg-green-500' : 
                        (index === 4 && dayIndex === 2) ? 'bg-gray-100' : 'bg-gray-100'
                      }`}
                    />
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
          
          <p className="text-center text-muted-foreground text-sm mt-4">
            Based on your timezone (UTC+03:00)
          </p>
        </div>

        {/* My Creations Section */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <h2 className="text-2xl font-bold mb-6">My Creations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="font-semibold mb-1">Vocabulary (1)</h3>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎧</span>
              </div>
              <h3 className="font-semibold mb-1">Podcast (56)</h3>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="font-semibold mb-1">Quiz (124)</h3>
            </div>
          </div>
        </div>

        {/* Education & Certifications */}
        {(teacher.education || (teacher.certifications && teacher.certifications.length > 0)) && (
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
            <h2 className="text-2xl font-bold mb-6">About Me</h2>
            
            {teacher.education && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Education
                </h3>
                <p className="text-muted-foreground">{teacher.education}</p>
              </div>
            )}
            
            {teacher.certifications && teacher.certifications.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Certifications
                </h3>
                <ul className="space-y-2">
                  {teacher.certifications.map((cert, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Back Button */}
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={() => navigate('/teachers')}
            className="px-8"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            Back to Teachers
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;