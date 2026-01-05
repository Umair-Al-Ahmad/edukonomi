import { Link } from "react-router-dom";
import { BookOpen, Mail, MapPin, Phone, Facebook, Instagram, Youtube, Twitter } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    platform: [
      { name: "Modul", href: "/Course" },
      { name: "Kuis", href: "/Quiz" },
    ],
    resources: [
      { name: "Panduan Belajar", href: "#" },
      { name: "Bantuan", href: "#" },
    ],
    company: [
      { name: "Tentang Kami", href: "/About" },
      { name: "Kontak", href: "#" },
    ],
  };

  const socialMedia = [
    { name: "Facebook", icon: Facebook, href: "https://facebook.com/edukonomi" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/edukonomi" },
  ];

  return (
    <footer className="relative bg-linear-to-br from-purple-700 via-violet-600 to-blue-600 text-white overflow-hidden mt-auto">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-purple-500 via-pink-500 to-purple-500 z-10"></div>

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="p-2 rounded-lg bg-linear-to-br from-purple-500 to-pink-500 shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                <BookOpen className="text-white" size={24} />
              </div>
              <h4 className="text-2xl font-bold">
                Edu<span className="text-yellow-300">konomi</span>
              </h4>
            </Link>

            <p className="text-gray-200 leading-relaxed max-w-md">Platform edukasi ekonomi terlengkap di Indonesia. Belajar ekonomi jadi lebih mudah, menyenangkan, dan efektif.</p>

            <div className="space-y-3">
              <a href="mailto:info@edukonomi.id" className="flex items-center space-x-2 text-gray-200 hover:text-yellow-300 transition-colors duration-200 group">
                <Mail size={18} className="group-hover:scale-110 transition-transform" />
                <span>info@edukonomi.id</span>
              </a>
              <a href="tel:+6281234567890" className="flex items-center space-x-2 text-gray-200 hover:text-yellow-300 transition-colors duration-200 group">
                <Phone size={18} className="group-hover:scale-110 transition-transform" />
                <span>+62 812-3456-7890</span>
              </a>
              <div className="flex items-center space-x-2 text-gray-200">
                <MapPin size={18} />
                <span>Jakarta, Indonesia</span>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-4">
            <h5 className="text-lg font-bold relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-yellow-300">Platform</h5>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-gray-200 hover:text-yellow-300 hover:translate-x-1 transition-all duration-200 inline-block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="space-y-4">
            <h5 className="text-lg font-bold relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-yellow-300">Resources</h5>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-gray-200 hover:text-yellow-300 hover:translate-x-1 transition-all duration-200 inline-block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media & Company */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h5 className="text-lg font-bold relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-yellow-300">Perusahaan</h5>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-gray-200 hover:text-yellow-300 hover:translate-x-1 transition-all duration-200 inline-block">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h5 className="text-lg font-bold relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-yellow-300">Media Sosial</h5>
              <div className="flex space-x-4">
                {socialMedia.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-yellow-300 hover:scale-110 transition-all duration-200"
                    aria-label={social.name}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-white/20 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-300 text-sm">© {new Date().getFullYear()} Edukonomi. Hak Cipta Dilindungi.</p>

            <div className="flex space-x-6 text-sm text-gray-300">
              <Link to="/privacy" className="hover:text-yellow-300 transition-colors">
                Kebijakan Privasi
              </Link>
              <Link to="/terms" className="hover:text-yellow-300 transition-colors">
                Syarat & Ketentuan
              </Link>
              <Link to="/sitemap" className="hover:text-yellow-300 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
