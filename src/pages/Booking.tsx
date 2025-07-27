import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Clock, User, BookOpen, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import teacherSarah from "@/assets/teacher-sarah.jpg";

interface Teacher {
  id: string;
  name: string;
  specialization: string;
  hourly_rate: number;
  image_url: string | null;
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
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchTeachers();
    const teacherId = searchParams.get('teacher');
    if (teacherId) {
      // Find and set the teacher from the list
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
        .select('id, name, specialization, hourly_rate, image_url')
        .eq('is_online', true)
        .order('rating', { ascending: false });

      if (error) throw error;

      const formattedTeachers = data?.map(teacher => ({
        id: teacher.id,
        name: teacher.name,
        specialization: teacher.specialization,
        hourly_rate: teacher.hourly_rate,
        image_url: teacher.image_url,
      })) || [];

      setTeachers(formattedTeachers);
      
      // Set teacher if URL param exists
      const teacherId = searchParams.get('teacher');
      if (teacherId) {
        const teacher = formattedTeachers.find(t => t.id === teacherId);
        if (teacher) setSelectedTeacher(teacher);
      }
    } catch (error) {
      console.error('Error fetching teachers:', error);
      // Fallback to sample data
      const fallbackTeachers = [
        {
          id: "1",
          name: "سارة أحمد",
          specialization: "محادثة وقواعد",
          hourly_rate: 150,
          image_url: teacherSarah,
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

    setLoading(true);
    
    try {
      // Insert booking into database
      const { error } = await supabase
        .from('bookings')
        .insert([{
          teacher_id: selectedTeacher.id,
          student_name: studentName,
          student_email: studentEmail,
          student_phone: studentPhone,
          lesson_date: format(selectedDate, 'yyyy-MM-dd'),
          lesson_time: selectedTime,
          lesson_notes: lessonNotes,
          status: 'pending'
        }]);

      if (error) throw error;
      
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
      
    } catch (error) {
      toast({
        title: "Booking Error",
        description: "An error occurred while trying to book. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="hero-gradient py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-slide-up">
            Book Your Lesson Now
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto animate-slide-up">
            Choose your teacher and time that suits you and start your English learning journey
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Booking Details
                </CardTitle>
                <CardDescription>
                  Fill out the form below to book your lesson with the selected teacher
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Teacher Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="teacher">Choose Teacher</Label>
                    <Select 
                      value={selectedTeacher?.id || ""} 
                      onValueChange={(value) => {
                        const teacher = teachers.find(t => t.id === value);
                        setSelectedTeacher(teacher || null);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a teacher from the list" />
                      </SelectTrigger>
                      <SelectContent>
                        {teachers.map((teacher) => (
                          <SelectItem key={teacher.id} value={teacher.id}>
                            <div className="flex items-center gap-2">
                              <span>{teacher.name}</span>
                              <Badge variant="secondary" className="text-xs">
                                {teacher.specialization}
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date Selection */}
                  <div className="space-y-2">
                    <Label>Choose Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`w-full justify-start text-left font-normal ${
                            !selectedDate && "text-muted-foreground"
                          }`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? (
                            format(selectedDate, "PPP")
                          ) : (
                            <span>Choose date</span>
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
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Time Selection */}
                  <div className="space-y-2">
                    <Label>Choose Time</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          type="button"
                          variant={selectedTime === time ? "default" : "outline"}
                          className="w-full"
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Student Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        placeholder="example@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={studentPhone}
                      onChange={(e) => setStudentPhone(e.target.value)}
                      placeholder="+20 1XX XXX XXXX"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      value={lessonNotes}
                      onChange={(e) => setLessonNotes(e.target.value)}
                      placeholder="Any notes or special requests for the lesson..."
                      rows={3}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Booking...
                      </>
                    ) : (
                      <>
                        <BookOpen className="w-4 h-4 mr-2" />
                        Book Lesson
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
              <Card>
                <CardHeader>
                  <CardTitle>Teacher Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedTeacher.image_url || teacherSarah}
                      alt={selectedTeacher.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium">{selectedTeacher.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedTeacher.specialization}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-muted-foreground">Price per hour:</span>
                    <span className="text-lg font-bold text-primary">
                      {selectedTeacher.hourly_rate} EGP
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}

            {(selectedDate || selectedTime) && (
              <Card>
                <CardHeader>
                  <CardTitle>Appointment Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {selectedDate && (
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-primary" />
                      <span>{format(selectedDate, "PPP")}</span>
                    </div>
                  )}
                  {selectedTime && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{selectedTime}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Important Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• First trial lesson is free for 30 minutes</li>
                  <li>• You can cancel or modify the appointment 24 hours in advance</li>
                  <li>• You will receive the meeting link via email</li>
                  <li>• Make sure your internet connection is stable before the lesson</li>
                </ul>
              </CardContent>
            </Card>

            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/teachers')}
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              Back to Teachers List
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;