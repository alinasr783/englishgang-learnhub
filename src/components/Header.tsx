import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X, BookOpen, Users, Calendar, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const Header = ({ isDark, toggleTheme }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border shadow-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 hero-gradient rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">englishgang.pro</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors duration-200">
              الرئيسية
            </Link>
            <Link to="/teachers" className="text-foreground hover:text-primary transition-colors duration-200">
              المعلمين
            </Link>
            <Link to="/courses" className="text-foreground hover:text-primary transition-colors duration-200">
              الدورات
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors duration-200">
              من نحن
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors duration-200">
              تواصل معنا
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover:bg-secondary"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Button variant="outline" asChild>
              <Link to="/auth" className="flex items-center space-x-2">
                <LogIn className="w-4 h-4" />
                <span>تسجيل الدخول</span>
              </Link>
            </Button>
            <Button asChild className="shadow-card">
              <Link to="/booking">احجز الآن</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-card border-t border-border animate-slide-up">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 text-foreground hover:bg-secondary rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                الرئيسية
              </Link>
              <Link
                to="/teachers"
                className="block px-3 py-2 text-foreground hover:bg-secondary rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                المعلمين
              </Link>
              <Link
                to="/courses"
                className="block px-3 py-2 text-foreground hover:bg-secondary rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                الدورات
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-foreground hover:bg-secondary rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                من نحن
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-foreground hover:bg-secondary rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                تواصل معنا
              </Link>
              <div className="flex items-center justify-between px-3 py-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="hover:bg-secondary"
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </Button>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/auth">تسجيل الدخول</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link to="/booking">احجز الآن</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;