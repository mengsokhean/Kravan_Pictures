import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

const translations = {
  en: {
    title: 'Kravan Pictures',
    subtitle: 'Award-winning film production studio dedicated to creating dramatic experiences that inspire and captivate audiences worldwide.',
    watchShowreel: 'Watch Showreel',
    viewProjects: 'View Projects'
  },
  km: {
    title: 'ក្រវ៉ាន់ ភីកឆើរ',
    subtitle: 'ស្ទូឌីយោផលិតភាពយន្តដែលឈ្នះពានរង្វាន់ ឧស្សាហ៍ប្តេជ្ញាបង្កើតបទពិសោធន៍ដ៏ទាក់ទាញ ដែលបំផុសគំនិត និងទាក់ទាញទស្សនិកជនទូទាំងពិភពលោក។',
    watchShowreel: 'មើលវីដេអូ',
    viewProjects: 'មើលគម្រោង'
  }
};

const Hero = ({ language = 'en' }) => {
  const t = translations[language];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-dark via-dark-light to-gray-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920&q=80"
          alt="Film Production"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center px-4 py-32 mt-20">
        <h1 className="heading-xl text-white animate-fade-in">
          {t.title}
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 animate-slide-up">
          {t.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up">
          <button className="btn-primary flex items-center gap-2 group">
            <Play size={20} className="group-hover:scale-110 transition-transform" />
            {t.watchShowreel}
          </button>
          <Link to="/projects" className="btn-secondary">
            {t.viewProjects}
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
