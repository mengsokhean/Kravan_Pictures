import React from 'react';
// កែប្រែ៖ ប្រើ Fa icons ពី react-icons ជំនួស lucide-react
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const translations = {
  en: {
    title: 'Meet Our Team',
    subtitle: 'Passionate filmmakers dedicated to bringing stories to life',
    roles: {
      director: 'Creative Director',
      producer: 'Executive Producer',
      cinematographer: 'Director of Photography',
      editor: 'Lead Editor',
      sound: 'Sound Designer',
      production: 'Production Manager',
      content: 'Content Creator', // បន្ថែម Role ថ្មី
      video_editor: 'Video Editor' // បន្ថែម Role ថ្មី
    }
  },
  km: {
    title: 'ជួបក្រុមរបស់យើង',
    subtitle: 'អ្នកផលិតភាពយន្តដែលមានចំណង់ចំណូលចិត្ត ឧស្សាហ៍នាំរឿងមកជីវិត',
    roles: {
      director: 'អ្នកដឹកនាំច្នៃប្រឌិត',
      producer: 'អ្នកផលិតប្រតិបត្តិ',
      cinematographer: 'អ្នកដឹកនាំថតរូប',
      editor: 'អ្នកកាត់តដឹកនាំ',
      sound: 'អ្នករចនាសំឡេង',
      production: 'អ្នកគ្រប់គ្រងផលិតកម្ម',
      content: 'អ្នកបង្កើតមាតិកា',
      video_editor: 'អ្នកកាត់តវីដេអូ'
    }
  }
};

const teamMembers = [
  {
    id: 1,
    name: 'Seng Thy',
    nameKm: 'សេង ធី',
    role: 'director',
    image: 'https://cdn.troryorng.com/wp-content/uploads/2025/04/22140714/image-126-698x1024.png',
    social: { instagram: '#', linkedin: '#', twitter: '#' }
  },
  {
    id: 2,
    name: 'Seyha',
    nameKm: 'សីហា',
    role: 'content', // កែសម្រួលឱ្យត្រូវជាមួយ key ក្នុង translations
    image: 'https://cdn2.cdnstep.com/UpriYgG5U6e2d86TVpI9/13-1.png',
    social: { instagram: '#', linkedin: '#', twitter: '#' }
  },
  {
    id: 3,
    name: 'Sok Heng',
    nameKm: 'សុខ ហេង',
    role: 'video_editor', // កែសម្រួលឱ្យត្រូវជាមួយ key ក្នុង translations
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', // បងប្តូររូបភាពសិន ព្រោះ data:image ប្អូនវែងពេកអាចបង្ក error
    social: { instagram: '#', linkedin: '#', twitter: '#' }
  },
  {
    id: 4,
    name: 'Joheng Liebert',
    nameKm: 'យ៉៉ូហេង​ លីបើត',
    role: 'editor',
    image: 'https://wallpapercave.com/wp/wp11662056.jpg',
    social: { instagram: '#', linkedin: '#', twitter: '#' }
  },
  {
    id: 5,
    name: 'David Park',
    nameKm: 'ដេវីដ ប៉ាក',
    role: 'sound',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcdA7Yr9Cz_Qgg4xUONxP5i4Yhz8TEgy9D_g&s',
    social: { instagram: '#', linkedin: '#', twitter: '#' }
  },
  {
    id: 6,
    name: 'Lisa Thompson',
    nameKm: 'លីសា តុមសុន',
    role: 'production',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpN8v-immOlOUBeQuLPCxlUMIoOB10kfO4gA&s',
    social: { instagram: '#', linkedin: '#', twitter: '#' }
  }
];

const Teams = ({ language = 'en' }) => {
  const t = translations[language];

  return (
    <div className="min-h-screen pt-24">
      {/* Header Section */}
      <div className="bg-[#0f1423] text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in">{t.title}</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto animate-slide-up">
            {t.subtitle}
          </p>
        </div>
      </div>

      {/* Team Grid Section */}
      <div className="py-20 bg-gray-50 dark:bg-dark">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className="bg-white dark:bg-dark-light rounded-2xl shadow-lg overflow-hidden group text-center animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden h-96">
                  <img
                    src={member.image}
                    alt={language === 'en' ? member.name : member.nameKm}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                    <div className="flex gap-4">
                      <a href={member.social.instagram} className="p-3 bg-white rounded-full hover:bg-yellow-500 transition-colors">
                        <FaInstagram size={20} className="text-black" />
                      </a>
                      <a href={member.social.linkedin} className="p-3 bg-white rounded-full hover:bg-yellow-500 transition-colors">
                        <FaLinkedin size={20} className="text-black" />
                      </a>
                      <a href={member.social.twitter} className="p-3 bg-white rounded-full hover:bg-yellow-500 transition-colors">
                        <FaTwitter size={20} className="text-black" />
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-yellow-500 transition-colors">
                    {language === 'en' ? member.name : member.nameKm}
                  </h3>
                  <p className="text-yellow-500 font-semibold uppercase tracking-wider text-sm">
                    {t.roles[member.role] || member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;