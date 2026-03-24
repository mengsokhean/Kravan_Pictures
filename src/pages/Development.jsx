import { Code, Smartphone, Palette, Zap } from 'lucide-react';

const translations = {
  en: {
    title: 'Development Process',
    subtitle: 'How we bring cinematic visions to reality',
    preProduction: {
      title: 'Pre-Production',
      description: 'Concept development, script writing, storyboarding, and planning every detail of the production.'
    },
    production: {
      title: 'Production',
      description: 'Filming with state-of-the-art equipment, professional crew, and meticulous attention to every shot.'
    },
    postProduction: {
      title: 'Post-Production',
      description: 'Editing, color grading, sound design, visual effects, and final delivery of the masterpiece.'
    },
    distribution: {
      title: 'Distribution',
      description: 'Marketing, film festival submissions, and getting your story in front of the right audience.'
    },
    workflow: 'Our Workflow',
    step1: 'Initial Consultation',
    step2: 'Creative Development',
    step3: 'Production Planning',
    step4: 'Filming',
    step5: 'Post-Production',
    step6: 'Final Delivery'
  },
  km: {
    title: 'ដំណើរការអភិវឌ្ឍន៍',
    subtitle: 'របៀបដែលយើងនាំចក្ខុវិស័យភាពយន្តមកជាការពិត',
    preProduction: {
      title: 'មុនផលិត',
      description: 'អភិវឌ្ឍគំនិត សរសេរស្គ្រីប ធ្វើរឿងរ៉ាវ និងរៀបចំរាល់ព័ត៌មានលម្អិតនៃការផលិត។'
    },
    production: {
      title: 'ការផលិត',
      description: 'ថតដោយប្រើឧបករណ៍ទំនើប ក្រុមការងារជំនាញ និងការយកចិត្តទុកដាក់យ៉ាងម៉ត់ចត់លើគ្រប់ការថត។'
    },
    postProduction: {
      title: 'ក្រោយផលិត',
      description: 'កាត់ត ពណ៌ រចនាសំឡេង ផលប៉ះពាល់ពីមើលឃើញ និងការដឹកជញ្ជូនចុងក្រោយនៃស្នាដៃ។'
    },
    distribution: {
      title: 'ចែកចាយ',
      description: 'ទីផ្សារ ដាក់ពិព័រណ៍ភាពយន្ត និងនាំរឿងរបស់អ្នកទៅមុខទស្សនិកជនត្រឹមត្រូវ។'
    },
    workflow: 'លំហូរការងាររបស់យើង',
    step1: 'ពិគ្រោះដំបូង',
    step2: 'អភិវឌ្ឍច្នៃប្រឌិត',
    step3: 'រៀបចំផលិតកម្ម',
    step4: 'ថត',
    step5: 'ក្រោយផលិត',
    step6: 'ដឹកជញ្ជូនចុងក្រោយ'
  }
};

const Development = ({ language = 'en' }) => {
  const t = translations[language];

  const phases = [
    {
      icon: Code,
      title: t.preProduction.title,
      description: t.preProduction.description,
      color: 'bg-blue-500'
    },
    {
      icon: Smartphone,
      title: t.production.title,
      description: t.production.description,
      color: 'bg-green-500'
    },
    {
      icon: Palette,
      title: t.postProduction.title,
      description: t.postProduction.description,
      color: 'bg-purple-500'
    },
    {
      icon: Zap,
      title: t.distribution.title,
      description: t.distribution.description,
      color: 'bg-primary'
    }
  ];

  const workflowSteps = [
    t.step1,
    t.step2,
    t.step3,
    t.step4,
    t.step5,
    t.step6
  ];

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

      {/* Phases */}
      <div className="section-padding bg-white dark:bg-dark">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {phases.map((phase, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-lg bg-gray-50 dark:bg-dark-light hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`${phase.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <phase.icon size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{phase.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Workflow Timeline */}
      <div className="section-padding bg-gray-50 dark:bg-dark-light">
        <div className="container-custom">
          <h2 className="heading-lg text-center mb-16">{t.workflow}</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary"></div>
              
              {/* Timeline items */}
              {workflowSteps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center mb-12 ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  } animate-slide-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="bg-white dark:bg-dark p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                      <h3 className="text-xl font-bold text-primary mb-2">
                        Step {index + 1}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">{step}</p>
                    </div>
                  </div>
                  
                  <div className="w-2/12 flex justify-center">
                    <div className="w-8 h-8 bg-primary rounded-full border-4 border-white dark:border-dark-light z-10"></div>
                  </div>
                  
                  <div className="w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Development;
