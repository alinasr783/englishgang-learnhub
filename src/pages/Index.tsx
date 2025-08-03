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
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Find Your Perfect
              <span className="block text-primary">English Teacher</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Take personalized lessons with experienced teachers. Improve your English speaking, writing, and conversation skills at your own pace.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="flex flex-col sm:flex-row gap-4 bg-white rounded-lg p-2 shadow-lg border">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search for teachers, specializations..."
                    className="w-full px-4 py-3 text-gray-700 bg-transparent focus:outline-none"
                  />
                </div>
                <Button size="lg" className="px-8 bg-primary hover:bg-primary/90 text-white">
                  Search
                </Button>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">500+</div>
                <div className="text-gray-600 text-sm">Expert Teachers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">50+</div>
                <div className="text-gray-600 text-sm">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">4.9</div>
                <div className="text-gray-600 text-sm">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">24/7</div>
                <div className="text-gray-600 text-sm">Support</div>
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
