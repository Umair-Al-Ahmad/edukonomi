import Footer from "../components/Footer";
import "../styles/pages/home.css";

export default function Home() {
  return (
    <>
      <div className="edukonomi-container">
        {/* Hero Section */}
        <section className="hero-section">
          <h1 className="hero-title">Belajar Ekonomi Jadi Lebih Mudah</h1>
          <p className="hero-description">Tingkatkan pemahaman ekonomi Anda dengan artikel berkualitas dan quiz interaktif. Belajar kapan saja, di mana saja.</p>
        </section>

        <div className="divider"></div>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stats-item">
            <h3 className="stats-value">10K+</h3>
            <p className="stats-label">Belajar Aktif</p>
          </div>

          <div className="stats-item">
            <h3 className="stats-value">500+</h3>
            <p className="stats-label">Artikel</p>
          </div>

          <div className="stats-item">
            <h3 className="stats-value">200+</h3>
            <p className="stats-label">Quiz interaktif</p>
          </div>
        </section>

        {/* CTA Button */}
        <div className="cta-container">
          <a href="/demo" className="cta-button">
            Multi Belajar →<span className="demo-text">Link Demo</span>
          </a>
        </div>

        {/* Content Sections */}
        <section className="content-section">
          <div className="content-card">
            <h2 className="content-title">Dasar-dasar Ekonomi Makro</h2>
            <p className="content-level">(2 materi + Pemula)</p>
          </div>

          <div className="content-card quiz-card">
            <h2 className="content-title">Quiz: Inflasi & Deflasi</h2>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
