import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const { pathname, hash } = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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
    {
      to: '/projects',
      label: 'Projects',
      key: 'projects',
      children: [
        { to: '/projects#academic', label: 'Academic Work' },
        { to: '/projects#code', label: 'Code' },
        {
          to: '/projects#other',
          label: 'Other',
          key: 'other-projects',
          children: [
            { to: '/projects/phonon-viewer', label: 'Phonon Viewer' },
            { to: '/projects/cad-designs', label: 'CAD Designs' },
            { to: '/projects/teaching-resources', label: 'Teaching Resources' },
          ],
        },
      ],
    },
    { to: '/contact', label: 'Contact' },
  ];

  const [openMenus, setOpenMenus] = useState(() => ({
    projects: pathname.startsWith('/projects'),
    skills: pathname.startsWith('/skills'),
  }));

  const [openSubMenus, setOpenSubMenus] = useState(() => ({
    'other-projects': pathname.startsWith('/projects/'),
  }));

  useEffect(() => {
    setOpenMenus((current) => ({
      ...current,
      ...(pathname.startsWith('/projects') ? { projects: true } : {}),
      ...(pathname.startsWith('/skills') ? { skills: true } : {}),
    }));
    setOpenSubMenus((current) => ({
      ...current,
      ...(pathname.startsWith('/projects/') ? { 'other-projects': true } : {}),
    }));
    setIsMobileOpen(false);
  }, [pathname]);

  const isActive = (to) => {
    const [basePath, section] = to.split('#');
    if (basePath === '/') return pathname === '/';
    if (section) return pathname === basePath && hash === `#${section}`;
    return pathname.startsWith(basePath);
  };

  const toggleMenu = (key) => {
    setOpenMenus((current) => ({ ...current, [key]: !current[key] }));
  };

  const toggleSubMenu = (key) => {
    setOpenSubMenus((current) => ({ ...current, [key]: !current[key] }));
  };

  return (
    <nav className={`navigation${isMobileOpen ? ' is-open' : ''}`}>
      <div className="nav-container">
        <div className="nav-top-row">
          <div className="nav-brand">
            <span className="nav-monogram">N.W.L.</span>
            <div className="nav-brand-rule" />
          </div>
          <button
            type="button"
            className="nav-hamburger"
            onClick={() => setIsMobileOpen((o) => !o)}
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? '✕' : '☰'}
          </button>
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
                    <div key={child.to} className="nav-subitem">
                      <div className="nav-sublink-row">
                        <Link
                          to={child.to}
                          className={`nav-sublink${isActive(child.to) ? ' active' : ''}`}
                        >
                          {child.label}
                        </Link>
                        {child.children && (
                          <button
                            type="button"
                            className={`nav-sub-expand${openSubMenus[child.key] ? ' open' : ''}`}
                            onClick={() => toggleSubMenu(child.key)}
                            aria-label={`Toggle ${child.label} links`}
                            aria-expanded={openSubMenus[child.key]}
                          >
                            ▾
                          </button>
                        )}
                      </div>
                      {child.children && openSubMenus[child.key] && (
                        <div className="nav-sub-submenu">
                          {child.children.map((gc) => (
                            <Link
                              key={gc.to}
                              to={gc.to}
                              className={`nav-sub-sublink${isActive(gc.to) ? ' active' : ''}`}
                            >
                              {gc.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <a href="/Nicholas_Lundgren_CV.pdf" download className="nav-cv-btn">
          ↓ Download CV
        </a>
      </div>
    </nav>
  );
};

export default Navigation;
