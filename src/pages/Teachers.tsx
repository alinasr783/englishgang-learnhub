import React, { useState, useEffect } from "react";
import TeacherCard from "@/components/TeacherCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import teacherSarah from "@/assets/teacher-sarah.jpg";
import teacherMichael from "@/assets/teacher-michael.jpg";
import teacherEmma from "@/assets/teacher-emma.jpg";


const Teachers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [filterBy, setFilterBy] = useState("all");
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const { data, error } = await supabase
        .from('teachers')
        .select('*')
        .order('rating', { ascending: false });

      if (error) throw error;

      // Map database data to component format
      const formattedTeachers = data?.map(teacher => ({
        id: teacher.id,
        name: teacher.name,
        specialization: teacher.specialization,
        rating: teacher.rating || 0,
        reviews: teacher.reviews || 0,
        hourlyRate: teacher.hourly_rate,
        experience: `${teacher.experience} سنوات خبرة`,
        languages: teacher.languages || [],
        image: teacher.image_url || teacherSarah, // fallback to default image
        isOnline: teacher.is_online || false,
      })) || [];

      setTeachers(formattedTeachers);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل بيانات المعلمين",
        variant: "destructive",
      });
      // Fallback to sample data
      setTeachers([
        {
          id: "1",
          name: "سارة أحمد",
          specialization: "محادثة وقواعد",
          rating: 4.9,
          reviews: 127,
          hourlyRate: 150, // EGP
          experience: "5 سنوات خبرة",
          languages: ["العربية", "الإنجليزية", "الفرنسية"],
          image: teacherSarah,
          isOnline: true,
        },
        {
          id: "2",
          name: "مايكل جونسون",
          specialization: "IELTS & TOEFL",
          rating: 4.8,
          reviews: 203,
          hourlyRate: 200, // EGP
          experience: "8 سنوات خبرة",
          languages: ["الإنجليزية", "الإسبانية"],
          image: teacherMichael,
          isOnline: false,
        },
        {
          id: "3",
          name: "إيما سميث",
          specialization: "إنجليزية الأعمال",
          rating: 4.7,
          reviews: 89,
          hourlyRate: 180, // EGP
          experience: "3 سنوات خبرة",
          languages: ["الإنجليزية", "الألمانية"],
          image: teacherEmma,
          isOnline: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredTeachers = teachers
    .filter((teacher) => {
      if (filterBy === "online") return teacher.isOnline;
      if (filterBy === "offline") return !teacher.isOnline;
      return true;
    })
    .filter((teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "price-low") return a.hourlyRate - b.hourlyRate;
      if (sortBy === "price-high") return b.hourlyRate - a.hourlyRate;
      if (sortBy === "reviews") return b.reviews - a.reviews;
      return 0;
    });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="hero-gradient py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-slide-up">
            اختر معلمك المثالي
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto animate-slide-up">
            تعلم الإنجليزية مع أفضل المعلمين المؤهلين من جميع أنحاء العالم
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <div className="bg-card rounded-2xl shadow-card p-6 mb-8 animate-scale-in">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="ابحث عن معلم أو تخصص..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="ترتيب حسب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">الأعلى تقييماً</SelectItem>
                <SelectItem value="reviews">الأكثر تقييماً</SelectItem>
                <SelectItem value="price-low">السعر (الأقل أولاً)</SelectItem>
                <SelectItem value="price-high">السعر (الأعلى أولاً)</SelectItem>
              </SelectContent>
            </Select>

            {/* Filter */}
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="فلترة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع المعلمين</SelectItem>
                <SelectItem value="online">متصل الآن</SelectItem>
                <SelectItem value="offline">غير متصل</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            تم العثور على <span className="font-semibold text-foreground">{filteredTeachers.length}</span> معلم
          </p>
        </div>

        {/* Teachers Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-lg h-64"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTeachers.map((teacher, index) => (
              <div
                key={teacher.id}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <TeacherCard teacher={teacher} />
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredTeachers.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">لم يتم العثور على نتائج</h3>
            <p className="text-muted-foreground mb-4">جرب البحث بكلمات مختلفة أو غير المرشحات</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setFilterBy("all");
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

export default Teachers;