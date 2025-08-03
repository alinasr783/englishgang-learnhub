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
      <section className="relative overflow-hidden py-20 sm:py-24 lg:py-32 hero-gradient min-h-[90vh] flex items-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-[10%] w-32 h-32 rounded-full bg-white/10 animate-pulse"></div>
          <div className="absolute top-1/3 right-[15%] w-24 h-24 rounded-full bg-white/5 animate-float"></div>
          <div className="absolute bottom-1/3 left-[20%] w-40 h-40 rounded-full bg-white/10 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/4 right-[25%] w-28 h-28 rounded-full bg-white/5 animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-[60%] w-16 h-16 rounded-full bg-white/10 animate-pulse" style={{ animationDelay: '3s' }}></div>
        </div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-right space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight animate-slide-up">
                  اكتشف معلم 
                  <span className="block bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
                    الإنجليزية المثالي
                  </span>
                </h1>
                <p className="text-xl sm:text-2xl lg:text-3xl text-white/85 leading-relaxed animate-slide-up max-w-2xl mx-auto lg:mx-0" style={{ animationDelay: '0.2s' }}>
                  تعلم الإنجليزية مع معلمين خبراء من جميع أنحاء العالم بطريقة تفاعلية وممتعة
                </p>
              </div>
              
              {/* Enhanced Search Bar */}
              <div className="max-w-2xl mx-auto lg:mx-0 animate-scale-in" style={{ animationDelay: '0.4s' }}>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-white/10 rounded-3xl blur-sm"></div>
                  <div className="relative flex flex-col sm:flex-row gap-4 bg-white/15 backdrop-blur-xl rounded-3xl p-4 border border-white/30 shadow-hero">
                    <div className="flex-1 relative">
                      <Globe className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 w-6 h-6" />
                      <input
                        type="text"
                        placeholder="ابحث عن معلمين، تخصصات، مستويات..."
                        className="w-full px-4 py-4 pr-12 text-white placeholder-white/60 bg-transparent focus:outline-none text-lg rounded-2xl border border-white/20 focus:border-white/40 transition-all"
                      />
                    </div>
                    <Button size="lg" className="px-8 py-4 bg-white text-primary hover:bg-white/95 hover:scale-105 shadow-lg font-semibold text-lg rounded-2xl transition-all duration-300">
                      <Star className="w-5 h-5 ml-2" />
                      ابدأ البحث
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start animate-scale-in" style={{ animationDelay: '0.6s' }}>
                <Button size="lg" className="group bg-white text-primary hover:bg-white/95 hover:scale-105 shadow-hero text-xl px-10 py-5 rounded-2xl transition-all duration-300" asChild>
                  <Link to="/teachers">
                    <BookOpen className="w-6 h-6 ml-3 group-hover:rotate-12 transition-transform" />
                    ابدأ رحلتك مجاناً
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="group border-white/40 bg-white/10 text-white hover:bg-white/20 hover:scale-105 backdrop-blur-sm text-xl px-10 py-5 rounded-2xl transition-all duration-300">
                  <Play className="w-6 h-6 ml-3 group-hover:scale-110 transition-transform" />
                  شاهد الفيديو
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-white/80 animate-scale-in" style={{ animationDelay: '0.8s' }}>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-white" />
                  <span>معلمين معتمدين</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span>تقييم 4.9/5</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-white" />
                  <span>+10000 طالب</span>
                </div>
              </div>
            </div>
            
            {/* Right Content - Enhanced Stats & Hero Image */}
            <div className="space-y-8">
              {/* Enhanced Stats Grid */}
              <div className="grid grid-cols-2 gap-6 animate-scale-in" style={{ animationDelay: '0.3s' }}>
                {[
                  { number: "500+", label: "معلم خبير", icon: <Users className="w-8 h-8" /> },
                  { number: "50+", label: "دولة", icon: <Globe className="w-8 h-8" /> },
                  { number: "4.9", label: "متوسط التقييم", icon: <Star className="w-8 h-8" /> },
                  { number: "24/7", label: "دعم متواصل", icon: <MessageCircle className="w-8 h-8" /> }
                ].map((stat, index) => (
                  <div key={index} className="group bg-white/15 backdrop-blur-xl rounded-3xl p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-hero">
                    <div className="text-white/80 mb-3 flex justify-center group-hover:scale-110 transition-transform">
                      {stat.icon}
                    </div>
                    <div className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">{stat.number}</div>
                    <div className="text-white/80 text-sm font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
              
              {/* Enhanced Hero Image */}
              <div className="relative animate-float">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-white/20 to-white/10 rounded-[2rem] blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative bg-white/15 backdrop-blur-xl rounded-[2rem] p-8 border border-white/30 shadow-hero overflow-hidden">
                    <img 
                      src={heroImage} 
                      alt="English Learning" 
                      className="w-full h-80 object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Floating Badges */}
                    <div className="absolute -top-3 -right-3 bg-accent text-white px-6 py-3 rounded-full text-sm font-bold shadow-xl animate-bounce">
                      🎓 دروس مباشرة
                    </div>
                    <div className="absolute -bottom-3 -left-3 bg-primary text-white px-6 py-3 rounded-full text-sm font-bold shadow-xl animate-bounce" style={{ animationDelay: '1s' }}>
                      ⭐ تقييم 4.9
                    </div>
                    <div className="absolute top-1/2 -right-4 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs font-semibold shadow-lg animate-pulse">
                      جلسة تجريبية مجانية
                    </div>
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
