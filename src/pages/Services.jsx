import React from 'react';
import { 
  Film, 
  Video, 
  Clapperboard, 
  Camera, 
  Mic, 
  Palette, 
  CheckCircle, 
  Users,   // ប្រើជំនួស Handshake
  Info,    // ប្រើជំនួស Lightbulb
  Monitor  // ប្រើជំនួស Projector
} from 'lucide-react';

const translations = {
  en: {
    title: 'Our Services',
    subtitle: 'Comprehensive film production services tailored to your needs',
    services: [
      {
        icon: Film,
        title: 'Film Production',
        description: 'Full-scale feature film production from concept to final cut.',
        features: ['Script Development', 'Casting', 'Location Scouting', 'Full Crew']
      },
      {
        icon: Video,
        title: 'Commercial Production',
        description: 'High-impact commercials that elevate your brand.',
        features: ['Brand Strategy', 'Creative Direction', 'Multi-platform Delivery', 'Analytics']
      },
      {
        icon: Users, // កែពី Handshake មក Users
        title: 'Co-Production',
        description: 'Strategic partnerships for international and local film projects.',
        features: ['Resource Sharing', 'Grant Application', 'Joint Venture', 'Cross-border Support']
      },
      {
        icon: Info, // កែពី Lightbulb មក Info
        title: 'Film Management / IP',
        description: 'Professional advice to refine your cinematic vision and strategy.',
        features: ['Story Doctoring', 'Production Budgeting', 'Technical Planning', 'Marketing Advice']
      },
      {
        icon: Monitor, // កែពី Projector មក Monitor
        title: 'Cinema Distribution',
        description: 'Taking your advice and finished movies to the big screen.',
        features: ['Theater Booking', 'Poster Design', 'Premiere Events', 'DCP Conversion']
      },
      {
        icon: Clapperboard,
        title: 'Documentary',
        description: 'Compelling documentaries that tell meaningful stories.',
        features: ['Research', 'Interviews', 'Archival Footage', 'Distribution']
      },
      {
        icon: Camera,
        title: 'Cinematography',
        description: 'Professional cinematography with cutting-edge equipment.',
        features: ['4K/8K Capture', 'Aerial Footage', 'Steadicam', 'Lighting Design']
      },
      {
        icon: Mic,
        title: 'Sound Design',
        description: 'Immersive audio that brings your vision to life.',
        features: ['Field Recording', 'Foley', 'Mixing', 'Mastering']
      },
      {
        icon: Palette,
        title: 'Post-Production',
        description: 'Complete post-production services for polished results.',
        features: ['Editing', 'Color Grading', 'VFX', 'Final Delivery']
      }
    ]
  },
  km: {
    title: 'សេវាកម្មរបស់យើង',
    subtitle: 'សេវាកម្មផលិតភាពយន្តពេញលេញ ត្រូវបានរៀបចំតាមតម្រូវការរបស់អ្នក',
    services: [
      {
        icon: Film,
        title: 'ផលិតភាពយន្ត',
        description: 'ការផលិតភាពយន្តពេញលេញពីគំនិតដល់ការកាត់ចុងក្រោយ។',
        features: ['អភិវឌ្ឍស្គ្រីប', 'ជ្រើសតួសម្តែង', 'ស្វែងរកទីតាំង', 'ក្រុមការងារពេញលេញ']
      },
      {
        icon: Video,
        title: 'ផលិតពាណិជ្ជកម្ម',
        description: 'ពាណិជ្ជកម្មដែលមានឥទ្ធិពលខ្ពស់ដើម្បីលើកកម្ពស់ម៉ាកយីហោរបស់អ្នក។',
        features: ['យុទ្ធសាស្រ្តម៉ាក', 'ការដឹកនាំច្នៃប្រឌិត', 'ការដឹកជញ្ជូនពហុវេទិកា', 'វិភាគ']
      },
      {
        icon: Users, // កែពី Handshake មក Users
        title: 'សហផលិតកម្ម',
        description: 'ភាពជាដៃគូយុទ្ធសាស្ត្រសម្រាប់គម្រោងភាពយន្តអន្តរជាតិ និងក្នុងស្រុក។',
        features: ['ចែករំលែកធនធាន', 'ការដាក់ពាក្យសុំជំនួយ', 'ការបណ្តាក់ទុនរួមគ្នា', 'គាំទ្រឆ្លងដែន']
      },
      {
        icon: Info, // កែពី Lightbulb មក Info
        title: 'ទីប្រឹក្សាភាពយន្ត',
        description: 'ការណែនាំប្រកបដោយវិជ្ជាជីវៈដើម្បីកែលម្អចក្ខុវិស័យ និងយុទ្ធសាស្ត្ររបស់អ្នក។',
        features: ['កែសម្រួលសាច់រឿង', 'រៀបចំថវិកាផលិត', 'រៀបចំបច្ចេកទេស', 'ណែនាំទីផ្សារ']
      },
      {
        icon: Monitor, // កែពី Projector មក Monitor
        title: 'ចែកចាយទៅរោងភាពយន្ត',
        description: 'នាំយកភាពយន្តដែលបានផលិតរួចទៅកាន់អេក្រង់ធំតាមស្តង់ដារ។',
        features: ['កក់រោងភាពយន្ត', 'រចនា Poster', 'ព្រឹត្តិការណ៍សម្ពោធ', 'បំប្លែងឯកសារ DCP']
      },
      {
        icon: Clapperboard,
        title: 'ឯកសារ',
        description: 'ឯកសារទាក់ទាញដែលនិទានរឿងមានន័យ។',
        features: ['ស្រាវជ្រាវ', 'សម្ភាសន៍', 'វីដេអូបុរាណ', 'ចែកចាយ']
      },
      {
        icon: Camera,
        title: 'ថតរូបភាពយន្ត',
        description: 'ថតរូបភាពយន្តដោយមានឧបករណ៍ទំនើបៗ។',
        features: ['ថត 4K/8K', 'វីដេអូពីលើអាកាស', 'ស្តេឌីខេម', 'រចនាពន្លឺ']
      },
      {
        icon: Mic,
        title: 'រចនាសំឡេង',
        description: 'សំឡេងដែលធ្វើឱ្យចក្ខុវិស័យរបស់អ្នករស់ឡើង។',
        features: ['ថតសំឡេង', 'ហ្វូលី', 'លាយ', 'ធ្វើឱ្យល្អ']
      },
      {
        icon: Palette,
        title: 'ក្រោយផលិត',
        description: 'សេវាកម្មក្រោយផលិតពេញលេញសម្រាប់លទ្ធផលល្អបំផុត។',
        features: ['កាត់ត', 'ពណ៌', 'ផលប៉ះពាល់ពីមើលឃើញ', 'ការដឹកជញ្ជូនចុងក្រោយ']
      }
    ]
  }
};

