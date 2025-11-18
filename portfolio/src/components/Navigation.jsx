import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const socialLinks = {
    email: 'nwlundgren@ucdavis.edu',
    linkedin: 'https://linkedin.com/in/niklundgren',
    github: 'https://github.com/niklundgren',
    phone: '(805) 433-5953'
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/projects" className="nav-link">Projects</Link>
          <Link to="/skills" className="nav-link">Skills</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>
        <div className="social-links">
          <a href={`mailto:${socialLinks.email}`} className="social-link" title="Email">
            <i className="icon-email">✉</i>
          </a>
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
            <i className="icon-linkedin">in</i>
          </a>
          <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
            <i className="icon-github">⚡</i>
          </a>
          <a href={`tel:${socialLinks.phone}`} className="social-link" title="Phone">
            <i className="icon-phone">☎</i>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
