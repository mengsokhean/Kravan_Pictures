import { useState } from "react";
import { Mail, Phone, MapPin, Send, Bell, X, CheckCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

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
    subscribe: {
      btn: "Subscribe to Newsletter",
      modalTitle: "Subscribe to Newsletter",
      modalSubtitle: "Sign in with Google to receive our latest news & updates",
      googleBtn: "Continue with Google",
      successTitle: "You're Subscribed! 🎉",
      successMsg: "A welcome email has been sent to your inbox!",
      close: "Close",
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
    subscribe: {
      btn: "ជាវព្រឹត្តិប័ត្រព័ត៌មាន",
      modalTitle: "ជាវព្រឹត្តិប័ត្រព័ត៌មាន",
      modalSubtitle: "ចូលជាមួយ Google ដើម្បីទទួលព័ត៌មានថ្មីៗ",
      googleBtn: "បន្តជាមួយ Google",
      successTitle: "អ្នកបានជាវដោយជោគជ័យ! 🎉",
      successMsg: "Email ស្វាគមន៍ត្រូវបានផ្ញើទៅ inbox របស់អ្នក!",
      close: "បិទ",
    },
  },
};

// ════════════════════════════════════════════════════
//  ✅ CONFIG — IDs ពិតរបស់ប្អូន
// ════════════════════════════════════════════════════
const EMAILJS_SERVICE_ID  = "service_be99cvs";
const EMAILJS_TEMPLATE_ID = "template_ns867xb";
const EMAILJS_PUBLIC_KEY  = "-d4dyvZKieiPqtkCZ";
const GOOGLE_CLIENT_ID    = "429685375233-be11lrjdf1hf3tog4ls34nqb9qp56lol.apps.googleusercontent.com";
const BOT_TOKEN           = "8565910852:AAEEHNfNuFm9kylH-LxmZfODjotVLHtmtvY";
const CHAT_ID             = "-1003630018482";
// ════════════════════════════════════════════════════

// ─── Telegram admin notification ────────────────────
const sendTelegram = async (text) => {
  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: "HTML" }),
    });
  } catch (e) {
    console.warn("Telegram error:", e);
  }
};

// ─── EmailJS welcome email to subscriber ────────────
const sendWelcomeEmail = (toName, toEmail) =>
  emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    {
      // ✅ ផ្ញើ variables ទាំងអស់ ដើម្បីឱ្យ template ណាក៏ match
      to_name:   toName,
      to_email:  toEmail,
      email:     toEmail,
      name:      toName,
      from_name: "Kravan Pictures",
      reply_to:  "lionelheng799@gmail.com",
      message:   `Welcome ${toName}! You have successfully subscribed to Kravan Pictures Newsletter. We will keep you updated with our latest projects and news.`,
    },
    EMAILJS_PUBLIC_KEY
  );

// ─── Google OAuth popup ──────────────────────────────
const signInWithGoogle = () =>
  new Promise((resolve, reject) => {
    const url =
      `https://accounts.google.com/o/oauth2/v2/auth` +
      `?client_id=${GOOGLE_CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(window.location.origin)}` +
      `&response_type=token` +
      `&scope=${encodeURIComponent("openid email profile")}`;

    const popup = window.open(url, "googleLogin", "width=500,height=600");

    const timer = setInterval(() => {
      try {
        if (!popup || popup.closed) {
          clearInterval(timer);
          reject(new Error("Popup closed"));
          return;
        }
        const hash = popup.location.hash;
        if (hash && hash.includes("access_token")) {
          clearInterval(timer);
          popup.close();
          const token = new URLSearchParams(hash.substring(1)).get("access_token");
          fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: `Bearer ${token}` },
          })
            .then((r) => r.json())
            .then(resolve)
            .catch(reject);
        }
      } catch (_) {
        /* cross-origin polling — ignore */
      }
    }, 500);
  });