const Services = ({ language = 'en' }) => {
  const t = translations[language];

  return (
    <div className="min-h-screen pt-24">
      <div className="bg-gradient-to-r from-dark to-dark-light text-white section-padding">
        <div className="container-custom text-center">
          <h1 className="heading-xl mb-4 animate-fade-in">{t.title}</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto animate-slide-up">
            {t.subtitle}
          </p>
        </div>
      </div>

      <div className="section-padding bg-gray-50 dark:bg-dark">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.services.map((service, index) => (
              <div
                key={index}
                className="bg-white dark:bg-dark-light p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <service.icon size={32} className="text-primary" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 min-h-[60px]">
                  {service.description}
                </p>
                
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle size={20} className="text-primary mt-1 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section-padding bg-white dark:bg-dark-light">
        <div className="container-custom text-center">
          <h2 className="heading-lg mb-6">
            {language === 'en' 
              ? 'Ready to Start Your Project?' 
              : 'តើអ្នកត្រៀមខ្លួនរួចហើយឬនៅក្នុងការចាប់ផ្តើមគម្រោងរបស់អ្នក?'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            {language === 'en'
              ? "Let's discuss how we can bring your vision to life with our comprehensive production services."
              : 'សូមពិភាក្សាពីរបៀបដែលយើងអាចនាំចក្ខុវិស័យរបស់អ្នកមកជីវិតជាមួយសេវាកម្មផលិតកម្មពេញលេញរបស់យើង។'}
          </p>
          <a href="/contact" className="btn-primary inline-block">
            {language === 'en' ? 'Get in Touch' : 'ទាក់ទង'}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Services;