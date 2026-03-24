import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const translations = {
  en: {
    title: 'Ready to Bring Your Story to Life?',
    description: "Let's collaborate to turn your vision into a compelling cinematic experience.",
    contact: 'Contact Our Team'
  },
  km: {
    title: 'តើអ្នកត្រៀមខ្លួនរួចហើយឬនៅក្នុងការធ្វើឱ្យរឿងរបស់អ្នករស់ឡើងវិញ?',
    description: 'សូមរួមគ្នាដើម្បីប្រែក្លាយចក្ខុវិស័យរបស់អ្នកទៅជាបទពិសោធន៍ភាពយន្តដ៏ទាក់ទាញ។',
    contact: 'ទាក់ទងក្រុមរបស់យើង'
  }
};

const CTA = ({ language = 'en' }) => {
  const t = translations[language];

  return (
    <section className="section-padding bg-gradient-to-r from-primary to-orange-600">
      <div className="container-custom text-center">
        <h2 className="heading-lg text-white mb-6 animate-fade-in">
          {t.title}
        </h2>
        <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8 animate-slide-up">
          {t.description}
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-white text-primary font-semibold py-4 px-10 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:shadow-2xl hover:scale-105 animate-slide-up"
        >
          {t.contact}
          <ArrowRight size={20} />
        </Link>
      </div>
    </section>
  );
};

export default CTA;
