import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Moon, Sun, Menu, X, Languages, Radius } from 'lucide-react';
import logo from "../assets/kravan-logo.png";
const translations = {
  en: {
    home: 'Home',
    projects: 'Projects',
    teams: 'Teams',
    development: 'Development',
    services: 'Our Services',
    contact: 'Contact',
    getInTouch: 'Get In Touch'
  },
  km: {
    home: 'ទំព័រដើម',
    projects: 'គម្រោង',
    teams: 'ក្រុម',
    development: 'ការអភិវឌ្ឍ',
    services: 'សេវាកម្ម',
    contact: 'ទំនាក់ទំនង',
    getInTouch: 'ទាក់ទង'
  }
};

const Navbar = ({ theme, toggleTheme, language, toggleLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const t = translations[language];

  const navLinks = [
    { path: '/', label: t.home },
    { path: '/projects', label: t.projects },
    { path: '/teams', label: t.teams },
    { path: '/development', label: t.development },
    { path: '/services', label: t.services },
    { path: '/contact', label: t.contact },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-dark dark:bg-dark-light text-white fixed w-full top-0 z-50 shadow-lg">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
         <Link to="/" className="flex items-center space-x-2 group">
  
  {/* Logo Image */}
 <img 
  src={logo}
  alt="Kravan Pictures Logo"
  className="w-20 h-20 object-cover rounded-full"
/>

  {/* Text Logo */}
  <div className="text-2xl font-bold">
    <span className="text-primary">Kravan</span>
    <span className="text-white group-hover:text-primary transition-colors">
      {" "}Pictures
    </span>
  </div>

</Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`hover:text-primary transition-colors ${
                  isActive(link.path) ? 'text-primary font-semibold' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-lg hover:bg-gray-700 transition-all hover:scale-110"
              aria-label="Toggle Language"
            >
              <Languages size={20} />
              <span className="ml-1 text-xs">{language === 'en' ? 'EN' : 'ខ្មែរ'}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-700 transition-all hover:scale-110"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* CTA Button */}
            <Link
              to="/contact"
              className="hidden md:block btn-primary"
            >
              {t.getInTouch}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-700"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 animate-slide-down">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block py-3 hover:text-primary hover:bg-gray-700 px-4 rounded transition-colors ${
                  isActive(link.path) ? 'text-primary font-semibold bg-gray-700' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block mt-4 text-center btn-primary"
            >
              {t.getInTouch}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
