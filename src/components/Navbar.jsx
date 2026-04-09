import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Moon, Sun, Menu, X, Languages } from "lucide-react";

// កែប្រែ Path ត្រង់នេះ៖ ប្រើ ../assets/ ប្រសិនបើ Navbar.jsx នៅក្នុង src/components/

const translations = {
  en: {
    home: "Home",
    projects: "Projects",
    teams: "Teams",
    development: "Development",
    services: "Our Services",
    contact: "Contact",
    getInTouch: "Get In Touch",
  },
  km: {
    home: "ទំព័រដើម",
    projects: "គម្រោង",
    teams: "ក្រុម",
    development: "ការអភិវឌ្ឍ",
    services: "សេវាកម្ម",
    contact: "ទំនាក់ទំនង",
    getInTouch: "ទាក់ទង",
  },
};

const Navbar = ({ theme, toggleTheme, language, toggleLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const t = translations[language] || translations.en; // បន្ថែម fallback ការពារ error

  const navLinks = [
    { path: "/", label: t.home },
    { path: "/projects", label: t.projects },
    { path: "/teams", label: t.teams },
    { path: "/development", label: t.development },
    { path: "/services", label: t.services },
    { path: "/contact", label: t.contact },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-dark dark:bg-dark-light text-white fixed w-full top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img
              src="https://scontent.fpnh2-1.fna.fbcdn.net/v/t39.30808-1/643822446_1517160817085798_5282556821596933813_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=110&ccb=1-7&_nc_sid=2d3e12&_nc_eui2=AeGrjq10Zn0a9AmxbrZ3y-TdQbUQfz0LIEhBtRB_PQsgSK9_8z8tEd4mFprNyRlxrHdlFswjS2liNrJkNw4fwcH8&_nc_ohc=q7UZTpSdAYEQ7kNvwFI51Gw&_nc_oc=AdqPYuxSPomBXUpSOWvDPx_VtGlvSrKTlEv-lpmLeuzJjaMynX1stMkv-v5pNeUP3vA&_nc_zt=24&_nc_ht=scontent.fpnh2-1.fna&_nc_gid=TdgJUj0J9yAY36ukk0hFFQ&_nc_ss=7a3a8&oh=00_Af0suWVhvqbiNhcM0peeDIS368YAjhlEW4TB4NO8mlWC9Q&oe=69D90A07" /* កែត្រង់នេះ */
              alt="Kravan Pictures Logo"
              className="w-12 h-12 md:w-16 md:h-16 object-contain rounded-full border-2 border-primary/20 group-hover:border-primary transition-all"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-xl md:text-2xl font-bold text-primary">
                Kravan
              </span>
              <span className="text-sm md:text-lg font-semibold text-white group-hover:text-primary transition-colors">
                Pictures
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`hover:text-primary transition-colors text-sm uppercase tracking-wider ${
                  isActive(link.path)
                    ? "text-primary font-bold"
                    : "text-gray-300"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions: Language, Theme, CTA */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center p-2 rounded-lg hover:bg-gray-800 transition-all"
              title="Change Language"
            >
              <Languages size={20} className="text-primary" />
              <span className="ml-2 text-xs font-medium uppercase">
                {language === "en" ? "EN" : "KM"}
              </span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-800 transition-all text-yellow-400"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* CTA Button */}
            <Link
              to="/contact"
              className="hidden md:block bg-primary hover:bg-primary-dark text-dark px-5 py-2 rounded-full font-bold transition-all transform hover:scale-105"
            >
              {t.getInTouch}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-800"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {isOpen && (
          <div className="lg:hidden py-6 border-t border-gray-700 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block py-4 px-4 rounded-xl transition-all ${
                    isActive(link.path)
                      ? "bg-primary text-dark font-bold"
                      : "hover:bg-gray-800 text-gray-300"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="mt-4 w-full py-4 bg-primary text-dark text-center rounded-xl font-bold"
              >
                {t.getInTouch}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
