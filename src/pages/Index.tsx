import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Users, 
  Globe, 
  Star, 
  CheckCircle, 
  Play,
  Award,
  Clock,
  MessageCircle,
  ArrowRight,
  Zap,
  Target,
  Trophy
} from "lucide-react";
import { Link } from "react-router-dom";
import TeacherCard from "@/components/TeacherCard";
import heroImage from "@/assets/hero-english-learning.jpg";
import teacherSarah from "@/assets/teacher-sarah.jpg";
import teacherMichael from "@/assets/teacher-michael.jpg";
import teacherEmma from "@/assets/teacher-emma.jpg";

// Sample teachers data for preview
const featuredTeachers = [
  {
    id: "1",
    name: "سارة أحمد",
    specialization: "محادثة وقواعد",
    rating: 4.9,
    reviews: 127,
    hourlyRate: 25,
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
    hourlyRate: 35,
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
    hourlyRate: 30,
    experience: "3 سنوات خبرة",
    languages: ["الإنجليزية", "الألمانية"],
    image: teacherEmma,
    isOnline: true,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="hero-gradient min-h-screen flex items-center">
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="text-white animate-slide-up">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                تعلم الإنجليزية مع
                <span className="block text-transparent bg-gradient-to-r from-white to-blue-200 bg-clip-text">
                  أفضل المعلمين
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
                احجز دروساً فردية مع معلمين مؤهلين من جميع أنحاء العالم. تعلم في الوقت المناسب لك وحقق أهدافك في تعلم اللغة الإنجليزية.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button size="lg" className="bg-white text-primary hover:bg-learning-cream hover:text-primary shadow-hero text-lg px-8 py-4" asChild>
                  <Link to="/teachers">
                    <Users className="w-5 h-5 mr-2" />
                    اختر معلمك الآن
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white/30 bg-white/10 text-white hover:bg-white hover:text-primary backdrop-blur-sm text-lg px-8 py-4" asChild>
                  <Link to="/courses">
                    <Play className="w-5 h-5 mr-2" />
                    شاهد الدورات
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">500+</div>
                  <div className="text-white/80 text-sm">معلم مؤهل</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">10k+</div>
                  <div className="text-white/80 text-sm">طالب سعيد</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">4.9</div>
                  <div className="text-white/80 text-sm">تقييم المنصة</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative animate-float">
              <img
                src={heroImage}
                alt="English Learning Platform"
                className="rounded-3xl shadow-hero w-full max-w-lg mx-auto"
              />
              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-card animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-learning-brown fill-current" />
                  <span className="font-semibold">4.9/5</span>
                </div>
                <div className="text-sm text-muted-foreground">من 2000+ تقييم</div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-learning-olive text-white rounded-xl p-4 shadow-card animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">95%</span>
                </div>
                <div className="text-sm opacity-90">معدل النجاح</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-scale-in">
            <h2 className="text-4xl font-bold mb-4">لماذا تختار EnglishGang؟</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              نوفر لك أفضل تجربة تعلم مخصصة لاحتياجاتك وأهدافك الشخصية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-8 h-8" />,
                title: "معلمين مؤهلين",
                description: "معلمين معتمدين مع خبرة واسعة في تدريس اللغة الإنجليزية"
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "مرونة في المواعيد",
                description: "احجز دروسك في الوقت المناسب لك على مدار 24 ساعة"
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: "دروس مخصصة",
                description: "خطط دراسية مصممة خصيصاً لمستواك وأهدافك"
              },
              {
                icon: <MessageCircle className="w-8 h-8" />,
                title: "محادثة تفاعلية",
                description: "ممارسة المحادثة الحقيقية مع متحدثين أصليين"
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "شهادات معتمدة",
                description: "احصل على شهادات إتمام معتمدة دولياً"
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "تقدم سريع",
                description: "تحسن ملحوظ في مستواك خلال أسابيع قليلة"
              }
            ].map((feature, index) => (
              <Card key={index} className="group hover:shadow-glow transition-all duration-300 hover:-translate-y-1 card-gradient">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 hero-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Teachers Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">أفضل معلمينا</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              تعرف على معلمينا المتميزين الحاصلين على أعلى التقييمات من الطلاب
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredTeachers.map((teacher, index) => (
              <div
                key={teacher.id}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <TeacherCard teacher={teacher} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <Link to="/teachers">
                عرض جميع المعلمين
                <ArrowRight className="w-5 h-5 mr-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">كيف تبدأ رحلتك؟</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              ثلاث خطوات بسيطة للبدء في تعلم الإنجليزية معنا
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "اختر معلمك",
                description: "تصفح قائمة معلمينا واختر المعلم المناسب لأهدافك ومستواك"
              },
              {
                step: "2",
                title: "احجز درسك",
                description: "اختر الموعد المناسب لك واحجز درسك الأول بسهولة"
              },
              {
                step: "3",
                title: "ابدأ التعلم",
                description: "انضم للدرس وابدأ رحلتك في تحسين مستواك في اللغة الإنجليزية"
              }
            ].map((step, index) => (
              <div key={index} className="text-center animate-scale-in" style={{ animationDelay: `${index * 0.3}s` }}>
                <div className="w-20 h-20 hero-gradient rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white shadow-glow">
                  {step.step}
                </div>
                <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">{step.description}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-10 left-1/2 transform translate-x-8">
                    <ArrowRight className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ابدأ رحلتك في تعلم الإنجليزية اليوم
            </h2>
            <p className="text-xl mb-8 text-white/90">
              انضم إلى آلاف الطلاب الذين حققوا أهدافهم في تعلم اللغة الإنجليزية معنا
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-learning-cream hover:text-primary shadow-hero text-lg px-8 py-4" asChild>
                <Link to="/teachers">
                  <BookOpen className="w-5 h-5 mr-2" />
                  ابدأ الآن مجاناً
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 bg-white/10 text-white hover:bg-white hover:text-primary backdrop-blur-sm text-lg px-8 py-4" asChild>
                <Link to="/about">
                  تعرف على المزيد
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
