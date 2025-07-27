import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <Link 
            to="/admin-login" 
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            هل أنت مدير الموقع؟
          </Link>
        </div>
        <div className="text-center text-muted-foreground text-sm mt-4">
          © 2024 منصة التعلم. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
};

export default Footer;