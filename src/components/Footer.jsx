import { Link } from "react-router-dom";
import { BookOpen, Mail, MapPin, Phone } from "lucide-react";
import "../styles/components/footer.css";

const Footer = () => {
  const footerLinks = {
    platform: [
      { name: "Artikel", href: "/artikel" },
      { name: "Quiz", href: "/quiz" },
      { name: "Kursus", href: "#" },
      { name: "Sertifikasi", href: "#" },
    ],
    resources: [
      { name: "Blog", href: "#" },
      { name: "Panduan Belajar", href: "#" },
      { name: "FAQ", href: "#" },
      { name: "Bantuan", href: "#" },
    ],
    company: [
      { name: "Tentang Kami", href: "/tentang" },
      { name: "Karir", href: "#" },
      { name: "Kontak", href: "#" },
      { name: "Press Kit", href: "#" },
    ],
  };

  return (
    <footer className="edukonomi-footer py-5">
      <div className="container">
        <div className="row">
          {/* Brand Section */}
          <div className="col-lg-4 col-md-6 mb-4">
            <Link to="/" className="d-flex align-items-center mb-3 text-decoration-none text-white">
              <div className="footer-logo-icon rounded p-2 me-3">
                <BookOpen className="text-white" size={24} />
              </div>
              <h4 className="mb-0 fw-bold text-white">
                Edu<span className="footer-accent">konomi</span>
              </h4>
            </Link>
            <p className="footer-text mb-4">Platform edukasi ekonomi terlengkap di Indonesia. Belajar ekonomi jadi lebih mudah, menyenangkan, dan efektif.</p>
            <div className="contact-info">
              <a href="mailto:info@edukonomi.id" className="d-flex align-items-center mb-2 footer-link">
                <Mail size={18} className="me-2" />
                info@edukonomi.id
              </a>
              <a href="tel:+6281234567890" className="d-flex align-items-center mb-2 footer-link">
                <Phone size={18} className="me-2" />
                +62 812-3456-7890
              </a>
              <div className="d-flex align-items-center footer-text">
                <MapPin size={18} className="me-2" />
                Jakarta, Indonesia
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div className="col-lg-2 col-md-3 col-6 mb-4">
            <h5 className="mb-3 fw-bold text-white">Platform</h5>
            <ul className="list-unstyled">
              {footerLinks.platform.map((link) => (
                <li key={link.name} className="mb-2">
                  <Link to={link.href} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="col-lg-2 col-md-3 col-6 mb-4">
            <h5 className="mb-3 fw-bold text-white">Resources</h5>
            <ul className="list-unstyled">
              {footerLinks.resources.map((link) => (
                <li key={link.name} className="mb-2">
                  <Link to={link.href} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="col-lg-2 col-md-3 col-6 mb-4">
            <h5 className="mb-3 fw-bold text-white">Perusahaan</h5>
            <ul className="list-unstyled">
              {footerLinks.company.map((link) => (
                <li key={link.name} className="mb-2">
                  <Link to={link.href} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section (Opsional) */}
          <div className="col-lg-2 col-md-3 col-6 mb-4">
            <h5 className="mb-3 fw-bold text-white">Media Sosial</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="https://facebook.com/edukonomi" className="footer-link" target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              </li>
              <li className="mb-2">
                <a href="https://twitter.com/edukonomi" className="footer-link" target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
              </li>
              <li className="mb-2">
                <a href="https://instagram.com/edukonomi" className="footer-link" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
              <li className="mb-2">
                <a href="https://youtube.com/edukonomi" className="footer-link" target="_blank" rel="noopener noreferrer">
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="footer-divider pt-4 mt-4">
          <div className="row align-items-center">
            <div className="col-md-12 text-center">
              <p className="footer-copyright mb-0">© {new Date().getFullYear()} Edukonomi. Hak Cipta Dilindungi.</p>
              <div className="mt-2">
                <Link to="/kebijakan-privasi" className="footer-link me-3">
                  Kebijakan Privasi
                </Link>
                <Link to="/syarat-ketentuan" className="footer-link">
                  Syarat & Ketentuan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
