import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, ArrowRight, BookOpen, MessageSquare, Check, Calendar, Clock } from 'lucide-react';
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
  country: string | null;
  timezone: string | null;
}

const TeacherProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (id) {
      // Simulate API call
      setTimeout(() => {
        setTeacher({
          id: '1',
          name: 'James Wall',
          specialization: 'English Teacher',
          rating: 5.0,
          reviews: 462,
          hourly_rate: 340,
          image_url: null,
          is_online: true,
          bio: 'Holder of CELTA Cambridge Oxford M.A. & B.A. in TEFL with over 10 years of experience in Teaching',
          country: 'Islamic Republic of Iran',
          timezone: 'London, United Kingdom (UTC+01:00)'
        });
        setLoading(false);
      }, 800);
    }
  }, [id]);

  const handleBookLesson = () => {
    navigate(`/booking?teacher=${teacher?.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading teacher profile...</p>
        </div>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-6 bg-white rounded-xl shadow-sm max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Teacher Not Found</h2>
          <p className="text-gray-600 mb-6">The teacher profile you requested could not be found.</p>
          <Button 
            onClick={() => navigate('/teachers')}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Browse Available Teachers
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Enhanced Teacher Header */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-6">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Teacher Avatar - Improved Design */}
              <div className="flex-shrink-0 flex justify-center">
                <div className="relative">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 md:w-20 md:h-20" />
                  </div>
                  {teacher.is_online && (
                    <div className="absolute bottom-2 right-2 bg-green-500 rounded-full w-4 h-4 border-2 border-white"></div>
                  )}
                </div>
              </div>
              
              {/* Teacher Info - Enhanced Layout */}
              <div className="flex-1 text-center md:text-left">
                <div className="mb-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{teacher.name}</h1>
                      <p className="text-lg text-blue-600 font-medium mt-1">{teacher.specialization}</p>
                    </div>
                    <div className="flex flex-col items-center md:items-end">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        <span className="text-xl font-bold">{teacher.rating}</span>
                        <span className="text-gray-500 text-sm">({teacher.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{teacher.timezone}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                    <Badge className="bg-blue-100 text-blue-800 px-3 py-1">
                      COMMUNITY TUTOR
                    </Badge>
                    <Badge className="bg-green-100 text-green-800 px-3 py-1">
                      ONLINE NOW
                    </Badge>
                    <Badge className="bg-purple-100 text-purple-800 px-3 py-1">
                      TEFL CERTIFIED
                    </Badge>
                  </div>
                </div>
                
                {/* Bio */}
                <div className="bg-blue-50 rounded-lg p-4 mt-4">
                  <p className="text-gray-700">{teacher.bio}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats Bar */}
          <div className="bg-gray-100 border-t py-4 px-6">
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-xl font-bold text-gray-900">5.0</div>
                <div className="text-xs text-gray-500">Rating</div>
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">462</div>
                <div className="text-xs text-gray-500">Students</div>
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">3096</div>
                <div className="text-xs text-gray-500">Lessons</div>
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">99%</div>
                <div className="text-xs text-gray-500">Attendance</div>
              </div>
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

        {/* Availability Section - Improved */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-6">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-blue-600" />
              Availability
            </h2>
            
            <div className="flex items-center text-green-600 mb-6 p-3 bg-green-50 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="font-medium">Available today at 05:45 PM</span>
            </div>
            
            {/* Weekly Calendar */}
            <div className="overflow-x-auto">
              <div className="grid grid-cols-8 gap-1 mb-2 text-center text-sm font-medium">
                <div className="p-2"></div>
                <div className="p-2 bg-blue-50 text-blue-800 rounded-t">Sun<br/><span className="text-lg">3</span></div>
                <div className="p-2">Mon<br/><span className="text-lg">4</span></div>
                <div className="p-2">Tue<br/><span className="text-lg">5</span></div>
                <div className="p-2">Wed<br/><span className="text-lg">6</span></div>
                <div className="p-2">Thu<br/><span className="text-lg">7</span></div>
                <div className="p-2">Fri<br/><span className="text-lg">8</span></div>
                <div className="p-2">Sat<br/><span className="text-lg">9</span></div>
              </div>
              
              {['00-04', '04-08', '08-12', '12-16', '16-20', '20-00'].map((timeSlot, index) => (
                <div key={timeSlot} className="grid grid-cols-8 gap-1 mb-1 text-sm">
                  <div className="text-gray-500 p-2 text-xs flex items-center justify-end">
                    {timeSlot}
                  </div>
                  {Array.from({length: 7}, (_, dayIndex) => {
                    const isAvailable = (index >= 2 && index <= 4) && dayIndex !== 0;
                    const isToday = dayIndex === 0 && index === 4;
                    return (
                      <div 
                        key={`${index}-${dayIndex}`}
                        className={`p-2 flex items-center justify-center rounded ${
                          isToday ? 'bg-blue-600 text-white' : 
                          isAvailable ? 'bg-green-100' : 'bg-gray-100'
                        }`}
                      >
                        {isToday ? <Check className="h-4 w-4" /> : 
                         isAvailable ? '✓' : ''}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap justify-between items-center mt-6 pt-4 border-t">
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-100 rounded mr-2"></div>
                  <span className="text-sm text-gray-600">Available</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-100 rounded mr-2"></div>
                  <span className="text-sm text-gray-600">Not available</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2 md:mt-0">
                Based on your timezone (UTC+03:00)
              </p>
            </div>
          </div>
        </div>

        {/* My Creations Section */}
        
        {/* Back Button */}
        <div className="text-center mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/teachers')}
            className="px-8 py-6 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <ArrowRight className="w-5 h-5 mr-2 transform rotate-180" />
            Browse All Teachers
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
