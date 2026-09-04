import { Link } from 'react-router-dom';
import CvLink from '../components/CvLink';
import './Home.css';

const Home = () => {
  return (
    <div className="home">

      {/* ── Hero header: photo + name ──────────── */}
      <div className="hero-section">
        <img
          className="hero-headshot"
          src="/headshot.svg"
          alt="Headshot of Nicholas W. Lundgren"
        />
        <div className="hero-identity">
          <p className="hero-eyebrow"> Computational Chemical Physicist · PhD Candidate</p>
          <h1 className="hero-title">Nicholas<br />W. Lundgren</h1>
        </div>
      </div>

      {/* ── Description + CTAs ────────────────── */}
      <div className="hero-body">
        <p className="hero-description">
          Five years of Python development, scientific data analysis, and open-source code contributions in computational physics. Specializing in thermal transport for low-symmetry materials like glasses and 2D components.
          Building HPC simulation pipelines, training ML potentials, and analyzing phonon dynamics to investigate transport properties. 
        </p>
        <div className="hero-ctas">
          <CvLink className="hero-cta-btn hero-cta-primary">
            ↓ Download CV
          </CvLink>
          <Link to="/skills" className="hero-cta-btn hero-cta-secondary">
            View Skills →
          </Link>
          <Link to="/projects" className="hero-cta-btn hero-cta-secondary">
            View Projects →
          </Link>
        </div>
      </div>

      {/* ── Highlight items ───────────────────── */}
      <div className="hero-highlights">
        <div className="highlight-item">
          <strong>Expected PhD</strong>
          <span>December 2026 · UC Davis</span>
        </div>
        <div className="highlight-item">
          <strong>Specialty</strong>
          <span>Thermal Transport</span>
        </div>
        <div className="highlight-item">
          <strong>Open Source</strong>
          <span>Python Developer</span>
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
          <span className="stat-num">3</span>
          <span className="stat-label">Publications</span>
        </div>
        <span className="stat-sep">·</span>
        <div className="stat-item">
          <span className="stat-num">6+</span>
          <span className="stat-label">Years Teaching</span>
        </div>
        <span className="stat-sep">·</span>
        <div className="stat-item">
          <span className="stat-num">10</span>
          <span className="stat-label">Courses Taught</span>
        </div>
        <span className="stat-sep">·</span>
        <div className="stat-item">
          <span className="stat-num">7+</span>
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
              {['LAMMPS', 'GPUMD', 'DLPOLY', 'Kokkos', 'Fortran', 'MPI', 'SLURM'].map(t => (
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
              {['TensorFlow', 'NumPy', 'SciPy'].map(t => (
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
              {['matplotlib', 'Pandas', 'Inkscape', 'GPTA3', 'VMD'].map(t => (
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
              {['Git', 'Python', 'Fortran', 'HTML/CSS', 'LaTeX'].map(t => (
                <span key={t} className="expertise-tag">
                  {t === 'κALDo' ? <><span className="kappa">κ</span>ALDo</> : t}
                </span>
              ))}
            </div>
          </div>
          <div className="expertise-card">
            <div className="expertise-card-header">
              <span className="expertise-icon">◌</span>
              <span className="expertise-label">Teaching & Mentorship</span>
            </div>
            <div className="expertise-tags">
              {['General Chemistry', 'Organic Chemistry', 'Spectroscopy', 'Quantum Chemistry', 'Gen. Chem. Labs'].map(t => (
                <span key={t} className="expertise-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
