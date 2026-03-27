import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Projects.css';
import SectionDivider from '../components/SectionDivider';

// Renders a name string that may contain 'κ' using the serif kappa class
function renderName(name) {
  if (!name.includes('κ')) return name;
  const parts = name.split('κ');
  return parts.flatMap((part, i) =>
    i < parts.length - 1
      ? [part, <span key={i} className="kappa">κ</span>]
      : [part]
  );
}

// ── Data ───────────────────────────────────────────────────────

const academicWorks = [
  {
    type: 'Paper',
    title: 'κALDo 2.0: Anharmonic Lattice Dynamics at Scale',
    venue: 'Computer Physics Communications',
    year: '2026',
    status: 'Accepted',
    citations: null, // update from Scholar once published
    scholarUrl: 'https://scholar.google.com/citations?user=ajpztFYAAAAJ&hl=en',
  },
  {
    type: 'Poster',
    title: 'Stacking and Strain Effects on Silicene Heat Transport',
    venue: 'APS March Meeting',
    year: '2025',
    status: null,
    citations: null,
    scholarUrl: 'https://scholar.google.com/citations?user=ajpztFYAAAAJ&hl=en',
  },
  {
    type: 'Paper',
    title: 'Mode Localization in Amorphous Alloys',
    venue: 'Physical Review B',
    year: '2021',
    status: null,
    citations: null, // update from Scholar
    scholarUrl: 'https://scholar.google.com/citations?user=ajpztFYAAAAJ&hl=en',
  },
  {
    type: 'Paper',
    title: 'Efficient anharmonic lattice dynamics calculations of thermal transport in crystalline and disordered solids',
    venue: 'Journal of Applied Physics',
    year: '2020',
    status: null,
    citations: 82,
    scholarUrl: 'https://scholar.google.com/citations?user=ajpztFYAAAAJ&hl=en',
  },
];

const codingWorks = [
  {
    repo: 'nanotheorygroup/kaldo',
    name: 'κALDo',
    role: 'Core Developer',
    description:
      'Open-source Python package for computing vibrational, elastic, and thermal transport properties. GPU/CPU-accelerated BTE and Green-Kubo solvers for crystalline and amorphous materials with ML potential support.',
    language: 'Python',
    license: 'BSD-3-Clause',
    url: 'https://github.com/nanotheorygroup/kaldo',
    docsUrl: 'https://nanotheorygroup.github.io/kaldo/',
  },
  {
    repo: 'nanotheorygroup/kaldo-examples',
    name: 'κALDo Examples',
    role: 'Core Developer',
    description:
      'Official Jupyter notebook tutorials and example workflows for the κALDo package, covering phonon calculations, thermal transport, and ML potential integration.',
    language: 'Jupyter Notebook',
    license: 'BSD-3-Clause',
    url: 'https://github.com/nanotheorygroup/kaldo-examples',
    // docsUrl: 'https://nanotheorygroup.github.io/kaldo-examples/',
  },
  {
    repo: 'niklundgren/nep-xls',
    name: 'nep-xls',
    role: 'Author',
    description:
      'Data and analysis repository for studying the thermal conductivity of mono- and bilayer silicene using a neuroevolution potential (NEP).',
    language: 'Python',
    license: 'MIT',
    url: 'https://github.com/niklundgren/nep-xls',
    docsUrl: null,
  },
];

const funProjects = [
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
  {
    id: 'teaching-resources',
    title: 'Teaching Resources',
    subtitle: 'Chemistry instruction and course support materials',
    tags: ['Teaching', 'Chemistry', 'Course Materials'],
    description:
      'Six-plus years of chemistry teaching across general chemistry, organic chemistry, and spectroscopy, organized into a course history and resource archive.',
  },
];

// ── Component ──────────────────────────────────────────────────

const Projects = () => {
  const { hash } = useLocation();
  const [ghStats, setGhStats] = useState({});

  // Scroll to anchor when hash changes (React Router doesn't do this natively)
  useEffect(() => {
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, [hash]);

  useEffect(() => {
    Promise.all(
      codingWorks.map(({ repo }) =>
        fetch(`https://api.github.com/repos/${repo}`)
          .then(r => r.json())
          .then(d => [repo, { stars: d.stargazers_count, forks: d.forks_count }])
      )
    )
      .then(pairs => setGhStats(Object.fromEntries(pairs)))
      .catch(() => {}); // silently fail — cards show '—' on error
  }, []);

  return (
    <div className="projects-page">
      <header className="projects-header">
        <p className="projects-eyebrow">The Work</p>
        <h1 className="projects-title">Projects</h1>
        <p className="projects-intro">
          These are some of the things I worked on while in my Ph.D. program. They highlight the multi-faceted
          skill that I picked up. Academic Work serves to highlight my writing and research, while the Code 
          section highlights some of my Python development. The "Other" section show off some technical skills
          that I gained for fun in my spare-time like 3D modeling! Please enjoy.
        </p>
      </header>

      {/* ── Academic Work ──────────────────────────── */}
      <section className="projects-section" id="academic">
        <SectionDivider title="Academic Work" />
        <div className="academic-list">
          {academicWorks.map((work, i) => (
            <div key={i} className="academic-card">
              <div className="academic-card-top">
                <span className={`academic-badge academic-badge-${work.type.toLowerCase()}`}>
                  {work.type}
                </span>
                <span className="academic-year">
                  {work.status ? `${work.year} · ${work.status}` : work.year}
                </span>
              </div>
              <div className="academic-title-row">
                <p className="academic-title">{renderName(work.title)}</p>
                <a
                  href={work.scholarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="academic-link"
                >
                  Scholar ↗
                </a>
              </div>
              <p className="academic-venue">
                {work.venue}
                {work.citations != null && (
                  <span className="academic-citations"> · {work.citations} citations</span>
                )}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Open Source ────────────────────────────── */}
      <section className="projects-section" id="code">
        <SectionDivider title="Open Source" />
        <div className="coding-list">
          {codingWorks.map((work) => {
            const stats = ghStats[work.repo];
            return (
              <div key={work.repo} className="coding-card">
                <div className="coding-card-top">
                  <div className="coding-name-row">
                    <span className="coding-name">{renderName(work.name)}</span>
                    <span className="coding-role">{work.role}</span>
                  </div>
                  <span className="coding-stats">
                    <span className="coding-stat">★ {stats?.stars ?? '—'}</span>
                    <span className="coding-stat-sep">·</span>
                    <span className="coding-stat">⑂ {stats?.forks ?? '—'}</span>
                  </span>
                </div>
                <p className="coding-meta">
                  {work.repo}
                  <span className="coding-meta-sep">·</span>
                  {work.language}
                  <span className="coding-meta-sep">·</span>
                  {work.license}
                </p>
                <p className="coding-desc">{work.description}</p>
                <div className="coding-links">
                  <a
                    href={work.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="coding-link coding-link-primary"
                  >
                    GitHub Repository
                  </a>
                  {work.docsUrl && (
                    <a
                      href={work.docsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="coding-link coding-link-secondary"
                    >
                      Documentation ↗
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Other Technical Projects ───────────────── */}
      <section className="projects-section" id="other">
        <SectionDivider title="Other Technical Projects" />
        <div className="other-list">
          {funProjects.map((project) => (
            <div key={project.id} className="other-card">
              <div className="other-title-row">
                <p className="other-title">{project.title}</p>
                <Link to={`/projects/${project.id}`} className="other-link">
                  Explore →
                </Link>
              </div>
              <p className="other-subtitle">{project.subtitle}</p>
              <p className="other-desc">{project.description}</p>
              <div className="other-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="other-tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Projects;
