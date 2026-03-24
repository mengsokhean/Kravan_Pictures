# Kravan Pictures - Film Production Website

A modern, responsive film production website built with React, Vite, and Tailwind CSS. Features bilingual support (English/Khmer), dark mode, smooth animations, and comprehensive security features.

## ✨ Features

- **Bilingual Support**: Seamlessly switch between English and Khmer (Kantumruy font)
- **Dark/Light Mode**: Theme toggle with persistent storage
- **Fully Responsive**: Mobile-first design that works on all devices
- **Smooth Animations**: Engaging transitions and hover effects
- **Security Features**: Content Security Policy, XSS protection, secure headers
- **Modern UI**: Clean, professional design with Tailwind CSS
- **Fast Performance**: Built with Vite for lightning-fast development and builds

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Extract the ZIP file**
   ```bash
   unzip kravan-pictures.zip
   cd kravan-pictures
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📦 Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## 🎨 Project Structure

```
kravan-pictures/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── FeaturedProjects.jsx
│   │   ├── Vision.jsx
│   │   ├── CTA.jsx
│   │   └── Footer.jsx
│   ├── pages/          # Page components
│   │   ├── Home.jsx
│   │   ├── Projects.jsx
│   │   ├── Teams.jsx
│   │   ├── Development.jsx
│   │   ├── Services.jsx
│   │   └── Contact.jsx
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── index.html          # HTML template
├── package.json        # Dependencies
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind configuration
└── postcss.config.js   # PostCSS configuration
```

## 🛠️ Technologies Used

- **React 18**: UI library
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Lucide React**: Icon library
- **Google Fonts**: Kantumruy font for Khmer text

## 🌐 Pages

1. **Home**: Hero section, featured projects, vision, and CTA
2. **Projects**: Filterable project portfolio
3. **Teams**: Team member profiles
4. **Development**: Production process and workflow
5. **Services**: Service offerings
6. **Contact**: Contact form and information

## 🎨 Customization

### Colors
Edit `tailwind.config.js`:
```js
colors: {
  primary: {
    DEFAULT: '#F59E0B',
    dark: '#D97706',
  }
}
```

### Content
Update text in component translation objects:
```js
const translations = {
  en: { ... },
  km: { ... }
}
```

### Images
Replace image URLs in components with your own images.

## 🔒 Security Features

- Content Security Policy (CSP)
- XSS Protection
- Secure font loading
- Input sanitization ready
- HTTPS-ready configuration

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🌍 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 License

This project is licensed under the MIT License.

## 🤝 Support

For support, email info@kravanpictures.com or visit our website.

## 🎬 Credits

Built with ❤️ by Kravan Pictures Development Team

---

**Happy Filming! 🎥**
