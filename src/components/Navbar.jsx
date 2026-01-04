import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light py-3">
        <div className="container">
          {/* Logo */}
          <NavLink className="navbar-brand fw-bold d-flex align-items-center" to="/">
            <span
              className="me-2 d-inline-flex justify-content-center align-items-center rounded"
              style={{
                width: "36px",
                height: "36px",
                background: "linear-gradient(135deg, #7c3aed, #9333ea)",
                color: "white",
                fontWeight: "bold",
              }}
            >
              📘
            </span>
            Edukonomi
          </NavLink>

          {/* Toggle */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarEdu" aria-controls="navbarEdu" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Content */}
          <div className="collapse navbar-collapse" id="navbarEdu">
            {/* Menu Tengah */}
            <ul className="navbar-nav mx-auto gap-3">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Beranda
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/Course" className="nav-link">
                  Materi Pembelajaran
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/Quiz" className="nav-link">
                  Quiz
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/About" className="nav-link">
                  Tentang
                </NavLink>
              </li>
            </ul>

            {/* Button Kanan */}
            <div className="d-flex gap-2">
              <NavLink to="/login" className="btn btn-outline-secondary rounded-pill px-4">
                Masuk
              </NavLink>
              <NavLink
                to="/register"
                className="btn btn-primary rounded-pill px-4"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #9333ea)",
                  border: "none",
                }}
              >
                Daftar Gratis
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
