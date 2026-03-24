import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';

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

const projects = [
  {
    id: 1,
    title: { 
      en: 'Heir to a spiritual power 2025', 
      km: 'អ្នកស្នងបារមី ២០២៥' 
    },
    description: { 
      en: 'Who is the real spirit medium?', 
      km: 'រឿងអ្នកណាជាអ្នកស្នងបារមីពិតប្រាកដ 😱😨' 
    },
    category: {
      en: 'Horror',
      km: 'រឿងរន្ធត់'
    },
    duration: '128',
    image: 'https://scontent.fpnh2-3.fna.fbcdn.net/v/t39.30808-6/536280479_759452810050761_7559085692279818308_n.jpg?stp=dst-jpg_s1080x2048_tt6&_nc_cat=108&ccb=1-7&_nc_sid=13d280&_nc_ohc=GoY39-wbhNsQ7kNvwGoC7LZ&_nc_oc=Adr2TjLmRvVVfwYjf6T_lmoXWLQ9TfamXF21pPLF2N58Mut-vUhVZdQNj4PEx5qXQLI&_nc_zt=23&_nc_ht=scontent.fpnh2-3.fna&_nc_gid=b4O4MVMwPqsix4-TPSNOrA&_nc_ss=7a30f&oh=00_AfwHquJ8GKE5b6UeSdxoLWxaLEZROqbRZ9P_txDHXF8TbQ&oe=69C7BC00'
  },
  {
    id: 2,
    title: { 
      en: 'Spirit House', 
      km: 'ព្រះភូមិ' 
    },
    description: { 
      en: 'A girl with the ability to see spirits during Pchum Ben festival must solve the mystery of her friend\'s death.', 
      km: 'រឿងរ៉ាវអាថ៌កំបាំងក្នុងរដូវកាលបុណ្យភ្ជុំបិណ្ឌរបស់នារីម្នាក់ដែលអាចមើលឃើញវិញ្ញាណខ្មោច។' 
    },
    category: {
      en: 'Mystery',
      km: 'អាថ៌កំបាំង'
    },
    duration: '95',
    image: 'https://s3.ams.com.kh/infotainment/2024/09/461599362_122155349882263550_8880925214505170823_n.jpg'
  },
  {
    id: 3,
    title: { 
      en: 'Bong Luch Sees Ghosts', 
      km: 'បងលុចឃើញខ្មោច' 
    },
    description: { 
      en: 'A horror comedy about a man who unexpectedly starts seeing ghosts.', 
      km: 'ភាពយន្តកំប្លែងលាយឡំភាពភ័យរន្ធត់អំពីបុរសម្នាក់ដែលស្រាប់តែអាចមើលឃើញខ្មោច។' 
    },
    category: {
      en: 'Comedy',
      km: 'រឿងកំប្លែង'
    },
    duration: '90',
    image: 'https://s3.ams.com.kh/infotainment/2024/02/428617467_801420815356645_3907975043295357258_n.jpg'
  }
];

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
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title[language]}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <Link
                    to={`/projects/${project.id}`}
                    className="text-white flex items-center gap-2 font-semibold hover:text-primary transition-colors"
                  >
                    {t.viewDetails}
                    <ArrowRight size={18} />
                  </Link>
                </div>
                <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {project.category[language]}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {project.title[language]}
                </h3>
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