import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const translations = {
  en: {
    title: "Get In Touch",
    subtitle: "Let's create something amazing together",
    form: {
      name: "Your Name",
      email: "Email Address",
      subject: "Subject",
      message: "Message",
      send: "Send Message",
      sending: "Sending...",
      success: "Message sent successfully!",
      error: "Failed to send message. Please try again.",
    },
    info: {
      title: "Contact Information",
      email: "info Admin@kravanpictures.com",
      phone: "+855 010 771 969",
      address: "Phnom Penh, Cambodia",
      hours: "Office Hours",
      hoursValue: "Mon - Fri: 9:00 AM - 6:00 PM",
    },
  },
  km: {
    title: "ទាក់ទង",
    subtitle: "សូមបង្កើតអ្វីមួយដ៏អស្ចារ្យជាមួយគ្នា",
    form: {
      name: "ឈ្មោះរបស់អ្នក",
      email: "អ៊ីមែល",
      subject: "ប្រធានបទ",
      message: "សារ",
      send: "ផ្ញើសារ",
      sending: "កំពុងផ្ញើ...",
      success: "សារត្រូវបានផ្ញើដោយជោគជ័យ!",
      error: "បរាជ័យក្នុងការផ្ញើសារ។ សូមព្យាយាមម្តងទៀត។",
    },
    info: {
      title: "ព័ត៌មានទំនាក់ទំនង",
      email: "info Admin@kravanpictures.com",
      phone: "+៨៥៥ ១០​ ៧៧១​ ៩៦៩",
      address: "ភ្នំពេញ ប្រទេសកម្ពុជា",
      hours: "ម៉ោងការិយាល័យ",
      hoursValue: "ច័ន្ទ - សុក្រ: ៩:០០ ព្រឹក - ៦:០០ ល្ងាច",
    },
  },
};

const Contact = ({ language = "en" }) => {
  const t = translations[language];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    // ១. ដាក់លេខកូដ Bot និង Chat ID របស់ប្អូននៅទីនេះ (ជំនួសអក្សរខ្មែរចេញ)
    const BOT_TOKEN = "8565910852:AAEEHNfNuFm9kylH-LxmZfODjotVLHtmtvY";
    const CHAT_ID = "-1003630018482";

    // ២. រៀបចំទម្រង់សារដែលត្រូវលោតចូល Telegram
    const textMessage = `
📩 <b>មានសារថ្មីពីទំព័រ Contact!</b>

👤 <b>ឈ្មោះ:</b> ${formData.name}
📧 <b>Email:</b> ${formData.email}
📌 <b>ប្រធានបទ:</b> ${formData.subject}
💬 <b>សារ:</b>
${formData.message}
    `;

    try {
      // ៣. បាញ់ទិន្នន័យទៅកាន់ Telegram API ផ្ទាល់
      const response = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: textMessage,
            parse_mode: "HTML", // អនុញ្ញាតឱ្យប្រើអក្សរដិត (Bold)
          }),
        },
      );

      if (response.ok) {
        // បើជោគជ័យ បង្ហាញសារពណ៌បៃតង និងលុបអក្សរក្នុងប្រអប់ចោល
        setStatus({ type: "success", message: t.form.success });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        // បើ Telegram បដិសេធ
        setStatus({ type: "error", message: t.form.error });
      }
    } catch (error) {
      // បើដាច់អ៊ីនធឺណិត ឬ Error ផ្សេងៗ
      setStatus({ type: "error", message: "មិនអាចភ្ជាប់ទៅកាន់ប្រព័ន្ធបានទេ។" });
    } finally {
      setIsSubmitting(false);
      // លុបសារជោគជ័យ/បរាជ័យចោលវិញក្រោយ ៥ វិនាទី
      setTimeout(() => setStatus({ type: "", message: "" }), 5000);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: t.info.email,
      href: `mailto:${t.info.email}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: t.info.phone,
      href: `tel:${t.info.phone}`,
    },
    {
      icon: MapPin,
      label: "Address",
      value: t.info.address,
      href: "#",
    },
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

      {/* Contact Section */}
      <div className="section-padding bg-gray-50 dark:bg-dark">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white dark:bg-dark-light p-8 rounded-lg shadow-lg animate-slide-up">
              <h2 className="text-3xl font-bold mb-6">
                {language === "en" ? "Send us a Message" : "ផ្ញើសារមកយើង"}
              </h2>

              {status.message && (
                <div
                  className={`p-4 rounded-lg mb-6 ${
                    status.type === "success"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  }`}
                >
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold mb-2"
                  >
                    {t.form.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold mb-2"
                  >
                    {t.form.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold mb-2"
                  >
                    {t.form.subject}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold mb-2"
                  >
                    {t.form.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? t.form.sending : t.form.send}
                  <Send size={20} />
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div
              className="space-y-8 animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="bg-white dark:bg-dark-light p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-6">{t.info.title}</h2>

                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-dark transition-colors group"
                    >
                      <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                        <item.icon
                          size={24}
                          className="text-primary group-hover:text-white"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-500 dark:text-gray-400 text-sm">
                          {item.label}
                        </div>
                        <div className="text-lg group-hover:text-primary transition-colors">
                          {item.value}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-primary text-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4">{t.info.hours}</h3>
                <p className="text-lg">{t.info.hoursValue}</p>
              </div>

              {/* Map Placeholder */}
              <div className="bg-gray-300 dark:bg-gray-700 h-64 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
                  alt="Location"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
