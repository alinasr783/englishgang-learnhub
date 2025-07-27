import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Target, 
  Award, 
  Globe,
  BookOpen,
  Zap,
  Heart,
  Star,
  TrendingUp,
  Shield
} from "lucide-react";

const About = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="hero-gradient py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-slide-up">
            About Us
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto animate-slide-up">
            We are a team specialized in teaching English using the latest methods and technologies
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Our Story Section */}
        <div className="text-center mb-16 animate-scale-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              EnglishGang.pro started from a simple idea: making English learning easier, more enjoyable, and effective. 
              Since our founding in 2020, we have helped thousands of students across the Arab world achieve 
              their English learning goals.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We believe that learning should be a personal and interactive experience, so we offer courses designed specifically 
              to suit your needs and level, with qualified teachers and experts in their field.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center shadow-card border-0 hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 mx-auto bg-learning-olive/10 rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-learning-olive" />
                </div>
                <CardTitle>Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  We provide the highest quality standards in education with advanced content and qualified teachers
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center shadow-card border-0 hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 mx-auto bg-learning-brown/10 rounded-full flex items-center justify-center mb-4">
                  <Zap className="w-8 h-8 text-learning-brown" />
                </div>
                <CardTitle>Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  We use the latest technologies and teaching methods to make learning more effective and enjoyable
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center shadow-card border-0 hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 mx-auto bg-learning-beige/20 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-learning-olive" />
                </div>
                <CardTitle>Trust</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  We build long-term relationships with our students based on trust and mutual respect
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="bg-card rounded-2xl shadow-card p-8 md:p-12 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Achievements in Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">5000+</div>
              <div className="text-muted-foreground">Successful Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Expert Teachers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">25+</div>
              <div className="text-muted-foreground">Specialized Courses</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="shadow-card border-0">
            <CardHeader>
              <div className="w-16 h-16 bg-learning-olive/10 rounded-full flex items-center justify-center mb-4">
                <Target className="w-8 h-8 text-learning-olive" />
              </div>
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                We strive to provide excellent English education that enables students to achieve their personal 
                and professional goals through advanced teaching methodology and a supportive and motivating learning environment.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0">
            <CardHeader>
              <div className="w-16 h-16 bg-learning-brown/10 rounded-full flex items-center justify-center mb-4">
                <Globe className="w-8 h-8 text-learning-brown" />
              </div>
              <CardTitle className="text-2xl">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                To be the leading platform for English education in the Arab world, and contribute to 
                building a generation proficient in English capable of communicating and excelling globally.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Why Choose Us */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-card rounded-xl p-6 shadow-card border-0">
              <BookOpen className="w-12 h-12 text-learning-olive mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Advanced Curriculum</h3>
              <p className="text-muted-foreground">
                Modern and advanced curricula that keep up with the latest language teaching methods
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card border-0">
              <Users className="w-12 h-12 text-learning-brown mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Expert Teachers</h3>
              <p className="text-muted-foreground">
                A team of qualified teachers with extensive experience in teaching
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card border-0">
              <TrendingUp className="w-12 h-12 text-learning-olive mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Guaranteed Results</h3>
              <p className="text-muted-foreground">
                Programs designed to ensure achieving desired results in the shortest time possible
              </p>
            </div>
          </div>
          
          <Button size="lg" className="shadow-hero">
            Start Your Journey With Us
            <Star className="mr-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;