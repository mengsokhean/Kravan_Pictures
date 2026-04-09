import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { projects } from '../data/projectsData'; // សូមប្រាកដថាអ្នកបានបង្កើត File នេះហើយ

const translations = {
  en: {
    title: 'Featured Projects',
    viewDetails: 'View Details',
    seeAll: 'See All Projects',
    min: 'min'
  },
  km: {
    title: 'គម្រោងពិសេស',
    viewDetails: 'មើលព័ត៌មាន',
    seeAll: 'មើលគម្រោងទាំងអស់',
    min: 'នាទី'
  }
};

const FeaturedProjects = ({ language = 'en' }) => {
  const t = translations[language];

  return (
    <section className="section-padding bg-gray-50 dark:bg-dark">
      <div className="container-custom">
        <h2 className="heading-lg text-center mb-16 animate-fade-in">
          {t.title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="card group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link to={`/projects/${project.id}`} className="relative overflow-hidden block cursor-pointer">
                <img
                  src={project.image}
                  alt={project.title[language]}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-white flex items-center gap-2 font-semibold group-hover:text-primary transition-colors">
                    {t.viewDetails}
                    <ArrowRight size={18} />
                  </span>
                </div>
                <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {project.category[language]}
                </div>
              </Link>
              
              <div className="p-6">
                <Link to={`/projects/${project.id}`}>
                  <h3 className="text-2xl font-bold mb-2 hover:text-primary transition-colors">
                    {project.title[language]}
                  </h3>
                </Link>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {project.description[language]}
                </p>
                <div className="flex items-center text-gray-500 dark:text-gray-500">
                  <Clock size={16} className="mr-2" />
                  <span>{project.duration} {t.min}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/projects" className="btn-primary inline-flex items-center gap-2">
            {t.seeAll}
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;