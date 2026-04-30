import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
// បន្ថែមការ Import ProjectDetail នៅទីនេះ
import ProjectDetail from './pages/ProjectDetail'; 
import Teams from './pages/Teams';
import Development from './pages/Development';
import Services from './pages/Services';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';

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
      <div className={`min-h-screen font-transition ${language === 'km' ? 'font-khmer' : 'font-sans'} bg-white dark:bg-dark text-gray-900 dark:text-white`}>
        <Navbar 
          theme={theme} 
          toggleTheme={toggleTheme} 
          language={language}
          toggleLanguage={toggleLanguage}
        />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home language={language} />} />
            <Route path="/projects" element={<Projects language={language} />} />
            
            {/* នេះគឺជា Route ថ្មីសម្រាប់ទំព័រលម្អិតរបស់គម្រោងនីមួយៗ */}
           <Route path="/projects/:slug" element={<ProjectDetail language={language} />} />
            
            <Route path="/teams" element={<Teams language={language} />} />
            <Route path="/development" element={<Development language={language} />} />
            <Route path="/services" element={<Services language={language} />} />
            <Route path="/contact" element={<Contact language={language} />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer language={language} />
      </div>
    </Router>
  );
}

export default App;