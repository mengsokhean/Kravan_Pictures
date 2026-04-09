import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { projects } from '../data/projectsData'; // Import ទិន្នន័យ

const ProjectDetail = ({ language = 'en' }) => {
  const { id } = useParams(); // ចាប់យក ID ពី URL (ឧ. /projects/1)
  
  // ស្វែងរករឿងនៅក្នុង Array តាមរយៈ ID
  const project = projects.find((p) => p.id === parseInt(id));

  // ប្រសិនបើរកមិនឃើញរឿង
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold text-red-500">រកមិនឃើញគម្រោងនេះទេ / Project not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-dark">
      <div className="container-custom max-w-4xl mx-auto">
        
        {/* ប៊ូតុងត្រឡប់ក្រោយ */}
        <Link to="/" className="inline-flex items-center gap-2 text-primary mb-8 hover:underline">
          <ArrowLeft size={20} />
          {language === 'km' ? 'ត្រឡប់ក្រោយ' : 'Back to Home'}
        </Link>

        {/* ផ្នែកបង្ហាញ Video YouTube */}
        <div className="w-full aspect-video rounded-xl overflow-hidden shadow-2xl mb-8 bg-black">
          {project.youtubeId ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1`}
              title={project.title[language]}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <img src={project.image} alt="Fallback" className="w-full h-full object-cover" />
          )}
        </div>

        {/* ផ្នែកព័ត៌មានលម្អិត */}
        <div>
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
              {project.category[language]}
            </span>
            <div className="flex items-center text-gray-500">
              <Clock size={18} className="mr-1" />
              <span>{project.duration} {language === 'km' ? 'នាទី' : 'min'}</span>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 dark:text-white">
            {project.title[language]}
          </h1>
          
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {project.description[language]}
          </p>
        </div>

      </div>
    </div>
  );
};

export default ProjectDetail;