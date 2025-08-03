import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Teacher {
  id: string;
  name: string;
  hourly_rate: number;
  rating: number;
  reviews: number;
  country: string;
  timezone: string;
}

const TeacherProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTeacher({
        id: '1',
        name: 'James Wall',
        hourly_rate: 340,
        rating: 5.0,
        reviews: 462,
        country: 'Egypt',
        timezone: 'Cairo (UTC+02:00)'
      });
      setLoading(false);
    }, 500);
  }, [id]);

  const handleBookLesson = () => {
    navigate(`/booking?teacher=${teacher?.id}&name=${teacher?.name}&rate=${teacher?.hourly_rate}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="text-center py-10">
        <p>Teacher not found</p>
        <Button onClick={() => navigate('/teachers')} className="mt-4">
          Back to Teachers
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      {/* Simplified Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-xl">👤</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold">{teacher.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span>{teacher.rating}</span>
            <span className="text-gray-500">({teacher.reviews} reviews)</span>
          </div>
        </div>
      </div>

      {/* Lessons Section */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Trial Lesson */}
            <div className="border-b pb-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">Trial Lesson</h3>
                <Badge variant="secondary">154 lessons completed</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-xl font-bold text-blue-600">EGP {teacher.hourly_rate}</div>
                <Button onClick={handleBookLesson}>
                  Book now
                </Button>
              </div>
            </div>

            {/* Regular Lesson */}
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">Standard Lesson</h3>
                <Badge variant="secondary">4,334 lessons completed</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-xl font-bold text-blue-600">EGP {teacher.hourly_rate - 50}</div>
                <Button onClick={handleBookLesson}>
                  Book now
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Availability */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Availability
          </h2>
          
          <div className="flex items-center text-green-600 mb-4">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span>Available today at 05:45 PM</span>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="font-medium p-2">{day}</div>
            ))}
          </div>

          {['08-12', '12-16', '16-20'].map(time => (
            <div key={time} className="grid grid-cols-7 gap-1 mb-1">
              <div className="text-gray-500 p-2 text-sm">{time}</div>
              {Array(7).fill(0).map((_, i) => (
                <div key={i} className={`p-2 rounded ${i > 0 ? 'bg-green-100' : 'bg-gray-100'}`}>
                  {i > 0 ? '✓' : ''}
                </div>
              ))}
            </div>
          ))}
        </CardContent>
      </Card>

      <Button 
        variant="outline" 
        onClick={() => navigate('/teachers')}
        className="w-full"
      >
        Back to Teachers
      </Button>
    </div>
  );
};

export default TeacherProfile;
