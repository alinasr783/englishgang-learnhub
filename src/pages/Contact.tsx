import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  MessageCircle,
  Headphones,
  Globe,
  Instagram,
  Twitter,
  Facebook,
  Youtube
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="hero-gradient py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-slide-up">
            تواصل معنا
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto animate-slide-up">
            نحن هنا للإجابة على جميع استفساراتك ومساعدتك في رحلتك التعليمية
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <MessageCircle className="w-6 h-6 text-primary" />
                  أرسل لنا رسالة
                </CardTitle>
                <CardDescription>
                  املأ النموذج وسنتواصل معك في أقرب وقت ممكن
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">الاسم الكامل</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="أدخل اسمك الكامل"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">الموضوع</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="موضوع رسالتك"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">الرسالة</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="اكتب رسالتك هنا..."
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full">
                    إرسال الرسالة
                    <Send className="mr-2 w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Details */}
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="text-xl">معلومات التواصل</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-learning-olive/10 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-learning-olive" />
                  </div>
                  <div>
                    <p className="font-medium">البريد الإلكتروني</p>
                    <p className="text-sm text-muted-foreground">info@englishgang.pro</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-learning-brown/10 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-learning-brown" />
                  </div>
                  <div>
                    <p className="font-medium">الهاتف</p>
                    <p className="text-sm text-muted-foreground">+966 50 123 4567</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-learning-beige/20 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-learning-olive" />
                  </div>
                  <div>
                    <p className="font-medium">العنوان</p>
                    <p className="text-sm text-muted-foreground">الرياض، المملكة العربية السعودية</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Working Hours */}
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  ساعات العمل
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>الأحد - الخميس</span>
                  <Badge variant="secondary">9:00 - 21:00</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>الجمعة</span>
                  <Badge variant="secondary">14:00 - 18:00</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>السبت</span>
                  <Badge variant="outline">مغلق</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Support Options */}
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="text-xl">طرق الدعم</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Headphones className="mr-2 w-4 h-4" />
                  الدعم المباشر
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="mr-2 w-4 h-4" />
                  الدردشة المباشرة
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Globe className="mr-2 w-4 h-4" />
                  مركز المساعدة
                </Button>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="text-xl">تابعنا</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Instagram className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Facebook className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Youtube className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">الأسئلة الشائعة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="text-lg">كيف يمكنني التسجيل في دورة؟</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  يمكنك التسجيل في أي دورة عبر تصفح صفحة الدورات واختيار الدورة المناسبة لك، 
                  ثم النقر على زر "التسجيل في الدورة".
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="text-lg">هل تقدمون شهادات معتمدة؟</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  نعم، نقدم شهادات معتمدة عند إتمام الدورات بنجاح وتحقيق المعايير المطلوبة.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="text-lg">ما هي طرق الدفع المتاحة؟</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  نقبل الدفع عبر البطاقات الائتمانية، التحويل البنكي، ومحافظ الدفع الإلكترونية.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="text-lg">هل يمكنني استرداد المبلغ؟</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  نعم، لدينا سياسة استرداد لمدة 14 يوم من تاريخ التسجيل إذا لم تكن راضياً عن الدورة.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;