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
    image: 'https://scontent.fpnh2-2.fna.fbcdn.net/v/t39.30808-6/483107497_984350117093274_6319129271639617105_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=53a332&_nc_eui2=AeH8MDrFQV6Hl4srigszjzsBKSwONnXWLjkpLA42ddYuOY6YGbD6Mrz8GHtkxZzu-iJ6gMM8a4oOzKazTGrNvO8o&_nc_ohc=3PkWtrEhQmsQ7kNvwFmkEQe&_nc_oc=AdquUjklCVQ8wSgBKI8aOm39AmoiYbOx7iCsqX8wMOOy4LAev8ovboaL_ATdSimBf3M&_nc_zt=23&_nc_ht=scontent.fpnh2-2.fna&_nc_gid=qB7XKwYvF2KW8AAN61t2Yw&_nc_ss=7a32e&oh=00_Afx3D4mlnOQ7yvtZqpsTRh3Tow27U_UC6O9ofFmAeNM2lA&oe=69CAAE01',
    social: { instagram: '#', linkedin: '#', twitter: '#' }
  },
  {
    id: 3,
    name: 'Sok Heng',
    nameKm: 'សុខ ហេង',
    role: 'video_editor', // កែសម្រួលឱ្យត្រូវជាមួយ key ក្នុង translations
    image: 'https://scontent.fpnh2-3.fna.fbcdn.net/v/t39.30808-1/630488653_1583818432915109_2603350441158142021_n.jpg?stp=cp6_dst-jpg_s480x480_tt6&_nc_cat=108&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeG1OkgTRhWT8ohxHcrhTj_T2qT6G_WCdVXapPob9YJ1Ve84P6Sa56CjcGDVzng0u6zriw4thsss3WoR2WXYF-RB&_nc_ohc=4QjoleA3VvIQ7kNvwHHbfE2&_nc_oc=Adonep-KBeJVRSlr-_PciaFp8dNYIXckaSxkhqoMsZK9_dTWsG7jUE9pBpdekceNhQU&_nc_zt=24&_nc_ht=scontent.fpnh2-3.fna&_nc_gid=2oz1Pn-ZP-K448UFaAALhw&_nc_ss=7a32e&oh=00_AfzvZPmtY9QfQnSjfbuBrXTWG8sCA-j4E81uRohL5ijZWg&oe=69CABD8A', // បងប្តូររូបភាពសិន ព្រោះ data:image ប្អូនវែងពេកអាចបង្ក error
    social: { instagram: '#', linkedin: '#', twitter: '#' }
  },
  {
    id: 4,
    name: 'Joheng Liebert',
    nameKm: 'យ៉៉ូហេង​ លីបើត',
    role: 'editor',
    image: 'https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/348bc336550331340fb9c3a8f8f87218~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=14579&refresh_token=9a507cac&x-expires=1774684800&x-signature=TDeq1YfrAiGLVFlBErc7DbF7ZMc%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=my3',
    social: { instagram: '#', linkedin: '#', twitter: '#' }
  },
  {
    id: 5,
    name: 'Sey Hak',
    nameKm: 'សីហាក់',
    role: 'sound',
    image: 'https://static.vecteezy.com/system/resources/previews/046/409/821/non_2x/avatar-profile-icon-in-flat-style-male-user-profile-illustration-on-isolated-background-man-profile-sign-business-concept-vector.jpg',
    social: { instagram: '#', linkedin: '#', twitter: '#' }
  },
  {
    id: 6,
    name: 'Ly Ammara',
    nameKm: 'អមរា',
    role: 'production',
    image: 'https://img.freepik.com/premium-vector/cute-woman-avatar-profile-vector-illustration_1058532-14592.jpg?w=360',
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