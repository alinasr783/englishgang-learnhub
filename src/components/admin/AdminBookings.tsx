import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, User, Mail, Phone, Check, X, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface Booking {
  id: string;
  teacher_id: string;
  student_name: string;
  student_email: string;
  student_phone: string | null;
  lesson_date: string;
  lesson_time: string;
  lesson_notes: string | null;
  status: string;
  created_at: string;
}

interface Teacher {
  id: string;
  name: string;
}

const AdminBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    fetchBookings();
    fetchTeachers();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch bookings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchTeachers = async () => {
    try {
      const { data, error } = await supabase
        .from('teachers')
        .select('id, name');

      if (error) throw error;
      setTeachers(data || []);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', bookingId);

      if (error) throw error;

      toast({
        title: "Status Updated",
        description: `Booking status changed to ${newStatus}`,
      });

      fetchBookings();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update booking status",
        variant: "destructive",
      });
    }
  };

  const getTeacherName = (teacherId: string) => {
    const teacher = teachers.find(t => t.id === teacherId);
    return teacher ? teacher.name : 'Unknown Teacher';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'default';
      case 'pending': return 'secondary';
      case 'cancelled': return 'destructive';
      case 'completed': return 'outline';
      default: return 'secondary';
    }
  };

  const filteredBookings = statusFilter === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === statusFilter);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Bookings</h2>
        <div className="flex items-center gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Bookings</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredBookings.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No bookings found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBookings.map((booking) => (
            <Card key={booking.id} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{booking.student_name}</CardTitle>
                  <Badge variant={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>
                </div>
                <CardDescription>
                  Teacher: {getTeacherName(booking.teacher_id)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{format(new Date(booking.lesson_date), 'PPP')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{booking.lesson_time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-primary" />
                    <span className="truncate">{booking.student_email}</span>
                  </div>
                  {booking.student_phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-primary" />
                      <span>{booking.student_phone}</span>
                    </div>
                  )}
                </div>

                {booking.lesson_notes && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Notes:</p>
                    <p className="text-sm">{booking.lesson_notes}</p>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  {booking.status === 'pending' && (
                    <>
                      <Button 
                        size="sm" 
                        onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                        className="flex-1"
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Confirm
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                        className="flex-1"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Cancel
                      </Button>
                    </>
                  )}
                  {booking.status === 'confirmed' && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => updateBookingStatus(booking.id, 'completed')}
                      className="w-full"
                    >
                      Mark Complete
                    </Button>
                  )}
                </div>

                <div className="text-xs text-muted-foreground border-t pt-2">
                  Booked: {format(new Date(booking.created_at), 'PPp')}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBookings;