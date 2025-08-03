import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock, User, BookOpen } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface Teacher {
  id: string;
  name: string;
  specialization: string;
  hourly_rate: number;
  rating: number;
  reviews: number;
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
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [lessonNotes, setLessonNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Set teacher from URL params
    const teacherId = searchParams.get('teacher');
    if (teacherId) {
      setSelectedTeacher({
        id: teacherId,
        name: searchParams.get('name') || "Teacher",
        specialization: searchParams.get('specialization') || "English",
        hourly_rate: Number(searchParams.get('rate')) || 150,
        rating: 5.0,
        reviews: 462
      });
    }
  }, [searchParams]);

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
          title: "Booking Successful!",
          description: `Your lesson has been booked for ${format(selectedDate, 'dd/MM/yyyy')} at ${selectedTime}`,
        });

        // Reset form
        setSelectedDate(undefined);
        setSelectedTime("");
        setStudentName("");
        setStudentEmail("");
        setStudentPhone("");
        setLessonNotes("");
        
        // Redirect to success page
        setTimeout(() => {
          navigate('/success');
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
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Book Your Lesson</h1>
            <p className="text-gray-600">Fill in your details to schedule your English lesson</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-sm">
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    <span>Booking Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Date & Time Selection */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Date Selection */}
                      <div className="space-y-2">
                        <Label>Date *</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={`w-full justify-start text-left font-normal ${
                                !selectedDate && "text-gray-500"
                              }`}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={setSelectedDate}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* Time Selection */}
                      <div className="space-y-2">
                        <Label>Time *</Label>
                        <div className="grid grid-cols-3 gap-2">
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
                    </div>

                    {/* Student Information */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            placeholder="Your name"
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
                            placeholder="your@email.com"
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
                          placeholder="+20 123 456 7890"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="notes">Lesson Notes</Label>
                        <Textarea
                          id="notes"
                          value={lessonNotes}
                          onChange={(e) => setLessonNotes(e.target.value)}
                          placeholder="Any special requests..."
                          rows={3}
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full mt-4"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Processing..." : "Confirm Booking"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Booking Summary */}
            <div className="space-y-4">
              {selectedTeacher && (
                <Card className="shadow-sm">
                  <CardHeader className="bg-gray-50 border-b">
                    <CardTitle>Teacher Information</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-lg">👤</span>
                      </div>
                      <div>
                        <h3 className="font-bold">{selectedTeacher.name}</h3>
                        <p className="text-sm text-gray-600">{selectedTeacher.specialization}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm">{selectedTeacher.rating} ({selectedTeacher.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price:</span>
                        <span className="font-bold">{selectedTeacher.hourly_rate} EGP/hour</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {(selectedDate || selectedTime) && (
                <Card className="shadow-sm">
                  <CardHeader className="bg-gray-50 border-b">
                    <CardTitle>Appointment</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      {selectedDate && (
                        <div className="flex items-center gap-3">
                          <CalendarIcon className="w-5 h-5 text-gray-500" />
                          <span>{format(selectedDate, "PPP")}</span>
                        </div>
                      )}
                      {selectedTime && (
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-gray-500" />
                          <span>{selectedTime}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card className="shadow-sm">
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle>Important Information</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Cancellation policy: 24 hours notice required</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Meeting link will be emailed to you</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Stable internet connection required</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
