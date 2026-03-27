import { Link } from 'react-router-dom';
import './ProjectPage.css';
import './TeachingResources.css';

const TEACHING_AREAS = [
  {
    title: 'General Chemistry',
    summary:
      'I taught both the CHE 2 and CHE 4 sequences, covering bonding, stoichiometry, thermochemistry, equilibrium, kinetics, electrochemistry, and the quantum foundations of chemical structure.',
    courses: [
      { code: 'CHE 2A', title: 'General Chemistry', terms: ['Fall 2020'] },
      { code: 'CHE 2B', title: 'General Chemistry', terms: ['Winter 2022', 'Spring 2022'] },
      { code: 'CHE 2C', title: 'General Chemistry', terms: ['Spring 2021', 'Spring 2023'] },
      { code: 'CHE 4A', title: 'Physics-Based General Chemistry', terms: ['Fall 2024', 'Fall 2025', 'Winter 2026'] },
      { code: 'CHE 4B', title: 'Physics-Based General Chemistry - Thermodynamics', terms: ['Winter 2025', 'Spring 2025', 'Winter 2026'] },
      { code: 'CHE 4C', title: 'General Chemistry - Chemical Kinetics and Advanced Chemical Structures', terms: ['Spring 2025'] },
    ],
  },
  {
    title: 'Organic Chemistry',
    summary:
      'My organic chemistry teaching centered on mechanism-first reasoning: naming and structure, stereochemistry, synthesis planning, reactivity, and interpretation of spectroscopic data.',
    courses: [
      { code: 'CHE 8A', title: 'Organic Chemistry', terms: ['Fall 2021'] },
      { code: 'CHE 8B', title: 'Organic Chemistry', terms: ['Winter 2021'] },
      { code: 'CHE 118C', title: 'Organic Chemistry', terms: ['Spring 2024'] },
    ],
  },
  {
    title: 'Spectroscopy',
    summary:
      'At the graduate level I supported a spectroscopy course focused on symmetry, structure, and the interpretation of vibrational, rotational, electronic, magnetic, and resonance spectroscopies.',
    courses: [
      { code: 'CHE 205', title: 'Symmetry, Spectroscopy and Structure', terms: ['Winter 2024'] },
    ],
  },
];

const RESOURCE_GROUPS = [
  {
    title: 'General chemistry support',
    course: 'CHE 2 / CHE 4 sequences',
    format: 'Slides, problem sets, handouts',
    description:
      'Worked examples and review materials for bonding, thermodynamics, equilibrium, kinetics, and structure.',
  },
  {
    title: 'Organic chemistry mechanism practice',
    course: 'CHE 8A, 8B, 118C',
    format: 'Worksheets, notes, study guides',
    description:
      'Student-facing materials built around mechanisms, synthesis logic, resonance, stereochemistry, and spectroscopy-based identification.',
  },
  {
    title: 'Spectroscopy concept notes',
    course: 'CHE 205',
    format: 'Lecture notes, concept summaries',
    description:
      'Reference material connecting symmetry arguments with vibrational, electronic, NMR, and EPR interpretation.',
  },
];

const TeachingResources = () => {
  return (
    <div className="project-page">
      <Link to="/projects" className="back-link">← Projects</Link>

      <header className="project-header">
        <h1 className="project-title">Teaching Resources</h1>
        <p className="project-subtitle">Chemistry instruction across general, organic, and spectroscopy courses</p>
        <div className="project-meta">
          <span className="project-tag">Teaching</span>
          <span className="project-tag">Chemistry</span>
          <span className="project-tag">Course Materials</span>
          <span className="project-tag">2020-2026</span>
        </div>
      </header>

      <section className="project-section">
        <h2>Overview</h2>
        <p>
          I have taught chemistry for more than six years, from Fall 2020 through Winter 2026,
          across 10 distinct courses and 16 term offerings. That work spans foundational general
          chemistry, upper-division organic chemistry, and graduate spectroscopy.
        </p>
        <p>
          My teaching has focused on helping students connect formal theory to problem solving:
          using quantum ideas to explain bonding, using thermodynamics and kinetics to reason about
          chemical behavior, and using mechanism- and spectroscopy-based thinking to interpret structure.
        </p>
      </section>

      <section className="project-section">
        <h2>Teaching Areas</h2>
        <div className="teaching-area-list">
          {TEACHING_AREAS.map((area) => (
            <article key={area.title} className="teaching-area-card">
              <div className="teaching-area-header">
                <h3>{area.title}</h3>
                <span className="teaching-area-count">{area.courses.length} courses</span>
              </div>
              <p className="teaching-area-summary">{area.summary}</p>
              <div className="teaching-course-list">
                {area.courses.map((course) => (
                  <div key={course.code} className="teaching-course-row">
                    <div className="teaching-course-title-row">
                      <span className="teaching-course-code">{course.code}</span>
                      <span className="teaching-course-title">{course.title}</span>
                    </div>
                    <p className="teaching-course-terms">{course.terms.join(' · ')}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="project-section">
        <h2>Selected Resources</h2>
        <p className="teaching-resource-intro">
          I regularly build slides, guided notes, and review documents to help students bridge
          lecture content and discussion work. The sample archive below is structured for those
          materials and can be expanded as I add public PDFs and handouts to the site.
        </p>
        <div className="teaching-resource-list">
          {RESOURCE_GROUPS.map((resource) => (
            <article key={resource.title} className="teaching-resource-card">
              <div className="teaching-resource-top">
                <div>
                  <p className="teaching-resource-course">{resource.course}</p>
                  <h3>{resource.title}</h3>
                </div>
                <span className="teaching-resource-status">Archive in progress</span>
              </div>
              <p className="teaching-resource-format">{resource.format}</p>
              <p className="teaching-resource-description">{resource.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="project-section">
        <h2>Teaching Approach</h2>
        <p>
          The throughline in my teaching is clarity. I like to start from the physical or chemical
          idea that makes a topic intuitive, then translate that idea into the equations,
          conventions, or mechanisms students need to use on their own.
        </p>
        <p>
          That approach has worked especially well in courses where students often struggle to
          connect abstraction to practice: quantum models in general chemistry, multistep reactivity
          in organic chemistry, and the relationship between symmetry, structure, and spectra.
        </p>
      </section>
    </div>
  );
};

export default TeachingResources;
