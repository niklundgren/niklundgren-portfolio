import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">

      {/* ── Two-column hero ───────────────────── */}
      <div className="hero-section">

        {/* Left: kALDo spotlight + recent highlights */}
        <div className="hero-left">
          <div className="kaldo-card">
            <div className="kaldo-card-header">
              <div className="kaldo-title-row">
                <span className="kaldo-name"><span className="kappa">κ</span>ALDo</span>
                <span className="kaldo-badge">Core Developer</span>
              </div>
              <p className="kaldo-full-name">Anharmonic Lattice Dynamics</p>
            </div>
            <p className="kaldo-desc">
              Open-source Python package for computing vibrational, elastic, and
              thermal transport properties. GPU/CPU-accelerated BTE and Green-Kubo
              solvers for crystalline and amorphous materials with ML potential support.
            </p>
            <div className="kaldo-stats">
              <span className="kaldo-stat"><span className="kaldo-star">★</span> 180 stars</span>
              <span className="kaldo-stat-sep">·</span>
              <span className="kaldo-stat">26 forks</span>
              <span className="kaldo-stat-sep">·</span>
              <span className="kaldo-stat">v2.0.1</span>
              <span className="kaldo-stat-sep">·</span>
              <span className="kaldo-stat">Python</span>
            </div>
            <div className="kaldo-links">
              <a
                href="https://github.com/nanotheorygroup/kaldo"
                target="_blank"
                rel="noopener noreferrer"
                className="kaldo-link kaldo-link-primary"
              >
                GitHub Repository
              </a>
              <a
                href="https://scholar.google.com/citations?user=ajpztFYAAAAJ&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="kaldo-link kaldo-link-secondary"
              >
                Publications ↗
              </a>
            </div>
            <p className="kaldo-footer">2,372 commits · BSD-3-Clause · nanotheorygroup</p>
          </div>

          <div className="highlights-feed">
            <p className="highlights-eyebrow">Academic Work</p>
            <div className="highlight-item">
              <strong>2026 · Accepted</strong>
              <span>κALDo 2.0 — <em>Computer Physics Communications</em></span>
            </div>
            <div className="highlight-item">
              <strong>2025 · Poster</strong>
              <span>Stacking and Strain Effects on Silicene Heat Transport — <em>APS March Meeting</em></span>
            </div>
            <div className="highlight-item">
              <strong>2021 · Published</strong>
              <span>Mode Localization in Amorphous Alloys— <em>Phys. Rev. B</em></span>
            </div>
          </div>
        </div>

        {/* Right: identity + highlights */}
        <div className="hero-content">
          <p className="hero-eyebrow">Computational Physics Engineer · PhD Candidate</p>
          <div className="hero-summary">
            <div className="hero-copy">
              <h1 className="hero-title">Nicholas<br />W. Lundgren</h1>
              <p className="hero-description">
                Building HPC simulation pipelines and ML-driven material models.
                Five years of Python development, scientific data analysis, and
                open-source contributions in computational physics.
              </p>
              <div className="hero-ctas">
                <a
                  href="/CV-nicholas-lundgren.pdf"
                  download
                  className="hero-cta-btn hero-cta-primary"
                >
                  ↓ Download CV
                </a>
                <Link to="/skills" className="hero-cta-btn hero-cta-secondary">
                  View Skills →
                </Link>
              </div>
            </div>
            <img
              className="hero-headshot"
              src="/headshot.svg"
              alt="Headshot of Nicholas W. Lundgren"
            />
          </div>
          <div className="hero-highlights">
            <div className="highlight-item">
              <strong>Expected PhD</strong>
              <span>June 2026 · UC Davis</span>
            </div>
            <div className="highlight-item">
              <strong>Specialty</strong>
              <span>Thermal Simulation & HPC</span>
            </div>
            <div className="highlight-item">
              <strong>Open Source</strong>
              <span><span className="kappa">κ</span>ALDo Developer</span>
            </div>
          </div>
        </div>

      </div>

      {/* ── Stats bar ─────────────────────────── */}
      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-num">209</span>
          <span className="stat-label">GitHub Stars</span>
        </div>
        <span className="stat-sep">·</span>
        <div className="stat-item">
          <span className="stat-num">112</span>
          <span className="stat-label">Citations</span>
        </div>
        <span className="stat-sep">·</span>
        <div className="stat-item">
          <span className="stat-num">h2</span>
          <span className="stat-label">h-index</span>
        </div>
        <span className="stat-sep">·</span>
        <div className="stat-item">
          <span className="stat-num">3</span>
          <span className="stat-label">Publications</span>
        </div>
        <span className="stat-sep">·</span>
        <div className="stat-item">
          <span className="stat-num">5+</span>
          <span className="stat-label">Years Python</span>
        </div>
      </div>

      {/* ── Expertise clusters ─────────────────── */}
      <div className="expertise-section">
        <p className="expertise-eyebrow">Expertise</p>
        <div className="expertise-grid">
          <div className="expertise-card">
            <div className="expertise-card-header">
              <span className="expertise-icon">⚙</span>
              <span className="expertise-label">HPC & Simulation</span>
            </div>
            <div className="expertise-tags">
              {['LAMMPS', 'GPUMD', 'DLPOLY', 'Kokkos', 'Fortran', 'MPI'].map(t => (
                <span key={t} className="expertise-tag">{t}</span>
              ))}
            </div>
          </div>
          <div className="expertise-card">
            <div className="expertise-card-header">
              <span className="expertise-icon">◈</span>
              <span className="expertise-label">ML & Scientific Computing</span>
            </div>
            <div className="expertise-tags">
              {['TensorFlow', 'ML Potentials', 'Python', 'ASE', 'NumPy', 'SciPy'].map(t => (
                <span key={t} className="expertise-tag">{t}</span>
              ))}
            </div>
          </div>
          <div className="expertise-card">
            <div className="expertise-card-header">
              <span className="expertise-icon">▦</span>
              <span className="expertise-label">Data Analysis & Viz</span>
            </div>
            <div className="expertise-tags">
              {['Python', 'matplotlib', 'Pandas', 'Inkscape', 'GPTA', 'VMD'].map(t => (
                <span key={t} className="expertise-tag">{t}</span>
              ))}
            </div>
          </div>
          <div className="expertise-card">
            <div className="expertise-card-header">
              <span className="expertise-icon">⌥</span>
              <span className="expertise-label">Software Development</span>
            </div>
            <div className="expertise-tags">
              {['κALDo', 'Git', 'Python', 'JavaScript', 'HTML/CSS', 'LaTeX'].map(t => (
                <span key={t} className="expertise-tag">
                  {t === 'κALDo' ? <><span className="kappa">κ</span>ALDo</> : t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
