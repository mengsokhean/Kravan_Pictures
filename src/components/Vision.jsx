import { Link } from 'react-router-dom';
import { Film, Users, Award } from 'lucide-react';

const translations = {
  en: {
    title: 'Our Vision',
    description: 'We believe in the transformative power of storytelling. Our mission is to create films that not only entertain but also provoke thought and inspire change.',
    passion: 'With a team of passionate filmmakers, cutting-edge technology, and a commitment to artistic excellence, we push the boundaries of cinematic storytelling.',
    learnMore: 'Our Values',
    stats: {
      projects: 'Projects Completed',
      team: 'Team Members',
      awards: 'Awards Won'
    }
  },
  km: {
    title: 'ចក្ខុវិស័យរបស់យើង',
    description: 'យើងជឿលើថាមពលបំលែងនៃការនិទានរឿង។ បេសកកម្មរបស់យើងគឺបង្កើតភាពយន្តដែលមិនត្រឹមតែកម្សាន្តប៉ុណ្ណោះទេ ប៉ុន្តែថែមទាំងជំរុញការគិត និងបំផុសគំនិតផ្លាស់ប្តូរ។',
    passion: 'ជាមួយនឹងក្រុមអ្នកផលិតភាពយន្តដែលមានចំណង់ចំណូលចិត្ត បច្ចេកវិទ្យាទំនើប និងការប្តេជ្ញាចិត្តចំពោះឧត្តមភាពសិល្បៈ យើងរុញច្រានព្រំដែននៃការនិទានរឿងភាពយន្ត។',
    learnMore: 'តម្លៃរបស់យើង',
    stats: {
      projects: 'គម្រោងបានបញ្ចប់',
      team: 'សមាជិកក្រុម',
      awards: 'រង្វាន់បានឈ្នះ'
    }
  }
};

const Vision = ({ language = 'en' }) => {
  const t = translations[language];

  const stats = [
    { icon: Film, value: '2+', label: t.stats.projects },
    { icon: Users, value: '5+', label: t.stats.team },
    { icon: Award, value: '2+', label: t.stats.awards }
  ];

  return (
    <section className="section-padding bg-white dark:bg-dark-light">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-fade-in">
            <h2 className="heading-lg mb-6">{t.title}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {t.description}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {t.passion}
            </p>
            <Link to="/teams" className="btn-primary">
              {t.learnMore}
            </Link>
          </div>

          {/* Images Grid */}
          <div className="grid grid-cols-2 gap-4 animate-slide-up">
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80"
                alt="Filming scene"
                className="rounded-lg shadow-lg hover:shadow-2xl transition-shadow w-full h-48 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80"
                alt="Production team"
                className="rounded-lg shadow-lg hover:shadow-2xl transition-shadow w-full h-64 object-cover"
              />
            </div>
            <div className="space-y-4 mt-8">
              <img
                src="https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=600&q=80"
                alt="Camera equipment"
                className="rounded-lg shadow-lg hover:shadow-2xl transition-shadow w-full h-64 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1579965342575-16428a0a8e27?w=600&q=80"
                alt="Director at work"
                className="rounded-lg shadow-lg hover:shadow-2xl transition-shadow w-full h-48 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 bg-gray-50 dark:bg-dark rounded-lg hover:bg-primary hover:text-white transition-all duration-300 group"
            >
              <stat.icon className="w-12 h-12 mx-auto mb-4 text-primary group-hover:text-white" />
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-gray-600 dark:text-gray-400 group-hover:text-white">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Vision;
