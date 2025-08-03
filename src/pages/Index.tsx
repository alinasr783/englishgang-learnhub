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
    name: "Sarah Ahmed",
    specialization: "Conversation & Grammar",
    rating: 4.9,
    reviews: 127,
    hourlyRate: 150,
    experience: "5 years experience",
    languages: ["Arabic", "English", "French"],
    image: teacherSarah,
    isOnline: true,
  },
  {
    id: "2",
    name: "Michael Johnson",
    specialization: "IELTS & TOEFL",
    rating: 4.8,
    reviews: 203,
    hourlyRate: 200,
    experience: "8 years experience",
    languages: ["English", "Spanish"],
    image: teacherMichael,
    isOnline: false,
  },
  {
    id: "3",
    name: "Emma Smith",
    specialization: "Business English",
    rating: 4.7,
    reviews: 89,
    hourlyRate: 180,
    experience: "3 years experience",
    languages: ["English", "German"],
    image: teacherEmma,
    isOnline: true,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24 hero-gradient">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full border border-white/20"></div>
          <div className="absolute top-40 right-20 w-24 h-24 rounded-full border border-white/20"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 rounded-full border border-white/20"></div>
          <div className="absolute bottom-40 right-10 w-20 h-20 rounded-full border border-white/20"></div>
        </div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-right">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 animate-slide-up">
                اكتشف معلم 
                <span className="block text-white/90 text-gradient">الإنجليزية المثالي</span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-white/80 mb-8 leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
                خذ دروساً شخصية مع معلمين خبراء. حسن مهاراتك في التحدث والكتابة والمحادثة باللغة الإنجليزية بالسرعة التي تناسبك.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-lg mx-auto lg:mx-0 mb-8 animate-scale-in" style={{ animationDelay: '0.4s' }}>
                <div className="flex flex-col sm:flex-row gap-3 bg-white/10 backdrop-blur-lg rounded-2xl p-3 border border-white/20 shadow-hero">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="ابحث عن معلمين، تخصصات..."
                      className="w-full px-4 py-3 text-white placeholder-white/60 bg-transparent focus:outline-none text-lg"
                    />
                  </div>
                  <Button size="lg" className="px-6 bg-white text-primary hover:bg-learning-cream hover:text-primary shadow-lg font-semibold">
                    بحث
                  </Button>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 animate-scale-in" style={{ animationDelay: '0.6s' }}>
                <Button size="lg" className="bg-white text-primary hover:bg-learning-cream hover:text-primary shadow-hero text-lg px-8 py-4" asChild>
                  <Link to="/teachers">
                    <BookOpen className="w-5 h-5 ml-2" />
                    ابدأ الآن مجاناً
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white/30 bg-white/10 text-white hover:bg-white hover:text-primary backdrop-blur-sm text-lg px-8 py-4">
                  <Play className="w-5 h-5 ml-2" />
                  شاهد الفيديو
                </Button>
              </div>
            </div>
            
            {/* Right Content - Stats & Features */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 animate-scale-in" style={{ animationDelay: '0.3s' }}>
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
                  <div className="text-3xl font-bold text-white mb-2">500+</div>
                  <div className="text-white/80 text-sm">معلم خبير</div>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
                  <div className="text-3xl font-bold text-white mb-2">50+</div>
                  <div className="text-white/80 text-sm">دولة</div>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
                  <div className="text-3xl font-bold text-white mb-2">4.9</div>
                  <div className="text-white/80 text-sm">متوسط التقييم</div>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
                  <div className="text-3xl font-bold text-white mb-2">24/7</div>
                  <div className="text-white/80 text-sm">دعم متواصل</div>
                </div>
              </div>
              
              {/* Hero Image */}
              <div className="relative animate-float">
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-hero">
                  <img 
                    src={heroImage} 
                    alt="English Learning" 
                    className="w-full h-64 object-cover rounded-2xl shadow-lg"
                  />
                  <div className="absolute -top-4 -right-4 bg-accent text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    🎓 دروس مباشرة
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    ⭐ تقييم 4.9
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 animate-scale-in">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Why Choose EnglishGang?</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              We provide you with the best personalized learning experience tailored to your needs and goals
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: <Users className="w-8 h-8" />,
                title: "Qualified Teachers",
                description: "Certified teachers with extensive experience in teaching English"
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "Flexible Schedule",
                description: "Book your lessons at the time that suits you 24/7"
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: "Personalized Lessons",
                description: "Study plans designed specifically for your level and goals"
              },
              {
                icon: <MessageCircle className="w-8 h-8" />,
                title: "Interactive Conversation",
                description: "Practice real conversation with native speakers"
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Certified Credentials",
                description: "Get internationally recognized completion certificates"
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Fast Progress",
                description: "Noticeable improvement in your level within a few weeks"
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
      <section className="py-12 sm:py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Our Best Teachers</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Meet our outstanding teachers who have earned the highest ratings from students
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
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
                View All Teachers
                <ArrowRight className="w-5 h-5 mr-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">How Do You Start Your Journey?</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Three simple steps to start learning English with us
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                step: "1",
                title: "Choose Your Teacher",
                description: "Browse our teacher list and select the teacher that suits your goals and level"
              },
              {
                step: "2",
                title: "Book Your Lesson",
                description: "Choose the time that suits you and easily book your first lesson"
              },
              {
                step: "3",
                title: "Start Learning",
                description: "Join the lesson and begin your journey to improve your English level"
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
      <section className="py-12 sm:py-16 lg:py-20 hero-gradient">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Start Your English Learning Journey Today
            </h2>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-white/90 px-4">
              Join thousands of students who have achieved their English learning goals with us
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-learning-cream hover:text-primary shadow-hero text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto" asChild>
                <Link to="/teachers">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Start Now for Free
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 bg-white/10 text-white hover:bg-white hover:text-primary backdrop-blur-sm text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto" asChild>
                <Link to="/about">
                  Learn More
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
