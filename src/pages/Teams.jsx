import { Instagram, Linkedin, Twitter } from 'lucide-react';

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
      production: 'Production Manager'
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
      production: 'អ្នកគ្រប់គ្រងផលិតកម្ម'
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
    social: {
      instagram: '#',
      linkedin: '#',
      twitter: '#'
    }
  },
  {
    id: 2,
    name: 'Seyha',
    nameKm: 'សីហា',
    role: 'Content',
    image: 'https://cdn2.cdnstep.com/UpriYgG5U6e2d86TVpI9/13-1.png',
       social: {
      instagram: '#',
      linkedin: '#',
      twitter: '#'
    }
  },
  {
    id: 3,
    name: 'Sok Heng',
    nameKm: 'សុខ ហេង',
    role: 'Video Editer',
    image: 'data:image/jpeg;base64,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',
    social: {
      instagram: '#',
      linkedin: '#',
      twitter: '#'
    }
  },
  {
    id: 4,
    name: 'Joheng Liebert',
    nameKm: 'យ៉៉ូហេង​ លីបើត',
    role: 'editor',
    image: 'https://wallpapercave.com/wp/wp11662056.jpg',
    social: {
      instagram: '#',
      linkedin: '#',
      twitter: '#'
    }
  },
  {
    id: 5,
    name: 'David Park',
    nameKm: 'ដេវីដ ប៉ាក',
    role: 'sound',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcdA7Yr9Cz_Qgg4xUONxP5i4Yhz8TEgy9D_g&s',
    social: {
      instagram: '#',
      linkedin: '#',
      twitter: '#'
    }
  },
  {
    id: 6,
    name: 'Lisa Thompson',
    nameKm: 'លីសា តុមសុន',
    role: 'production',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpN8v-immOlOUBeQuLPCxlUMIoOB10kfO4gA&s',
    social: {
      instagram: '#',
      linkedin: '#',
      twitter: '#'
    }
  }
];

const Teams = ({ language = 'en' }) => {
  const t = translations[language];

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

      {/* Team Grid */}
      <div className="section-padding bg-gray-50 dark:bg-dark">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className="card group text-center animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={language === 'en' ? member.name : member.nameKm}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                    <div className="flex gap-4">
                      <a
                        href={member.social.instagram}
                        className="p-2 bg-white rounded-full hover:bg-primary transition-colors"
                        aria-label="Instagram"
                      >
                        <Instagram size={20} className="text-dark" />
                      </a>
                      <a
                        href={member.social.linkedin}
                        className="p-2 bg-white rounded-full hover:bg-primary transition-colors"
                        aria-label="LinkedIn"
                      >
                        <Linkedin size={20} className="text-dark" />
                      </a>
                      <a
                        href={member.social.twitter}
                        className="p-2 bg-white rounded-full hover:bg-primary transition-colors"
                        aria-label="Twitter"
                      >
                        <Twitter size={20} className="text-dark" />
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {language === 'en' ? member.name : member.nameKm}
                  </h3>
                  <p className="text-primary font-semibold">
                    {t.roles[member.role]}
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
