import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Star, MapPin, Award, ArrowRight, Globe, BookOpen, MessageSquare, Check, X } from 'lucide-react';
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
  languages: string[] | null;
  specialties: string[] | null;
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
      fetchTeacher(id);
    }
  }, [id]);

  const fetchTeacher = async (teacherId: string) => {
    try {
      // Simulating API call with mock data
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
          education: 'M.A. & B.A. in TEFL',
          certifications: ['CELTA Cambridge Oxford', 'TEFL Certification'],
          languages: ['English (Native)', 'Persian (Farsi)'],
          specialties: ['Business', 'Test Preparation'],
          country: 'Islamic Republic of Iran',
          timezone: 'London, United Kingdom (UTC+01:00)'
        });
        setLoading(false);
      }, 800);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch teacher data",
        variant: "destructive",
      });
      navigate('/teachers');
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
        {/* Teacher Profile Header - Redesigned */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Teacher Avatar - Improved for mobile */}
            <div className="flex-shrink-0 flex flex-col items-center sm:items-start">
              <div className="relative">
                {teacher.image_url ? (
                  <img
                    src={teacher.image_url}
                    alt={teacher.name}
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-primary/10"
                  />
                ) : (
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-4xl text-gray-400">👤</span>
                  </div>
                )}
                <div className="absolute bottom-2 right-2 bg-green-500 rounded-full w-4 h-4 border-2 border-white"></div>
              </div>
              
              <div className="mt-4 flex flex-col items-center sm:items-start">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-bold">{teacher.rating}</span>
                  <span className="text-gray-500">({teacher.reviews} reviews)</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{teacher.timezone}</span>
                </div>
              </div>
            </div>
            
            {/* Teacher Info - Redesigned for better mobile layout */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="mb-4 md:mb-0">
                  <h1 className="text-2xl sm:text-3xl font-bold mb-1">{teacher.name}</h1>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      COMMUNITY TUTOR
                    </Badge>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      ONLINE
                    </Badge>
                  </div>
                  <p className="text-lg text-gray-600 mb-3">{teacher.specialization}</p>
                  <p className="text-sm text-gray-500">Italki teacher since Aug 24, 2019</p>
                </div>
                <div className="text-center md:text-right">
                  <div className="text-2xl font-bold text-red-600 mb-1">EGP {teacher.hourly_rate}</div>
                  <div className="text-sm text-gray-500 mb-2">50-min lesson</div>
                  <Button 
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={handleBookLesson}
                  >
                    Book trial lesson
                  </Button>
                </div>
              </div>
              
              {/* Bio */}
              <div className="bg-gray-50 rounded-lg p-4 mt-4">
                <p className="text-gray-700">{teacher.bio}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Languages Section */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Globe className="w-5 h-5 mr-2 text-blue-600" />
            Languages
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Teaches</h3>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-blue-100 text-blue-800 px-3 py-1">English</Badge>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Speaks</h3>
              <div className="flex flex-wrap gap-2">
                {teacher.languages?.map((lang, index) => (
                  <Badge 
                    key={index} 
                    className={`${index === 0 ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'} px-3 py-1`}
                  >
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Specialties Section */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Award className="w-5 h-5 mr-2 text-orange-600" />
            Specialties
          </h2>
          
          <div className="flex flex-wrap gap-2">
            {teacher.specialties?.map((specialty, index) => (
              <Badge key={index} className="bg-orange-100 text-orange-800 px-3 py-1">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>

        {/* Important Note Section */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold mb-3 text-yellow-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Important Note
          </h2>
          <p className="text-yellow-700">
            Please note that I will be on vacation from 20th to 30th of August. Lessons during this period will be rescheduled.
          </p>
        </div>

        {/* English Lessons Section */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <h2 className="text-2xl font-bold mb-6">English Lessons</h2>
          
          {/* Trial Lesson */}
          <div className="border-b pb-6 mb-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold">Trial Lesson</h3>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                154 lessons completed
              </Badge>
            </div>
            <p className="text-gray-600 mb-4">Perfect for first-time students! Get to know each other and discuss your learning needs.</p>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold text-red-600">EGP 340.68</div>
              <Button 
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={handleBookLesson}
              >
                Book now
              </Button>
            </div>
          </div>

          {/* Course Listings */}
          <div className="space-y-6">
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold mb-2">
                English Fluency Practice
              </h3>
              <p className="text-sm text-gray-600 mb-3">Real-Time Corrections and Feedback all the time</p>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="outline">B1 - C2</Badge>
                <Badge variant="outline">Conversation</Badge>
              </div>
              <p className="text-sm text-gray-500 mb-3">4,334 lessons completed</p>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xl font-bold text-red-600">EGP 292.01</span>
                  <span className="text-sm text-gray-500 ml-2">Package with 8% off</span>
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleBookLesson}
                >
                  Book now
                </Button>
              </div>
            </div>

            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold mb-2">
                Advanced & Upper Advanced Speaking & Writing
              </h3>
              <p className="text-sm text-gray-600 mb-3">IELTS & TOEFL preparation</p>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="outline">B1 - C2</Badge>
                <Badge variant="outline">Language Essentials</Badge>
              </div>
              <p className="text-sm text-gray-500 mb-3">549 lessons completed</p>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xl font-bold text-red-600">EGP 243.34</span>
                  <span className="text-sm text-gray-500 ml-2">Package with 15% off</span>
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleBookLesson}
                >
                  Book now
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">
                Mastering Business English
              </h3>
              <p className="text-sm text-gray-600 mb-3">Professional Communication for Success</p>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="outline">B1 - C2</Badge>
                <Badge variant="outline">Language Essentials</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xl font-bold text-red-600">EGP 243.34</span>
                  <span className="text-sm text-gray-500 ml-2">Package with 10% off</span>
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleBookLesson}
                >
                  Book now
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Availability Section */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Availability</h2>
          <div className="flex items-center text-green-600 mb-4">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span>Available today at 05:45 PM</span>
          </div>
          
          {/* Weekly Calendar - Improved */}
          <div className="overflow-x-auto">
            <div className="grid grid-cols-8 gap-1 mb-2 text-center text-sm">
              <div className="font-medium p-2"></div>
              <div className="font-medium p-2 bg-gray-100 rounded-t">Sun<br/><span className="text-lg">3</span></div>
              <div className="font-medium p-2">Mon<br/><span className="text-lg">4</span></div>
              <div className="font-medium p-2">Tue<br/><span className="text-lg">5</span></div>
              <div className="font-medium p-2">Wed<br/><span className="text-lg">6</span></div>
              <div className="font-medium p-2">Thu<br/><span className="text-lg">7</span></div>
              <div className="font-medium p-2">Fri<br/><span className="text-lg">8</span></div>
              <div className="font-medium p-2">Sat<br/><span className="text-lg">9</span></div>
            </div>
            
            {['00-04', '04-08', '08-12', '12-16', '16-20', '20-00'].map((timeSlot, index) => (
              <div key={timeSlot} className="grid grid-cols-8 gap-1 mb-1 text-sm">
                <div className="text-gray-500 p-2 text-xs flex items-center justify-end">{timeSlot}</div>
                {Array.from({length: 7}, (_, dayIndex) => {
                  const isAvailable = (index >= 2 && index <= 4) && dayIndex !== 0;
                  const isToday = dayIndex === 0 && index === 4;
                  return (
                    <div 
                      key={`${index}-${dayIndex}`}
                      className={`p-2 flex items-center justify-center rounded ${
                        isToday ? 'bg-green-500 text-white' : 
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
          
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center text-sm text-gray-500">
              <div className="flex items-center mr-4">
                <div className="w-4 h-4 bg-green-100 rounded mr-1"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-100 rounded mr-1"></div>
                <span>Not available</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 text-right">
              Based on your timezone (UTC+03:00)
            </p>
          </div>
        </div>

        {/* My Creations Section */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <h2 className="text-2xl font-bold mb-6">My Creations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-3">
                <BookOpen className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="font-semibold mb-1">Vocabulary (1)</h3>
              <p className="text-sm text-gray-500">Essential words and phrases</p>
            </div>
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1">Podcast (56)</h3>
              <p className="text-sm text-gray-500">Listen and learn on the go</p>
            </div>
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-1">Quiz (124)</h3>
              <p className="text-sm text-gray-500">Test your knowledge</p>
            </div>
          </div>
        </div>

        {/* About Me Section */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <h2 className="text-2xl font-bold mb-6">About Me</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Award className="w-5 h-5 mr-2 text-blue-600" />
                Education
              </h3>
              <p className="text-gray-700">{teacher.education}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Award className="w-5 h-5 mr-2 text-blue-600" />
                Certifications
              </h3>
              <ul className="space-y-2">
                {teacher.certifications?.map((cert, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Additional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex">
                <span className="font-medium w-32">From:</span>
                <span className="text-gray-700">{teacher.country}</span>
              </div>
              <div className="flex">
                <span className="font-medium w-32">Living in:</span>
                <span className="text-gray-700">London, United Kingdom</span>
              </div>
              <div className="flex">
                <span className="font-medium w-32">Interests:</span>
                <span className="text-gray-700">Business & Finance, Technology</span>
              </div>
              <div className="flex">
                <span className="font-medium w-32">Teaching style:</span>
                <span className="text-gray-700">Communicative, Task-based</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={() => navigate('/teachers')}
            className="px-8 border-gray-300"
          >
            <ArrowRight className="w-4 h-4 mr-2 transform rotate-180" />
            Back to Teachers
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
