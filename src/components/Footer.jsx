import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send } from 'lucide-react'; // Import ពួក Contact Icons
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa'; // Import ពួក Social Icons

const translations = {
  en: {
    company: 'Company',
    about: 'About Us',
    projects: 'Projects',
    teams: 'Teams',
    careers: 'Careers',
    services: 'Services',
    filmProduction: 'Film Production',
    postProduction: 'Post-Production',
    directing: 'Directing',
    cinematography: 'Cinematography',
    contact: 'Contact',
    email: 'info@kravanpictures.com',
    phone: '+855 10 771 969',
    address: 'Phnom Penh, Cambodia',
    rights: 'All rights reserved.',
    tagline: 'Creating stories that inspire'
  },
  km: {
    company: 'ក្រុមហ៊ុន',
    about: 'អំពីយើង',
    projects: 'គម្រោង',
    teams: 'ក្រុម',
    careers: 'ការងារ',
    services: 'សេវាកម្ម',
    filmProduction: 'ផលិតភាពយន្ត',
    postProduction: 'ក្រោយផលិត',
    directing: 'អ្នកដឹកនាំ',
    cinematography: 'ថតរូបភាពយន្ត',
    contact: 'ទំនាក់ទំនង',
    email: 'info@kravanpictures.com',
    phone: '+៨៥៥ ១០​​ ៧៧១ ៩៦៩',
    address: 'ភ្នំពេញ ប្រទេសកម្ពុជា',
    rights: 'រក្សាសិទ្ធិទាំងអស់។',
    tagline: 'បង្កើតរឿងដែលបំផុសគំនិត'
  }
};

const Footer = ({ language = 'en' }) => {
  const t = translations[language];
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { label: t.about, path: '/teams' },
    { label: t.projects, path: '/projects' },
    { label: t.teams, path: '/teams' },
    { label: t.careers, path: '/contact' }
  ];

  const serviceLinks = [
    { label: t.filmProduction, path: '/services' },
    { label: t.postProduction, path: '/services' },
    { label: t.directing, path: '/services' },
    { label: t.cinematography, path: '/services' }
  ];

  const socialLinks = [
    { icon: FaInstagram, url: 'https://instagram.com', label: 'Instagram' },
    { icon: FaYoutube, url: 'https://youtube.com/@kravanpictures?si=hgETpEdDsqb-msaa', label: 'YouTube' },
    { icon: Send, url: 'https://t.me/sengthykh', label: 'Telegram' },
    { icon: FaFacebook, url: 'https://www.facebook.com/share/1L9s8oZ1n5/?mibextid=wwXIfr', label: 'Facebook' }
  ];

  return (
    <footer className="bg-[#0f1423] text-gray-300">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              <span className="text-yellow-500">Kravan</span> Pictures
            </h3>
            <p className="text-gray-400 mb-6">
              {t.tagline}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 rounded-lg hover:bg-yellow-500 hover:text-black transition-all hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">{t.company}</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="hover:text-yellow-500 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">{t.services}</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="hover:text-yellow-500 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">{t.contact}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={20} className="text-yellow-500 mt-1 flex-shrink-0" />
                <a href={`mailto:${t.email}`} className="hover:text-yellow-500 transition-colors">
                  {t.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={20} className="text-yellow-500 mt-1 flex-shrink-0" />
                <a href={`tel:${t.phone}`} className="hover:text-yellow-500 transition-colors">
                  {t.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-yellow-500 mt-1 flex-shrink-0" />
                <span>{t.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} Kravan Pictures. {t.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;