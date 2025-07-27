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
            من نحن
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto animate-slide-up">
            نحن فريق متخصص في تعليم اللغة الإنجليزية بأحدث الطرق والتقنيات
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Our Story Section */}
        <div className="text-center mb-16 animate-scale-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">قصتنا</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              بدأت EnglishGang.pro من فكرة بسيطة: جعل تعلم اللغة الإنجليزية أسهل وأكثر متعة وفعالية. 
              منذ تأسيسنا في عام 2020، ساعدنا آلاف الطلاب في جميع أنحاء العالم العربي على تحقيق 
              أهدافهم في تعلم اللغة الإنجليزية.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              نؤمن بأن التعلم يجب أن يكون تجربة شخصية وتفاعلية، لذلك نقدم دورات مصممة خصيصاً 
              لتناسب احتياجاتك ومستواك، مع معلمين مؤهلين وخبراء في مجالهم.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">قيمنا</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center shadow-card border-0 hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 mx-auto bg-learning-olive/10 rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-learning-olive" />
                </div>
                <CardTitle>الجودة</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  نقدم أعلى معايير الجودة في التعليم مع محتوى متطور ومعلمين مؤهلين
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center shadow-card border-0 hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 mx-auto bg-learning-brown/10 rounded-full flex items-center justify-center mb-4">
                  <Zap className="w-8 h-8 text-learning-brown" />
                </div>
                <CardTitle>الابتكار</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  نستخدم أحدث التقنيات والطرق التعليمية لجعل التعلم أكثر فعالية ومتعة
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center shadow-card border-0 hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 mx-auto bg-learning-beige/20 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-learning-olive" />
                </div>
                <CardTitle>الثقة</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  نبني علاقات طويلة المدى مع طلابنا قائمة على الثقة والاحترام المتبادل
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="bg-card rounded-2xl shadow-card p-8 md:p-12 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">إنجازاتنا بالأرقام</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">5000+</div>
              <div className="text-muted-foreground">طالب نجح</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">معلم خبير</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">25+</div>
              <div className="text-muted-foreground">دورة متخصصة</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">معدل الرضا</div>
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
              <CardTitle className="text-2xl">رسالتنا</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                نسعى لتقديم تعليم متميز للغة الإنجليزية يمكن الطلاب من تحقيق أهدافهم الشخصية 
                والمهنية من خلال منهجية تعليمية متطورة وبيئة تعلم داعمة ومحفزة.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0">
            <CardHeader>
              <div className="w-16 h-16 bg-learning-brown/10 rounded-full flex items-center justify-center mb-4">
                <Globe className="w-8 h-8 text-learning-brown" />
              </div>
              <CardTitle className="text-2xl">رؤيتنا</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                أن نكون المنصة الرائدة في تعليم اللغة الإنجليزية في العالم العربي، ونساهم في 
                بناء جيل متمكن من اللغة الإنجليزية قادر على التواصل والتميز عالمياً.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Why Choose Us */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">لماذا تختارنا؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-card rounded-xl p-6 shadow-card border-0">
              <BookOpen className="w-12 h-12 text-learning-olive mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">منهج متطور</h3>
              <p className="text-muted-foreground">
                مناهج حديثة ومتطورة تواكب أحدث طرق تعليم اللغات
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card border-0">
              <Users className="w-12 h-12 text-learning-brown mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">معلمون خبراء</h3>
              <p className="text-muted-foreground">
                فريق من المعلمين المؤهلين وذوي الخبرة الطويلة في التدريس
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-card border-0">
              <TrendingUp className="w-12 h-12 text-learning-olive mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">نتائج مضمونة</h3>
              <p className="text-muted-foreground">
                برامج مصممة لضمان تحقيق النتائج المرجوة في أقصر وقت ممكن
              </p>
            </div>
          </div>
          
          <Button size="lg" className="shadow-hero">
            ابدأ رحلتك معنا
            <Star className="mr-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;