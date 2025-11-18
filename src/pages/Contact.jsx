import './Contact.css';

const Contact = () => {
  return (
    <div className="contact">
      <div className="container">
        <h1 className="page-title">Get In Touch</h1>
        <p className="page-description">
          Interested in collaboration, research opportunities, or just want to connect?
          Feel free to reach out through any of the channels below.
        </p>

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-card">
              <div className="contact-icon">✉</div>
              <h3>Email</h3>
              <a href="mailto:nwlundgren@ucdavis.edu">nwlundgren@ucdavis.edu</a>
            </div>

            <div className="contact-card">
              <div className="contact-icon">☎</div>
              <h3>Phone</h3>
              <a href="tel:8054335953">(805) 433-5953</a>
            </div>

            <div className="contact-card">
              <div className="contact-icon">in</div>
              <h3>LinkedIn</h3>
              <a href="https://linkedin.com/in/niklundgren" target="_blank" rel="noopener noreferrer">
                linkedin.com/in/niklundgren
              </a>
            </div>

            <div className="contact-card">
              <div className="contact-icon">⚡</div>
              <h3>GitHub</h3>
              <a href="https://github.com/niklundgren" target="_blank" rel="noopener noreferrer">
                github.com/niklundgren
              </a>
            </div>
          </div>

          <div className="interests-section">
            <h2>Research Interests</h2>
            <ul className="interests-list">
              <li>Thermal Transport in Semiconductors</li>
              <li>Machine Learning for Materials Science</li>
              <li>Lattice Dynamics & Phonon Physics</li>
              <li>High-Performance Computing</li>
              <li>Data Visualization & Analysis</li>
              <li>Open Source Scientific Software Development</li>
            </ul>

            <h2>Available For</h2>
            <ul className="interests-list">
              <li>Research Collaborations</li>
              <li>Scientific Software Development</li>
              <li>Data Analysis Consulting</li>
              <li>Technical Presentations & Workshops</li>
              <li>Graduate Student Mentorship</li>
            </ul>
          </div>
        </div>

        <div className="cta-section">
          <h2>Let's Connect</h2>
          <p>
            Whether you're interested in discussing research, exploring collaboration opportunities,
            or just want to chat about computational physics and data science, I'd love to hear from you!
          </p>
          <a href="mailto:nwlundgren@ucdavis.edu" className="cta-button">
            Send me an email
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
