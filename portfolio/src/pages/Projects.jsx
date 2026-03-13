import { Link } from 'react-router-dom';
import './Projects.css';

const projects = [
  {
    id: 'phonon-viewer',
    title: 'Phonon Viewer',
    subtitle: 'Interactive phonon visualization for κALDo',
    tags: ['Python', 'Visualization', 'Lattice Dynamics'],
    description:
      'A tool for visualizing phonon dispersion and properties computed by κALDo, including full non-analytical correction (NAC) support.',
  },
  {
    id: 'cad-designs',
    title: 'CAD Designs',
    subtitle: '3D models designed for print',
    tags: ['CAD', '3D Printing'],
    description:
      'A collection of 3D-printable designs, viewable interactively in the browser via a zero-dependency WebGL STL renderer.',
  },
];

const Projects = () => {
  return (
    <div className="projects-page">
      <h1 className="projects-title">Projects</h1>
      <div className="projects-list">
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className="project-card"
          >
            <div className="project-card-header">
              <h2 className="project-card-title">{project.title}</h2>
              <span className="project-card-subtitle">{project.subtitle}</span>
            </div>
            <p className="project-card-description">{project.description}</p>
            <div className="project-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="project-tag">{tag}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Projects;
