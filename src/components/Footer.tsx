
import { Heart, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import MawaddahLogo from './MawaddahLogo';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-mawaddah-green dark:bg-mawaddah-green-dark text-white pt-12 pb-6 islamic-pattern">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <MawaddahLogo className="mb-4" />
            <p className="mb-4 text-sm text-mawaddah-pink-light">
              Nurture Your Love, Islamically – Mawaddah for Couples
            </p>
            <div className="flex items-center text-mawaddah-pink">
              <Mail size={16} className="mr-2" />
              <a href="mailto:mail@mawaddah.com" className="text-sm hover:text-mawaddah-gold transition-colors">
                mail@mawaddah.com
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-semibold text-mawaddah-gold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-mawaddah-pink hover:text-mawaddah-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-mawaddah-pink hover:text-mawaddah-gold transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/assessment" className="text-sm text-mawaddah-pink hover:text-mawaddah-gold transition-colors">
                  Take Assessment
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-semibold text-mawaddah-gold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-sm text-mawaddah-pink hover:text-mawaddah-gold transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-mawaddah-pink hover:text-mawaddah-gold transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-mawaddah-pink hover:text-mawaddah-gold transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-semibold text-mawaddah-gold mb-4">Coming Soon</h4>
            <ul className="space-y-2">
              <li className="text-sm text-mawaddah-pink flex items-center">
                <span className="inline-block w-2 h-2 bg-mawaddah-gold rounded-full mr-2 animate-pulse"></span>
                Islamic Counseling
              </li>
              <li className="text-sm text-mawaddah-pink flex items-center">
                <span className="inline-block w-2 h-2 bg-mawaddah-gold rounded-full mr-2 animate-pulse"></span>
                Activity Tracker
              </li>
              <li className="text-sm text-mawaddah-pink flex items-center">
                <span className="inline-block w-2 h-2 bg-mawaddah-gold rounded-full mr-2 animate-pulse"></span>
                Mobile App
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-mawaddah-green-light/20 text-center text-sm text-mawaddah-pink">
          <p className="flex items-center justify-center">
            Made with <Heart size={14} className="mx-1 text-mawaddah-pink" /> by Mawaddah © {currentYear}
          </p>
          <p className="mt-2">
            "And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy." - Quran 30:21
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
