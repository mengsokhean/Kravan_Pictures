import { useState } from "react";
// ខ្ញុំបានបន្ថែម Play icon ទីនេះ
import { Clock, Filter, Play } from "lucide-react";

const translations = {
  en: {
    title: "Our Projects",
    subtitle: "Explore our portfolio of award-winning films and productions",
    all: "All",
    drama: "Drama",
    thriller: "Thriller",
    documentary: "Documentary",
    adventure: "Adventure",
    min: "min",
  },
  km: {
    title: "គម្រោងរបស់យើង",
    subtitle: "ស្វែងរកផលប័ត្ររបស់យើងនៃភាពយន្ត និងការផលិតដែលឈ្នះពានរង្វាន់",
    all: "ទាំងអស់",
    drama: "រឿងភាគ",
    thriller: "រឿងរន្ធត់", // ខ្ញុំកែពាក្យនេះពី "រំភើប" មក "រន្ធត់" ឱ្យត្រូវអត្ថន័យ Thriller
    documentary: "ឯកសារ",
    adventure: "ផ្សងព្រេង",
    min: "នាទី",
  },
};

const projectsData = [
  {
    id: 1,
    title: { en: "The Offspring", km: "អ្នកស្នងបារាមី ២០២៥" },
    description: {
      en: "Who is the real spirit medium?",
      km: "តើនរណាជាអ្នកស្នងបារមីពិតប្រាកដ?",
    },
    category: "Horror", // ចំណាំ៖ អ្នកអត់មាន Filter សម្រាប់ Horror ទេ គួរតែបន្ថែម ឬប្តូរវាទៅ Thriller
    duration: "80",
    image:
      "https://scontent.fpnh2-2.fna.fbcdn.net/v/t39.30808-6/545660716_1363843679084180_7510492935429790727_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=13d280&_nc_ohc=Ei6AjnW5ekgQ7kNvwFYjj0y&_nc_oc=AdoGbFPGle98cuL2XgvsPKsSBl0XWUDj2mlIO0qy_4O0Shhxe4h9U8pD-x1v6V-BPTI&_nc_zt=23&_nc_ht=scontent.fpnh2-2.fna&_nc_gid=8l4t3qrG7cxcE9qvWIFDPg&_nc_ss=7a389&oh=00_Af2vkhudlB5E_C3MkL8a92P472QpSuRXb16nBXXd1QnrBw&oe=69DD2E27",
    trailerUrl: "https://youtu.be/yMeWOePqmI8?si=P9Xlgqb5iods_Vzl", // បន្ថែម trailerUrl ទីនេះ
  },
  {
    id: 2,
    title: { en: "Spirit House", km: "ព្រះភូមិ" },
    description: {
      en: "A girl with the ability to see spirits during Pchum Ben festival must solve the mystery of her friend's death.",
      km: "រឿងរ៉ាវអាថ៌កំបាំងក្នុងរដូវកាលបុណ្យភ្ជុំបិណ្ឌរបស់នារីម្នាក់ដែលអាចមើលឃើញវិញ្ញាណខ្មោច។",
    },
    category: "mystery", // ចំណាំ៖ មិនមានក្នុង Filter ទេ
    duration: "77",
    image:
      "https://s3.ams.com.kh/infotainment/2024/09/461599362_122155349882263550_8880925214505170823_n.jpg",
    trailerUrl: "https://youtu.be/hyOCetB6WJ4?si=_VP9ul590U4mu50E", // បន្ថែម trailerUrl ទីនេះ
  },
  {
    id: 3,
    title: { en: "Bong Luch Sees Ghosts", km: "បងលុចឃើញខ្មោច" },
    description: {
      en: "A horror comedy about a man who unexpectedly starts seeing ghosts.",
      km: "ភាពយន្តកំប្លែងលាយឡំភាពភ័យរន្ធត់អំពីបុរសម្នាក់ដែលស្រាប់តែអាចមើលឃើញខ្មោច។",
    },
    category: "comedy", // ចំណាំ៖ មិនមានក្នុង Filter ទេ
    duration: "90",
    image:
      "https://s3.ams.com.kh/infotainment/2024/02/428617467_801420815356645_3907975043295357258_n.jpg",
    trailerUrl: "https://youtu.be/mXGbtOY2VRE?si=e9pl-IAEjSLAFMn2",
  },
  {
    id: 4,
    title: { en: "The Dancer", km: "អ្នករាំរបាំ (ភាពយន្តខ្នាតខ្លី)" },
    description: {
      en: "A heartfelt story about a soldier who sacrificed everything to protect his country.",
      km: "សាច់រឿងដ៏កម្សត់របស់ទាហានម្នាក់ដែលលះបង់គ្រប់យ៉ាងដើម្បីការពារជាតិមាតុភូមិ។",
    },
    category: "drama",
    duration: "14",
    image: "https://s3.ams.com.kh/infotainment/2025/11/Untitled-1-5.jpg",
    trailerUrl: "https://youtu.be/bjUVqxcPp50?si=Oqi8blDLfpJl5GdD",
  },
  {
    id: 5,
    title: { en: "Lets Break Up", km: "តោះបែកគ្នា" },
    description: {
      en: "A teen romantic comedy short film",
      km: "រឿងខ្លីបែបមនោសញ្ចេតនា កំប្លែង បែបយុវវ័យ",
    },
    category: "drama",
    duration: "3",
    image:
      "https://scontent.fpnh2-1.fna.fbcdn.net/v/t39.30808-6/629662222_1497610542374159_583301650254979948_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=13d280&_nc_ohc=SEtZMK9JK3EQ7kNvwGkuzm7&_nc_oc=AdqlbQjCO8JnamYVblJgeoqNMUFii9mOZHfHxz5uKXIcQTbFqyCGjwvFkBXof3FYTsY&_nc_zt=23&_nc_ht=scontent.fpnh2-1.fna&_nc_gid=DoYyY5Q9DVsE5hLmxVSHDg&_nc_ss=7a389&oh=00_Af3pEfw5goe4X24gyqZRPCOMKmPkxs44fPW-W0gD_7fWzA&oe=69DD3246",
          trailerUrl: "https://youtu.be/tj1m4zrj-WI?si=aRZm_2lgb-cJyQdc",
  },
  {
    id: 6,
    title: { en: "The Midwife", km: "ភូមិយាយម៉ប" },
    description: {
      en: "In a remote village, a traditional midwife harbors a dark, psychological secret that threatens everyone who seeks her help",
      km: "នៅក្នុងភូមិដាច់ស្រយាលមួយ យាយម៉បដែលជាឆ្មបបុរាណម្នាក់ បានលាក់ទុកនូវអាថ៌កំបាំងដ៏រន្ធត់មួយ ដែលគំរាមកំហែងដល់ជីវិតអ្នកភូមិគ្រប់គ្នាដែលទៅរកគាត់",
    },
    category: "thriller",
    duration: "95",
    image:
      "https://scontent.fpnh2-1.fna.fbcdn.net/v/t39.30808-6/593546520_1335923918572996_6828634700031801034_n.jpg?stp=dst-jpg_s1080x2048_tt6&_nc_cat=110&ccb=1-7&_nc_sid=7b2446&_nc_ohc=qgySwVmslRoQ7kNvwHFoG5N&_nc_oc=AdqufYfUk9_laHmGMPXopO4Tm-hbO4stIXvfyX-s-tTJ32DCmy1fQc3gy0cuVOPAeJo&_nc_zt=23&_nc_ht=scontent.fpnh2-1.fna&_nc_gid=xmeFlIWhKoe8hyG7CFuK6Q&_nc_ss=7a389&oh=00_Af3btWv1WR6t9FSMrz0nEx6R9BbkmhRSbWfWRnJtRTu5IA&oe=69DD0DAC",
    trailerUrl: "https://youtu.be/n3kljkqp68o?si=rBdOXoJOWxTjoWNx", // លីងរបស់យាយម៉ប
  },
];

