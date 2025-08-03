import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MessageCircle, Heart, CheckCircle } from "lucide-react";
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
  languages?: string[];
  country?: string;
}

interface TeacherCardProps {
  teacher: Teacher;
}

const TeacherCard = ({ teacher }: TeacherCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border border-border hover:border-primary/20 bg-card">
      <CardContent className="p-0">
        <div className="flex gap-3 p-4">
          {/* Teacher Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-muted">
              <img
                src={teacher.image}
                alt={teacher.name}
                className="w-full h-full object-cover"
              />
            </div>
            {teacher.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 space-y-2">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-foreground text-base leading-tight">
                  {teacher.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 hover:bg-green-100 px-2 py-0.5">
                    Community Tutor
                  </Badge>
                  {teacher.isOnline && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                </div>
              </div>
              <Button variant="ghost" size="sm" className="p-1 h-8 w-8 text-muted-foreground hover:text-foreground">
                <MessageCircle className="w-4 h-4" />
              </Button>
            </div>

            {/* Languages & Rating */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground font-medium">SPEAKS:</span>
                <div className="flex items-center gap-1">
                  <span className="font-medium">English</span>
                  <Badge variant="outline" className="text-xs bg-cyan-50 text-cyan-700 border-cyan-200 px-1.5 py-0.5">
                    Native
                  </Badge>
                  <span className="text-muted-foreground">+2</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-sm">{teacher.rating}</span>
                  <span className="text-sm text-muted-foreground">{teacher.reviews} Lessons</span>
                </div>
              </div>
            </div>

            {/* Specialization */}
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {teacher.specialization}
            </p>

            {/* Price & Actions */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">trial</span>
                <span className="text-lg font-bold text-primary">
                  EGP {teacher.hourlyRate}
                </span>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-xs px-3 py-1 h-8 hover:bg-primary hover:text-primary-foreground border-primary/20 hover:border-primary"
                  asChild
                >
                  <Link to={`/booking?teacher=${teacher.id}`}>
                    Book trial
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" className="p-1 h-8 w-8 text-muted-foreground hover:text-red-500">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeacherCard;