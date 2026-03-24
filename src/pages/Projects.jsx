import { useState } from 'react';
import { Clock, Filter } from 'lucide-react';

const translations = {
  en: {
    title: 'Our Projects',
    subtitle: 'Explore our portfolio of award-winning films and productions',
    all: 'All',
    drama: 'Drama',
    thriller: 'Thriller',
    documentary: 'Documentary',
    adventure: 'Adventure',
    min: 'min'
  },
  km: {
    title: 'គម្រោងរបស់យើង',
    subtitle: 'ស្វែងរកផលប័ត្ររបស់យើងនៃភាពយន្ត និងការផលិតដែលឈ្នះពានរង្វាន់',
    all: 'ទាំងអស់',
    drama: 'រឿងភាគ',
    thriller: 'រឿងរំភើប',
    documentary: 'ឯកសារ',
    adventure: 'ផ្សងព្រេង',
    min: 'នាទី'
  }
};

const projectsData = [
  {
    id: 1,
    title: { en: 'Heir to a spiritual power 2025', km: 'អ្នកស្នងបារាមី ២០២៥' },
    description: { en: 'Who is the real spirit medium?', km: 'រឿអ្នកណាជាអ្នកស្នងបារមីពិតប្រាកដ 😱😨' },
    category: 'Horror',
    duration: '128',
    image: 'https://scontent.fpnh2-3.fna.fbcdn.net/v/t39.30808-6/536280479_759452810050761_7559085692279818308_n.jpg?stp=dst-jpg_s1080x2048_tt6&_nc_cat=108&ccb=1-7&_nc_sid=13d280&_nc_ohc=GoY39-wbhNsQ7kNvwGoC7LZ&_nc_oc=Adr2TjLmRvVVfwYjf6T_lmoXWLQ9TfamXF21pPLF2N58Mut-vUhVZdQNj4PEx5qXQLI&_nc_zt=23&_nc_ht=scontent.fpnh2-3.fna&_nc_gid=b4O4MVMwPqsix4-TPSNOrA&_nc_ss=7a30f&oh=00_AfwHquJ8GKE5b6UeSdxoLWxaLEZROqbRZ9P_txDHXF8TbQ&oe=69C7BC00'
  },
  {
    id: 2,
    title: { en: 'Spirit House', km: 'ព្រះភូមិ' },
    description: { en: 'A girl with the ability to see spirits during Pchum Ben festival must solve the mystery of her friend\'s death.', km: 'រឿងរ៉ាវអាថ៌កំបាំងក្នុងរដូវកាលបុណ្យភ្ជុំបិណ្ឌរបស់នារីម្នាក់ដែលអាចមើលឃើញវិញ្ញាណខ្មោច។' },
    category: 'mystery',
    duration: '95',
    image: 'https://s3.ams.com.kh/infotainment/2024/09/461599362_122155349882263550_8880925214505170823_n.jpg'
  },
  {
   id: 3,
    title: { en: 'Bong Luch Sees Ghosts', km: 'បងលុចឃើញខ្មោច' },
    description: { en: 'A horror comedy about a man who unexpectedly starts seeing ghosts.', km: 'ភាពយន្តកំប្លែងលាយឡំភាពភ័យរន្ធត់អំពីបុរសម្នាក់ដែលស្រាប់តែអាចមើលឃើញខ្មោច។' },
    category: 'comedy',
    duration: '90',
    image: 'https://s3.ams.com.kh/infotainment/2024/02/428617467_801420815356645_3907975043295357258_n.jpg'
  },
  {
    id: 4,
    title: { en: 'The Dancer', km: 'អ្នករាំរបាំ (ភាពយន្តខ្នាតខ្លី)' },
    description: { en: 'A heartfelt story about a soldier who sacrificed everything to protect his country.', km: 'សាច់រឿងដ៏កម្សត់របស់ទាហានម្នាក់ដែលលះបង់គ្រប់យ៉ាងដើម្បីការពារជាតិមាតុភូមិ។' },
    category: 'drama',
    duration: '14',
    image: 'https://s3.ams.com.kh/infotainment/2025/11/Untitled-1-5.jpg'
  },
  {
    id: 5,
    title: { en: 'Lets Break Up', km: 'តោះ​បែកគ្នា' },
    description: { en: 'A teen romantic comedy short film', km: 'រឿងខ្លីបែបមនោសញ្ចេតនា កំប្លែង បែបយុវវ័យ ' },
    category: 'drama',
    duration: '118',
    image: 'https://scontent.fpnh2-1.fna.fbcdn.net/v/t39.30808-6/629662222_1497610542374159_583301650254979948_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeHYP8Bd1963lkrf2-wtqWTqJPw4-VD3XMck_Dj5UPdcx3TFN5mMQFVT4i3GjPWy6vDs0b9PGonbeZc6-PThfN3k&_nc_ohc=WD0ANinqNqsQ7kNvwHAxgRp&_nc_oc=AdrxUCNh2rN3KvjDYDDz4ZZkWuidF_H9fnJhJCVaQi511kAdsNCZ3VWfsc5PtyI8CFU&_nc_zt=23&_nc_ht=scontent.fpnh2-1.fna&_nc_gid=BmCKv2rIxh2wsXh6nozJig&_nc_ss=7a32e&oh=00_AfxWJw3mn08n0sSNkBHUYtrboW2LODTayt13rwbIQVrWhw&oe=69C7E206'
  },
  {
    id: 6,
    title: { en: 'Night Runner', km: 'អ្នករត់យប់' },
    description: { en: 'Psychological thriller', km: 'រឿងរំភើបចិត្តសាស្រ្ត' },
    category: 'thriller',
    duration: '103',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80'
  }
];

const Projects = ({ language = 'en' }) => {
  const t = translations[language];
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = [
    { key: 'all', label: t.all },
    { key: 'drama', label: t.drama },
    { key: 'thriller', label: t.thriller },
    { key: 'documentary', label: t.documentary },
    { key: 'adventure', label: t.adventure }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category === activeFilter);

  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-dark to-dark-light text-white section-padding">
        <div className="container-custom text-center">
          <h1 className="heading-xl mb-4 animate-fade-in">{t.title}</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto animate-slide-up">
            {t.subtitle}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="section-padding bg-gray-50 dark:bg-dark-light">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Filter className="text-primary" size={24} />
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setActiveFilter(category.key)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  activeFilter === category.key
                    ? 'bg-primary text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-dark text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="card animate-slide-up group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title[language]}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title[language]}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {project.description[language]}
                  </p>
                  <div className="flex items-center text-gray-500">
                    <Clock size={16} className="mr-2" />
                    <span>{project.duration} {t.min}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
