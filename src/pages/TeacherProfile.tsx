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
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-6">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
              <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
              English Lessons
            </h2>
            
            {/* Trial Lesson - Highlighted */}
            <div className="border border-blue-200 rounded-lg bg-blue-50 p-5 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">Trial Lesson</h3>
                    <Badge className="bg-green-100 text-green-800">
                      154 lessons completed
                    </Badge>
                  </div>
                  <p className="text-gray-600">Perfect for first-time students! Get to know each other.</p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-2xl font-bold text-blue-600">EGP 340.68</div>
                  <div className="text-sm text-gray-500 mb-2">50-min lesson</div>
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto"
                    onClick={handleBookLesson}
                  >
                    Book Trial Lesson
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Other Courses */}
            <div className="space-y-6">
              <div className="border-b pb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      English Fluency Practice
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">Real-time corrections and feedback</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">B1 - C2</Badge>
                      <Badge variant="outline" className="text-xs">Conversation</Badge>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-xl font-bold text-blue-600">EGP 292.01</div>
                    <div className="text-sm text-gray-500 mb-2">Package with 8% off</div>
                    <Button 
                      variant="outline" 
                      className="w-full md:w-auto border-blue-600 text-blue-600 hover:bg-blue-50"
                      onClick={handleBookLesson}
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="border-b pb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Advanced Speaking & Writing
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">IELTS & TOEFL preparation</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">B1 - C2</Badge>
                      <Badge variant="outline" className="text-xs">Test Preparation</Badge>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-xl font-bold text-blue-600">EGP 243.34</div>
                    <div className="text-sm text-gray-500 mb-2">Package with 15% off</div>
                    <Button 
                      variant="outline" 
                      className="w-full md:w-auto border-blue-600 text-blue-600 hover:bg-blue-50"
                      onClick={handleBookLesson}
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Business English Mastery
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">Professional communication skills</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">B1 - C2</Badge>
                      <Badge variant="outline" className="text-xs">Business</Badge>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-xl font-bold text-blue-600">EGP 243.34</div>
                    <div className="text-sm text-gray-500 mb-2">Package with 10% off</div>
                    <Button 
                      variant="outline" 
                      className="w-full md:w-auto border-blue-600 text-blue-600 hover:bg-blue-50"
                      onClick={handleBookLesson}
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
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
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-6">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
              <MessageSquare className="w-6 h-6 mr-2 text-blue-600" />
              My Creations
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-lg p-5 transition-all hover:shadow-md hover:border-blue-200">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-1">Vocabulary</h3>
                <p className="text-sm text-gray-500 mb-3">Essential words and phrases</p>
                <div className="text-xs font-medium text-blue-600">1 SET AVAILABLE</div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-5 transition-all hover:shadow-md hover:border-blue-200">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-1">Podcasts</h3>
                <p className="text-sm text-gray-500 mb-3">Listen and learn on the go</p>
                <div className="text-xs font-medium text-purple-600">56 EPISODES</div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-5 transition-all hover:shadow-md hover:border-blue-200">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-1">Quizzes</h3>
                <p className="text-sm text-gray-500 mb-3">Test your knowledge</p>
                <div className="text-xs font-medium text-green-600">124 QUIZZES</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 mb-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to improve your English?</h2>
          <p className="text-blue-100 mb-6 max-w-md mx-auto">
            Book your first lesson with {teacher.name} today and start your language journey
          </p>
          <Button 
            className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6 font-bold"
            onClick={handleBookLesson}
          >
            Book Trial Lesson - EGP 340.68
          </Button>
        </div>

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
