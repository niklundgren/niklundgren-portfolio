import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const { pathname } = useLocation();

  const socialLinks = {
    email: 'nwlundgren@ucdavis.edu',
    linkedin: 'https://linkedin.com/in/niklundgren',
    github: 'https://github.com/niklundgren',
    phone: '(805) 433-5953',
  };

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/skills', label: 'Skills' },
    { to: '/projects', label: 'Projects' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (to) =>
    to === '/' ? pathname === '/' : pathname.startsWith(to);

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <span className="nav-monogram">N.W.L.</span>
          <div className="nav-brand-rule" />
        </div>

        <div className="nav-menu">
          {navItems.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`nav-link${isActive(to) ? ' active' : ''}`}
            >
              <span className="nav-tick">›</span>
              {label}
            </Link>
          ))}
        </div>

        <div className="social-links">
          <a href={`mailto:${socialLinks.email}`} className="social-link" title="Email">
            <span className="social-glyph">✉</span>
            <span>Email</span>
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            title="LinkedIn"
          >
            <span className="social-glyph">in</span>
            <span>LinkedIn</span>
          </a>
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            title="GitHub"
          >
            <span className="social-glyph">⌘</span>
            <span>GitHub</span>
          </a>
          <a href={`tel:${socialLinks.phone}`} className="social-link" title="Phone">
            <span className="social-glyph">☎</span>
            <span>Phone</span>
          </a>
        </div>

        <div className="nav-badge">
          <span>UC Davis</span>
          <span>PhD Candidate</span>
        </div>

        <a href="/CV-nicholas-lundgren.pdf" download className="nav-cv-btn">
          ↓ Download CV
        </a>
      </div>
    </nav>
  );
};

export default Navigation;
