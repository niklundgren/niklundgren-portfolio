import './Projects.css';

const Projects = () => {
  const projects = [
    {
      title: 'κALDo - Lattice Dynamics Software',
      role: 'Co-author & Developer',
      description: 'Open source software for thermal transport calculations. Implementing custom features and automating documentation routines.',
      technologies: ['Python', 'Fortran', 'High-Performance Computing'],
      link: '#'
    },
    {
      title: 'Amorphous Carbon Material Modeling',
      role: 'Research',
      description: 'Designed novel material modeling technique for studying thermal properties of amorphous carbon materials.',
      technologies: ['Machine Learning', 'Molecular Dynamics', 'Python'],
      link: '#'
    },
    {
      title: 'Silicene Machine Learning Models',
      role: 'Research',
      description: 'Trained machine learning models to study thermal transport in 2D silicon allotrope (silicene).',
      technologies: ['TensorFlow', 'Python', 'Data Analysis'],
      link: '#'
    }
  ];

  return (
    <div className="projects">
      <div className="container">
        <h1 className="page-title">Projects</h1>
        <p className="page-description">
          Research projects and software development work in computational physics and materials science.
        </p>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-header">
                <h3 className="project-title">{project.title}</h3>
                <span className="project-role">{project.role}</span>
              </div>
              <p className="project-description">{project.description}</p>
              <div className="project-technologies">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="publications-section">
          <h2>Publications & Presentations</h2>
          <ul className="publications-list">
            <li>
              <strong>2025</strong> - Poster: Layer-Stacking and Strain Effects on Heat Transport in Silicene (American Physical Society)
            </li>
            <li>
              <strong>2021</strong> - Publication: Mode Localization and Suppressed Heat Transport (Phys. Rev. B)
            </li>
            <li>
              <strong>2020</strong> - Publication: Efficient Anharmonic Lattice Dynamic Calculations (J. App. Phys.)
            </li>
            <li>
              <strong>2020</strong> - Presentation: Mass Disorder in Heat Transport (Larock Conference)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Projects;