// ─── Avatar with fallback initials ──────────────────
const AvatarWithFallback = ({ user }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const initials = user.name?.charAt(0).toUpperCase() || "?";

  if (!user.picture || imgFailed) {
    return (
      <div
        className="w-10 h-10 rounded-full border-2 border-orange-300 flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
        style={{ background: "linear-gradient(135deg,#f97316,#ea580c)" }}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={user.picture}
      alt="avatar"
      referrerPolicy="no-referrer"
      crossOrigin="anonymous"
      onError={() => setImgFailed(true)}
      className="w-10 h-10 rounded-full border-2 border-orange-300 object-cover flex-shrink-0"
    />
  );
};

// ─── Subscribe Modal ─────────────────────────────────
const SubscribeModal = ({ onClose, language }) => {
  const t = translations[language].subscribe;
  const [step, setStep]           = useState("idle");
  const [userInfo, setUserInfo]   = useState(null);
  const [emailSent, setEmailSent] = useState(false);

  const handleGoogleSignIn = async () => {
    setStep("loading");
    try {
      const info = await signInWithGoogle();
      setUserInfo(info);

      // 1️⃣ Telegram notification to admin
      await sendTelegram(
        `🎉 <b>មានអ្នកជាវព្រឹត្តិប័ត្រព័ត៌មានថ្មី!</b>\n\n` +
        `👤 <b>ឈ្មោះ:</b> ${info.name}\n` +
        `📧 <b>Email:</b> ${info.email}\n` +
        `🆔 <b>Google ID:</b> ${info.sub}\n` +
        `📅 <b>ថ្ងៃជាវ:</b> ${new Date().toLocaleString("km-KH")}\n\n` +
        `📨 Welcome email ត្រូវបានផ្ញើទៅ subscriber ស្វ័យប្រវត្តិ។`
      );

      // 2️⃣ Welcome email to subscriber
      try {
        const result = await sendWelcomeEmail(info.name, info.email);
        console.log("✅ EmailJS success:", result);
        setEmailSent(true);
      } catch (emailErr) {
        console.error("❌ EmailJS error details:", JSON.stringify(emailErr));
        setEmailSent(false);
      }

      setStep("success");
    } catch (err) {
      console.error(err);
      setStep("error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
        {/* Orange top bar */}
        <div className="h-2 bg-gradient-to-r from-orange-400 to-orange-600" />

        {/* Close btn */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          {step !== "success" ? (
            <>
              {/* Bell icon */}
              <div className="flex justify-center mb-4">
                <div className="bg-orange-100 p-4 rounded-full">
                  <Bell size={32} className="text-orange-500" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-center mb-2">{t.modalTitle}</h2>
              <p className="text-gray-500 dark:text-gray-400 text-center text-sm mb-6">
                {t.modalSubtitle}
              </p>

              {/* What you'll receive */}
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 mb-6 space-y-1">
                <p className="text-sm font-semibold text-orange-600 mb-2">
                  {language === "en" ? "✉️ You will receive:" : "✉️ អ្នកនឹងទទួល:"}
                </p>
                {[
                  language === "en" ? "📧 Instant welcome email to your inbox" : "📧 Email ស្វាគមន៍ភ្លាម",
                  language === "en" ? "🎬 Latest projects & news"              : "🎬 គម្រោង & ព័ត៌មានថ្មីៗ",
                  language === "en" ? "🎁 Exclusive offers & updates"          : "🎁 ការផ្តល់ជូនពិសេស",
                ].map((item, i) => (
                  <p key={i} className="text-sm text-gray-600 dark:text-gray-300">{item}</p>
                ))}
              </div>

              {step === "error" && (
                <p className="text-red-500 text-center text-sm mb-4">
                  {language === "en"
                    ? "Sign-in failed. Please try again."
                    : "ការចូលបានបរាជ័យ។ សូមព្យាយាមម្តងទៀត។"}
                </p>
              )}

              {/* Google Sign-In Button */}
              <button
                onClick={handleGoogleSignIn}
                disabled={step === "loading"}
                className="w-full flex items-center justify-center gap-3 py-3 px-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg width="20" height="20" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                {step === "loading"
                  ? (language === "en" ? "Connecting…" : "កំពុងភ្ជាប់…")
                  : t.googleBtn}
              </button>

              <p className="text-xs text-gray-400 text-center mt-4">
                {language === "en"
                  ? "We'll never share your data with anyone."
                  : "យើងនឹងមិនចែករំលែកទិន្នន័យរបស់អ្នកឡើយ។"}
              </p>
            </>
          ) : (
            /* ── Success State ── */
            <div className="flex flex-col items-center text-center py-2">
              <div className="relative mb-4">
                <CheckCircle size={56} className="text-orange-500" />
                <span className="absolute -top-1 -right-1 text-2xl">🎉</span>
              </div>

              <h2 className="text-2xl font-bold mb-3">{t.successTitle}</h2>

              {/* User info card */}
              {userInfo && (
                <div className="flex items-center gap-3 bg-orange-50 dark:bg-orange-900/20 px-4 py-3 rounded-xl w-full mb-4">
                  {/* Avatar — fallback to initials if image blocked */}
                  <AvatarWithFallback user={userInfo} />
                  <div className="text-left">
                    <p className="font-semibold text-sm">{userInfo.name}</p>
                    <p className="text-xs text-gray-500">{userInfo.email}</p>
                  </div>
                </div>
              )}

              {/* Email status */}
              <div className={`w-full rounded-xl p-3 mb-4 text-sm flex items-center gap-2 ${
                emailSent
                  ? "bg-green-50 dark:bg-green-900/20 text-green-700"
                  : "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700"
              }`}>
                <span>{emailSent ? "📧" : "⚠️"}</span>
                <span>
                  {emailSent
                    ? (language === "en"
                        ? `Welcome email sent to ${userInfo?.email}`
                        : `Email ស្វាគមន៍ផ្ញើទៅ ${userInfo?.email} ជោគជ័យ!`)
                    : (language === "en"
                        ? "Email could not be sent. Check EmailJS config."
                        : "Email ផ្ញើមិនបានទេ។ សូម check EmailJS config។")}
                </span>
              </div>

              <p className="text-gray-500 dark:text-gray-400 text-sm mb-5">{t.successMsg}</p>

              <button
                onClick={onClose}
                className="px-10 py-2 rounded-xl text-white font-semibold hover:opacity-90 active:scale-95 transition-all"
                style={{ background: "linear-gradient(135deg,#f97316,#ea580c)" }}
              >
                {t.close}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Main Contact Component ──────────────────────────
const Contact = ({ language = "en" }) => {
  const t = translations[language];
  const [formData, setFormData] = useState({
    name: "", email: "", subject: "", message: "",
  });
  const [status, setStatus]         = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    const textMessage =
      `📩 <b>មានសារថ្មីពីទំព័រ Contact!</b>\n\n` +
      `👤 <b>ឈ្មោះ:</b> ${formData.name}\n` +
      `📧 <b>Email:</b> ${formData.email}\n` +
      `📌 <b>ប្រធានបទ:</b> ${formData.subject}\n` +
      `💬 <b>សារ:</b>\n${formData.message}`;

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: CHAT_ID, text: textMessage, parse_mode: "HTML" }),
        }
      );

      if (response.ok) {
        setStatus({ type: "success", message: t.form.success });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus({ type: "error", message: t.form.error });
      }
    } catch {
      setStatus({ type: "error", message: "មិនអាចភ្ជាប់ទៅកាន់ប្រព័ន្ធបានទេ។" });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus({ type: "", message: "" }), 5000);
    }
  };

  const contactInfo = [
    { icon: Mail,   label: "Email",   value: t.info.email,   href: `mailto:${t.info.email}` },
    { icon: Phone,  label: "Phone",   value: t.info.phone,   href: `tel:${t.info.phone}` },
    { icon: MapPin, label: "Address", value: t.info.address, href: "#" },
  ];

  return (
    <div className="min-h-screen pt-24">
      {/* Subscribe Modal */}
      {showSubscribeModal && (
        <SubscribeModal
          onClose={() => setShowSubscribeModal(false)}
          language={language}
        />
      )}

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

            {/* ── Contact Form ── */}
            <div className="bg-white dark:bg-dark-light p-8 rounded-lg shadow-lg animate-slide-up">
              <h2 className="text-3xl font-bold mb-6">
                {language === "en" ? "Send us a Message" : "ផ្ញើសារមកយើង"}
              </h2>

              {status.message && (
                <div className={`p-4 rounded-lg mb-6 ${
                  status.type === "success"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                }`}>
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2">
                    {t.form.name}
                  </label>
                  <input
                    type="text" id="name" name="name"
                    value={formData.name} onChange={handleChange} required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2">
                    {t.form.email}
                  </label>
                  <input
                    type="email" id="email" name="email"
                    value={formData.email} onChange={handleChange} required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold mb-2">
                    {t.form.subject}
                  </label>
                  <input
                    type="text" id="subject" name="subject"
                    value={formData.subject} onChange={handleChange} required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2">
                    {t.form.message}
                  </label>
                  <textarea
                    id="message" name="message"
                    value={formData.message} onChange={handleChange} required rows="6"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                  />
                </div>

                {/* ── Send Message Button ── */}
                <button
                  type="submit" disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? t.form.sending : t.form.send}
                  <Send size={20} />
                </button>

                {/* ── Subscribe to Newsletter Button (Orange) ── */}
                <button
                  type="button"
                  onClick={() => setShowSubscribeModal(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
                  style={{
                    background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                    boxShadow: "0 4px 15px rgba(249,115,22,0.4)",
                  }}
                >
                  <Bell size={20} />
                  {t.subscribe.btn}
                </button>
              </form>
            </div>

            {/* ── Contact Info ── */}
            <div className="space-y-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="bg-white dark:bg-dark-light p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-6">{t.info.title}</h2>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <a
                      key={index} href={item.href}
                      className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-dark transition-colors group"
                    >
                      <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                        <item.icon size={24} className="text-primary group-hover:text-white" />
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