const Projects = ({ language = "en" }) => {
  const t = translations[language];
  const [activeFilter, setActiveFilter] = useState("all");

  const categories = [
    { key: "all", label: t.all },
    { key: "drama", label: t.drama },
    { key: "thriller", label: t.thriller },
    { key: "documentary", label: t.documentary },
    { key: "adventure", label: t.adventure },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projectsData
      : projectsData.filter((project) => project.category === activeFilter);

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
                    ? "bg-primary text-white shadow-lg scale-105"
                    : "bg-white dark:bg-dark text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
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
                {/* ផ្នែករូបភាពដែលអាចចុចមើល Trailer បាន */}
                <div
                  className="relative overflow-hidden cursor-pointer group"
                  onClick={() => {
                    // ប្រសិនបើអត់មានលីង វាបង្ហាញ Alert
                    if (
                      !project.trailerUrl ||
                      project.trailerUrl.includes("បញ្ចូល_លីង")
                    ) {
                      alert("សុំទោស! វីដេអូនេះមិនទាន់មានលីងនៅឡើយទេ។");
                      return;
                    }
                    window.open(
                      project.trailerUrl,
                      "_blank",
                      "noopener,noreferrer",
                    );
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.title[language]}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* បន្ថែម Play Icon នៅចំកណ្តាលពេល Hover */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play
                      className="text-white w-16 h-16 opacity-80"
                      fill="currentColor"
                    />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title[language]}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {project.description[language]}
                  </p>
                  <div className="flex items-center text-gray-500">
                    <Clock size={16} className="mr-2" />
                    <span>
                      {project.duration} {t.min}
                    </span>
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
