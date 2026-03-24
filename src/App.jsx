import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Teams from './pages/Teams';
import Development from './pages/Development';
import Services from './pages/Services';
import Contact from './pages/Contact';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });
  
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'km' : 'en');
  };

  return (
    <Router>
      <div className={`min-h-screen font-transition ${language === 'km' ? 'font-khmer' : 'font-sans'}`}>
        <Navbar 
          theme={theme} 
          toggleTheme={toggleTheme} 
          language={language}
          toggleLanguage={toggleLanguage}
        />
        <Routes>
          <Route path="/" element={<Home language={language} />} />
          <Route path="/projects" element={<Projects language={language} />} />
          <Route path="/teams" element={<Teams language={language} />} />
          <Route path="/development" element={<Development language={language} />} />
          <Route path="/services" element={<Services language={language} />} />
          <Route path="/contact" element={<Contact language={language} />} />
        </Routes>
        <Footer language={language} />
      </div>
    </Router>
  );
}

export default App;
