import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const { pathname, hash } = useLocation();

  const socialLinks = {
    email: 'nwlundgren@ucdavis.edu',
    linkedin: 'https://linkedin.com/in/niklundgren',
    scholar: 'https://scholar.google.com/citations?user=ajpztFYAAAAJ&hl=en',
    phone: '(805) 433-5953',
  };

  const navItems = [
    { to: '/', label: 'Home' },
    {
      to: '/skills',
      label: 'Skills',
      key: 'skills',
      children: [
        { to: '/skills#software', label: 'Software' },
        { to: '/skills#writing', label: 'Technical Writing' },
        { to: '/skills#visualization', label: 'Data Visualization' },
      ],
    },
    { to: '/projects', 
      label: 'Projects',
      key: 'projects',
      children: [
        { to: '/projects/phonon-viewer', label: 'Phonon Viewer' },
        { to: '/projects/cad-designs', label: 'CAD Designs' },
      ],
    },
    { to: '/contact', label: 'Contact' },
  ];

  const [openMenus, setOpenMenus] = useState(() => ({
    projects: pathname.startsWith('/projects'),
    skills: pathname.startsWith('/skills'),
  }));

  useEffect(() => {
    setOpenMenus((current) => ({
      ...current,
      ...(pathname.startsWith('/projects') ? { projects: true } : {}),
      ...(pathname.startsWith('/skills') ? { skills: true } : {}),
    }));
  }, [pathname]);

  const isActive = (to) => {
    const [basePath, section] = to.split('#');
    if (basePath === '/') return pathname === '/';
    if (section) return pathname === basePath && hash === `#${section}`;
    return pathname.startsWith(basePath);
  };

  const toggleMenu = (key) => {
    setOpenMenus((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <span className="nav-monogram">N.W.L.</span>
          <div className="nav-brand-rule" />
        </div>

        <div className="nav-menu">
          {navItems.map(({ to, label, key, children }) => (
            <div key={to} className={`nav-item${children ? ' has-children' : ''}`}>
              <div className={`nav-link-row${isActive(to) ? ' active' : ''}`}>
                <Link to={to} className={`nav-link${isActive(to) ? ' active' : ''}`}>
                  <span className="nav-tick">›</span>
                  {label}
                </Link>
                {children && (
                  <button
                    type="button"
                    className={`nav-expand${openMenus[key] ? ' open' : ''}`}
                    onClick={() => toggleMenu(key)}
                    aria-label={`Toggle ${label} links`}
                    aria-expanded={openMenus[key]}
                  >
                    ▾
                  </button>
                )}
              </div>
              {children && openMenus[key] && (
                <div className="nav-submenu">
                  {children.map((child) => (
                    <Link
                      key={child.to}
                      to={child.to}
                      className={`nav-sublink${isActive(child.to) ? ' active' : ''}`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
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
            href={socialLinks.scholar}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            title="Google Scholar"
          >
            <span className="social-glyph">G</span>
            <span>Scholar</span>
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
