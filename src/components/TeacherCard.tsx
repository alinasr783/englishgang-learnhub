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
  experience: string;
  languages: string[];
  image: string;
  isOnline: boolean;
}

interface TeacherCardProps {
  teacher: Teacher;
}

const TeacherCard = ({ teacher }: TeacherCardProps) => {
  return (
    <Card className="group hover:shadow-glow transition-all duration-300 hover:-translate-y-1 card-gradient border-border/50">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          {/* Profile Image */}
          <div className="relative">
            <img
              src={teacher.image}
              alt={teacher.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
            />
            {teacher.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-learning-green rounded-full border-2 border-background flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            )}
          </div>

          {/* Teacher Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {teacher.name}
              </h3>
              <Badge variant="secondary" className="text-xs">
                {teacher.specialization}
              </Badge>
            </div>

            {/* Rating and Reviews */}
            <div className="flex items-center space-x-2 mb-3">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-learning-orange text-learning-orange" />
                <span className="text-sm font-medium">{teacher.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                ({teacher.reviews} reviews)
              </span>
            </div>

            {/* Experience and Rate */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{teacher.experience}</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-primary">{teacher.hourlyRate} ج.م</span>
                <span className="text-sm text-muted-foreground">/hour</span>
              </div>
            </div>

            {/* Languages */}
            <div className="flex flex-wrap gap-2 mb-4">
              {teacher.languages.map((lang, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {lang}
                </Badge>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1" asChild>
                <Link to={`/teachers/${teacher.id}`}>
                  <Users className="w-4 h-4 mr-1" />
                  View Profile
                </Link>
              </Button>
              <Button size="sm" className="flex-1" asChild>
                <Link to={`/booking?teacher=${teacher.id}`}>
                  <BookOpen className="w-4 h-4 mr-1" />
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