import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, BookOpen, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface Teacher {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  reviews: number;
  hourlyRate: number;
  image: string;
  isOnline: boolean;
}

interface TeacherCardProps {
  teacher: Teacher;
}

const TeacherCard = ({ teacher }: TeacherCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-glow transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] border-0 bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <CardContent className="relative p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Profile Image */}
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-primary/20 group-hover:border-primary/40 transition-all duration-300 group-hover:shadow-lg">
              <img
                src={teacher.image}
                alt={teacher.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            {teacher.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-learning-green rounded-full border-3 border-background flex items-center justify-center shadow-lg">
                <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
              </div>
            )}
          </div>

          {/* Teacher Info */}
          <div className="space-y-3 w-full">
            <div>
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-1">
                {teacher.name}
              </h3>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-sm px-3 py-1">
                {teacher.specialization}
              </Badge>
            </div>

            {/* Rating and Reviews */}
            <div className="flex items-center justify-center space-x-3">
              <div className="flex items-center space-x-1 bg-learning-orange/10 px-3 py-1.5 rounded-full">
                <Star className="w-4 h-4 fill-learning-orange text-learning-orange" />
                <span className="text-sm font-semibold text-learning-orange">{teacher.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground font-medium">
                {teacher.reviews} reviews
              </span>
            </div>

            {/* Rate */}
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-3 border border-primary/10">
              <div className="text-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {teacher.hourlyRate} EGP
                </span>
                <span className="text-sm text-muted-foreground block">/hour</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-2 pt-2">
              <Button variant="outline" className="w-full group/btn border-primary/20 hover:border-primary/40 hover:bg-primary/5" asChild>
                <Link to={`/teachers/${teacher.id}`}>
                  <Users className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                  View Profile
                </Link>
              </Button>
              <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all duration-300" asChild>
                <Link to={`/booking?teacher=${teacher.id}`}>
                  <BookOpen className="w-4 h-4 mr-2" />
                  Book Lesson
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeacherCard;