import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Clock, 
  Users, 
  Star, 
  BookOpen, 
  Search,
  Filter,
  GraduationCap,
  Target,
  Award
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import courseConversation from "@/assets/course-conversation.jpg";
import courseIelts from "@/assets/course-ielts.jpg";
import courseBusiness from "@/assets/course-business.jpg";
import courseGrammar from "@/assets/course-grammar.jpg";


const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchCourses();
  }, []);

  const getCourseImage = (category: string) => {
    switch (category) {
      case 'محادثة': return courseConversation;
      case 'امتحانات': return courseIelts;
      case 'أعمال': return courseBusiness;
      case 'قواعد': return courseGrammar;
      default: return courseConversation;
    }
  };

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('rating', { ascending: false });

      if (error) throw error;

      // Map database data to component format
      const formattedCourses = data?.map(course => ({
        id: course.id,
        title: course.title,
        description: course.description,
        level: course.level,
        duration: course.duration,
        students: course.students || 0,
        rating: course.rating || 0,
        price: course.price,
        instructor: course.instructor,
        image: getCourseImage(course.category),
        category: course.category,
        features: course.features || [],
      })) || [];

      setCourses(formattedCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل بيانات الدورات",
        variant: "destructive",
      });
      // Fallback to sample data
      setCourses([
        {
          id: "1",
          title: "English Conversation for Beginners",
          description: "Learn the basics of English conversation from scratch with focus on correct pronunciation and speaking confidence",
          level: "مبتدئ",
          duration: "8 weeks",
          students: 1250,
          rating: 4.8,
          price: 1200,
          instructor: "Sarah Ahmed",
          image: courseConversation,
          category: "محادثة",
          features: ["Interactive lessons", "Daily practice", "Certified completion"]
        },
        {
          id: "2", 
          title: "IELTS Comprehensive Preparation",
          description: "Complete course for IELTS exam preparation with proven strategies to achieve the highest scores",
          level: "متقدم",
          duration: "12 weeks",
          students: 890,
          rating: 4.9,
          price: 2400,
          instructor: "Michael Johnson",
          image: courseIelts,
          category: "امتحانات",
          features: ["Mock exams", "Personal assessment", "Score guarantee"]
        },
        {
          id: "3",
          title: "Advanced Business English",
          description: "Develop your professional English skills to excel in the workplace and get better opportunities",
          level: "متوسط",
          duration: "10 weeks",
          students: 675,
          rating: 4.7,
          price: 1800,
          instructor: "Emma Smith",
          image: courseBusiness,
          category: "أعمال",
          features: ["Presentation skills", "Business correspondence", "Job interviews"]
        },
        {
          id: "4",
          title: "Simplified English Grammar",
          description: "Master English grammar in an easy and understandable way with comprehensive practical exercises",
          level: "مبتدئ",
          duration: "6 weeks",
          students: 1500,
          rating: 4.6,
          price: 800,
          instructor: "Ahmed Mohamed",
          image: courseGrammar,
          category: "قواعد",
          features: ["Simple explanations", "Progressive exercises", "Continuous review"]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses
    .filter((course) => {
      if (levelFilter !== "all" && course.level !== levelFilter) return false;
      if (categoryFilter !== "all" && course.category !== categoryFilter) return false;
      return course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
             course.description.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "students") return b.students - a.students;
      return 0;
    });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="hero-gradient py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 animate-slide-up">
            Our Educational Courses
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto animate-slide-up px-4">
            Choose from a variety of courses designed specifically to achieve your educational goals
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Search and Filter Section */}
        <div className="bg-card rounded-xl sm:rounded-2xl shadow-card p-4 sm:p-6 mb-6 sm:mb-8 animate-scale-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search for course..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Level Filter */}
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="مبتدئ">Beginner</SelectItem>
                <SelectItem value="متوسط">Intermediate</SelectItem>
                <SelectItem value="متقدم">Advanced</SelectItem>
              </SelectContent>
            </Select>

            {/* Category Filter */}
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="محادثة">Conversation</SelectItem>
                <SelectItem value="قواعد">Grammar</SelectItem>
                <SelectItem value="أعمال">Business</SelectItem>
                <SelectItem value="امتحانات">Exams</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="students">Most Popular</SelectItem>
                <SelectItem value="price-low">Price (Low to High)</SelectItem>
                <SelectItem value="price-high">Price (High to Low)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Found <span className="font-semibold text-foreground">{filteredCourses.length}</span> courses
          </p>
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-lg h-96"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredCourses.map((course, index) => (
            <Card 
              key={course.id} 
              className="group overflow-hidden hover:shadow-glow transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] animate-scale-in border-0 bg-gradient-to-br from-card via-card to-card/80"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative h-52 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <Badge 
                  className="absolute top-4 right-4 bg-learning-brown/90 text-white backdrop-blur-sm border border-white/20"
                >
                  {course.level === 'مبتدئ' ? 'Beginner' : course.level === 'متوسط' ? 'Intermediate' : 'Advanced'}
                </Badge>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg mb-1 line-clamp-2">{course.title}</h3>
                </div>
              </div>

              <CardContent className="relative p-6 space-y-4">
                <CardDescription className="text-sm leading-relaxed line-clamp-3 min-h-[60px]">
                  {course.description}
                </CardDescription>

                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="flex items-center gap-1 bg-primary/5 p-2 rounded-lg">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium">{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-secondary/5 p-2 rounded-lg">
                    <Users className="w-4 h-4 text-secondary" />
                    <span className="text-xs font-medium">{course.students}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-learning-orange/5 p-2 rounded-lg">
                    <Star className="w-4 h-4 fill-learning-orange text-learning-orange" />
                    <span className="text-xs font-medium">{course.rating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {course.features.map((feature, i) => (
                    <Badge key={i} variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
                      {feature}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <span className="text-sm text-muted-foreground">Instructor: {course.instructor}</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {course.price} EGP
                    </span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all duration-300 group/btn" size="lg">
                  Enroll in Course
                  <GraduationCap className="ml-2 w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                </Button>
              </CardContent>
            </Card>
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Courses Found</h3>
            <p className="text-muted-foreground mb-4">Try searching with different keywords or change the filters</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setLevelFilter("all");
                setCategoryFilter("all");
                setSortBy("rating");
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;