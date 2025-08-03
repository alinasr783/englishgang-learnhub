import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Clock, User, BookOpen, ArrowRight, Star, MapPin, Check } from 'lucide-react';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import teacherSarah from "@/assets/teacher-sarah.jpg";

interface Teacher {
  id: string;
  name: string;
  specialization: string;
  hourly_rate: number;
  image_url: string | null;
  rating: number;
  reviews: number;
  lessons: number;
  country: string;
  timezone: string;
}

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', 
  '13:00', '14:00', '15:00', '16:00', 
  '17:00', '18:00', '19:00', '20:00'
];

const Booking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [lessonNotes, setLessonNotes] = useState("");
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchPaymentMethods = async () => {
    try {
      const { data, error } = await supabase
        .from('payment_methods')
        .select('*')
        .eq('is_active', true)
        .order('name');
      
      if (error) throw error;
      setPaymentMethods(data || []);
    } catch (error) {
      console.error('Error fetching payment methods:', error);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchTeachers();
    fetchPaymentMethods();
    
    const teacherId = searchParams.get('teacher');
    if (teacherId) {
      fetchTeachers().then(() => {
        const teacher = teachers.find(t => t.id === teacherId);
        if (teacher) setSelectedTeacher(teacher);
      });
    }
  }, [searchParams]);

  const fetchTeachers = async () => {
    try {
      const { data, error } = await supabase
        .from('teachers')
        .select('id, name, specialization, hourly_rate, image_url, rating, reviews, lessons, country, timezone')
        .eq('is_online', true)
        .order('rating', { ascending: false });

      if (error) throw error;

      const formattedTeachers = (data || []).map(teacher => ({
        id: teacher.id,
        name: teacher.name,
        specialization: teacher.specialization,
        hourly_rate: teacher.hourly_rate,
        image_url: teacher.image_url,
        rating: teacher.rating || 5.0,
        reviews: teacher.reviews || 462,
        lessons: teacher.lessons || 3096,
        country: teacher.country || "Egypt",
        timezone: teacher.timezone || "Cairo, Egypt (UTC+02:00)"
      }));

      setTeachers(formattedTeachers);
      
      const teacherId = searchParams.get('teacher');
      if (teacherId) {
        const teacher = formattedTeachers.find(t => t.id === teacherId);
        if (teacher) setSelectedTeacher(teacher);
      }
    } catch (error) {
      console.error('Error fetching teachers:', error);
      const fallbackTeachers = [
        {
          id: "1",
          name: "سارة أحمد",
          specialization: "محادثة وقواعد",
          hourly_rate: 150,
          image_url: teacherSarah,
          rating: 5.0,
          reviews: 462,
          lessons: 3096,
          country: "Egypt",
          timezone: "Cairo, Egypt (UTC+02:00)"
        }
      ];
      setTeachers(fallbackTeachers);
      if (searchParams.get('teacher') === "1") {
        setSelectedTeacher(fallbackTeachers[0]);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedTeacher || !selectedDate || !selectedTime || !studentName || !studentEmail) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate booking process
      setTimeout(() => {
        toast({
          title: "Booking Successful! 🎉",
          description: `Your lesson with ${selectedTeacher.name} has been booked for ${format(selectedDate, 'dd/MM/yyyy')} at ${selectedTime}`,
        });

        // Reset form
        setSelectedDate(undefined);
        setSelectedTime("");
        setStudentName("");
        setStudentEmail("");
        setStudentPhone("");
        setLessonNotes("");
        
        // Redirect to success page or teacher profile
        setTimeout(() => {
          navigate(`/teachers/${selectedTeacher.id}`);
        }, 2000);
      }, 1500);
      
    } catch (error) {
      toast({
        title: "Booking Error",
        description: "An error occurred while trying to book. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simplified Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Book Your English Lesson
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Select your preferred teacher, date, and time to start your language journey
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg py-5">
                <CardTitle className="flex items-center gap-3 text-blue-800">
                  <BookOpen className="w-6 h-6" />
                  <span>Booking Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Teacher Selection - Enhanced */}
                  <div className="space-y-3">
                    <Label htmlFor="teacher" className="text-gray-700 font-medium">Choose Teacher</Label>
                    <Select 
                      value={selectedTeacher?.id || ""} 
                      onValueChange={(value) => {
                        const teacher = teachers.find(t => t.id === value);
                        setSelectedTeacher(teacher || null);
                      }}
                    >
                      <SelectTrigger className="h-12 bg-white border-gray-300">
                        <SelectValue placeholder="Select a teacher..." />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        {teachers.map((teacher) => (
                          <SelectItem key={teacher.id} value={teacher.id}>
                            <div className="flex items-center gap-3 py-2">
                              <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-dashed flex-shrink-0" />
                              <div>
                                <div className="font-medium">{teacher.name}</div>
                                <div className="flex items-center gap-2 text-xs mt-1">
                                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                  <span>{teacher.rating}</span>
                                  <span className="text-gray-500">({teacher.reviews} reviews)</span>
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date & Time Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Date Selection */}
                    <div className="space-y-3">
                      <Label className="text-gray-700 font-medium">Choose Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={`w-full h-12 justify-start text-left font-normal bg-white border-gray-300 ${
                              !selectedDate && "text-gray-500"
                            }`}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4 text-blue-600" />
                            {selectedDate ? (
                              format(selectedDate, "PPP")
                            ) : (
                              <span>Select date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={(date) =>
                              date < new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                            className="border-0"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Time Selection */}
                    <div className="space-y-3">
                      <Label className="text-gray-700 font-medium">Choose Time</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((time) => (
                          <Button
                            key={time}
                            type="button"
                            variant={selectedTime === time ? "default" : "outline"}
                            className={`h-10 ${selectedTime === time ? 'bg-blue-600' : 'bg-white border-gray-300'}`}
                            onClick={() => setSelectedTime(time)}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Student Information */}
                  <div className="border-t pt-6 mt-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-600" />
                      Student Information
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-700">Full Name *</Label>
                        <Input
                          id="name"
                          value={studentName}
                          onChange={(e) => setStudentName(e.target.value)}
                          placeholder="Your full name"
                          className="h-12 border-gray-300"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={studentEmail}
                          onChange={(e) => setStudentEmail(e.target.value)}
                          placeholder="your.email@example.com"
                          className="h-12 border-gray-300"
                          required
                        />
                      </div>
                    </div>

                    <div className="mt-5 space-y-2">
                      <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
                      <Input
                        id="phone"
                        value={studentPhone}
                        onChange={(e) => setStudentPhone(e.target.value)}
                        placeholder="+20 1XX XXX XXXX"
                        className="h-12 border-gray-300"
                      />
                    </div>

                    <div className="mt-5 space-y-2">
                      <Label htmlFor="notes" className="text-gray-700">Additional Notes</Label>
                      <Textarea
                        id="notes"
                        value={lessonNotes}
                        onChange={(e) => setLessonNotes(e.target.value)}
                        placeholder="Any notes or special requests for the lesson..."
                        rows={3}
                        className="border-gray-300"
                      />
                    </div>
                  </div>

                  {/* Payment Methods */}
                  {paymentMethods.length > 0 && (
                    <div className="border-t pt-6 mt-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-5">Payment Method *</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {paymentMethods.map((method) => (
                          <div 
                            key={method.id}
                            className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                              selectedPaymentMethod === method.id 
                                ? 'border-blue-600 bg-blue-50' 
                                : 'border-gray-200 hover:border-blue-300'
                            }`}
                            onClick={() => setSelectedPaymentMethod(method.id)}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                selectedPaymentMethod === method.id 
                                  ? 'bg-blue-100 text-blue-600' 
                                  : 'bg-gray-100 text-gray-500'
                              }`}>
                                {method.icon || <div className="bg-gray-300 border-2 border-dashed rounded-xl w-4 h-4" />}
                              </div>
                              <div>
                                <div className="font-medium">{method.name}</div>
                                <div className="text-sm text-gray-500">{method.details}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full h-14 mt-6 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-lg font-semibold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Booking Your Lesson...
                      </>
                    ) : (
                      <>
                        <BookOpen className="w-5 h-5 mr-2" />
                        Book Lesson Now
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="space-y-6">
            {selectedTeacher && (
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg py-5">
                  <CardTitle className="text-blue-800">Teacher Information</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center flex-shrink-0">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{selectedTeacher.name}</h3>
                      <p className="text-blue-600 font-medium">{selectedTeacher.specialization}</p>
                      
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-bold">{selectedTeacher.rating}</span>
                          <span className="text-gray-500 text-sm">({selectedTeacher.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{selectedTeacher.timezone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 bg-gray-50 rounded-lg p-4 mb-5">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{selectedTeacher.rating}</div>
                      <div className="text-xs text-gray-500">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{selectedTeacher.reviews}</div>
                      <div className="text-xs text-gray-500">Students</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{selectedTeacher.lessons}</div>
                      <div className="text-xs text-gray-500">Lessons</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t">
                    <span className="text-gray-700 font-medium">Price per hour:</span>
                    <span className="text-xl font-bold text-blue-600">
                      {selectedTeacher.hourly_rate} EGP
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}

            {(selectedDate || selectedTime) && (
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg py-5">
                  <CardTitle className="text-blue-800">Appointment Details</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {selectedDate && (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <CalendarIcon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Date</div>
                          <div className="font-medium">{format(selectedDate, "PPP")}</div>
                        </div>
                      </div>
                    )}
                    {selectedTime && (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <Clock className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Time</div>
                          <div className="font-medium">{selectedTime}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg py-5">
                <CardTitle className="text-blue-800">Important Information</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Free trial:</span> First lesson is free for 30 minutes
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Cancellation policy:</span> Cancel or modify 24 hours in advance
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Meeting link:</span> Sent via email before the lesson
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Requirements:</span> Stable internet connection and microphone
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Button 
              variant="outline" 
              className="w-full h-12 border-gray-300 text-gray-700 hover:bg-gray-50"
              onClick={() => navigate('/teachers')}
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              Browse All Teachers
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
