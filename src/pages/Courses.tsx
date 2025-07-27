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


const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCourses();
  }, []);

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
        image: course.image_url || "/placeholder.svg",
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
          title: "المحادثة الإنجليزية للمبتدئين",
          description: "تعلم أساسيات المحادثة الإنجليزية من الصفر مع التركيز على النطق الصحيح والثقة في التحدث",
          level: "مبتدئ",
          duration: "8 أسابيع",
          students: 1250,
          rating: 4.8,
          price: 1200, // EGP
          instructor: "سارة أحمد",
          image: "/placeholder.svg",
          category: "محادثة",
          features: ["دروس تفاعلية", "ممارسة يومية", "شهادة معتمدة"]
        },
        {
          id: "2", 
          title: "IELTS التحضير الشامل",
          description: "دورة متكاملة للتحضير لامتحان IELTS مع استراتيجيات مثبتة لتحقيق أعلى الدرجات",
          level: "متقدم",
          duration: "12 أسبوع",
          students: 890,
          rating: 4.9,
          price: 2400, // EGP
          instructor: "مايكل جونسون",
          image: "/placeholder.svg",
          category: "امتحانات",
          features: ["امتحانات تجريبية", "تقييم شخصي", "ضمان النتيجة"]
        },
        {
          id: "3",
          title: "إنجليزية الأعمال المتقدمة",
          description: "طور مهاراتك في الإنجليزية المهنية للتفوق في بيئة العمل والحصول على فرص أفضل",
          level: "متوسط",
          duration: "10 أسابيع",
          students: 675,
          rating: 4.7,
          price: 1800, // EGP
          instructor: "إيما سميث",
          image: "/placeholder.svg",
          category: "أعمال",
          features: ["مهارات العرض", "كتابة المراسلات", "مقابلات العمل"]
        },
        {
          id: "4",
          title: "القواعد الإنجليزية المبسطة",
          description: "اتقن قواعد اللغة الإنجليزية بطريقة سهلة ومفهومة مع تمارين تطبيقية شاملة",
          level: "مبتدئ",
          duration: "6 أسابيع",
          students: 1500,
          rating: 4.6,
          price: 800, // EGP
          instructor: "أحمد محمد",
          image: "/placeholder.svg",
          category: "قواعد",
          features: ["شرح مبسط", "تمارين متدرجة", "مراجعة مستمرة"]
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
      <div className="hero-gradient py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-slide-up">
            دوراتنا التعليمية
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto animate-slide-up">
            اختر من مجموعة متنوعة من الدورات المصممة خصيصاً لتحقيق أهدافك التعليمية
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <div className="bg-card rounded-2xl shadow-card p-6 mb-8 animate-scale-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="ابحث عن دورة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Level Filter */}
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger>
                <SelectValue placeholder="المستوى" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع المستويات</SelectItem>
                <SelectItem value="مبتدئ">مبتدئ</SelectItem>
                <SelectItem value="متوسط">متوسط</SelectItem>
                <SelectItem value="متقدم">متقدم</SelectItem>
              </SelectContent>
            </Select>

            {/* Category Filter */}
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="التصنيف" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع التصنيفات</SelectItem>
                <SelectItem value="محادثة">محادثة</SelectItem>
                <SelectItem value="قواعد">قواعد</SelectItem>
                <SelectItem value="أعمال">أعمال</SelectItem>
                <SelectItem value="امتحانات">امتحانات</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="ترتيب حسب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">الأعلى تقييماً</SelectItem>
                <SelectItem value="students">الأكثر التحاقاً</SelectItem>
                <SelectItem value="price-low">السعر (الأقل أولاً)</SelectItem>
                <SelectItem value="price-high">السعر (الأعلى أولاً)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            تم العثور على <span className="font-semibold text-foreground">{filteredCourses.length}</span> دورة
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
            <Card 
              key={course.id} 
              className="overflow-hidden hover:shadow-glow transition-all duration-300 animate-scale-in border-0 shadow-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 bg-gradient-card">
                <div className="absolute inset-0 bg-learning-olive/10 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-learning-olive/50" />
                </div>
                <Badge 
                  className="absolute top-4 right-4 bg-learning-brown text-white"
                >
                  {course.level}
                </Badge>
              </div>

              <CardHeader>
                <CardTitle className="text-xl mb-2">{course.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {course.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {course.students}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {course.rating}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {course.features.map((feature, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">المدرب: {course.instructor}</span>
                  <span className="text-2xl font-bold text-primary">{course.price} ج.م</span>
                </div>
              </CardContent>

              <CardFooter>
                <Button className="w-full" size="lg">
                  التسجيل في الدورة
                  <GraduationCap className="mr-2 w-4 h-4" />
                </Button>
              </CardFooter>
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
            <h3 className="text-xl font-semibold mb-2">لم يتم العثور على دورات</h3>
            <p className="text-muted-foreground mb-4">جرب البحث بكلمات مختلفة أو غير المرشحات</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setLevelFilter("all");
                setCategoryFilter("all");
                setSortBy("rating");
              }}
            >
              إعادة تعيين الفلاتر
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;