import './Skills.css';

const Skills = () => {
  const skillCategories = [
    {
      category: 'Programming Languages',
      skills: [
        { name: 'Python 3', level: 5 },
        { name: 'Fortran', level: 4 },
        { name: 'Javascript', level: 3 },
        { name: 'HTML/CSS', level: 3 },
        { name: 'C++', level: 2 }
      ]
    },
    {
      category: 'Expertise',
      skills: [
        'Heat Transport',
        'Phonons',
        'Thermodynamics',
        'Python Development',
        'Machine Learning',
        'Linear Algebra',
        'Lattice Dynamics',
        'Molecular Dynamics',
        'Data Structures',
        'Differential Equations',
        'Search Algorithms',
        'Vector Graphics'
      ]
    },
    {
      category: 'Technical Software',
      skills: [
        'κALDo - Lattice Dynamics (Developer)',
        'TensorFlow - Machine Learning',
        'ASE - Atomic Simulation Environment',
        'DLPOLY - Molecular Dynamics',
        'LAMMPS - Molecular Dynamics',
        'GPUMD - GPU Accelerated M.D.',
        'GPTA - MD Trajectory Analysis',
        'VMD - Atomic Visualization',
        'Kokkos - Hardware Acceleration',
        'Inkscape - Vector Graphics',
        'IDEs, VMs, LaTeX, Git'
      ]
    }
  ];

  return (
    <div className="skills">
      <div className="container">
        <h1 className="page-title">Skills & Expertise</h1>
        <p className="page-description">
          Technical skills developed through research in computational physics,
          software development, and data science.
        </p>

        <div className="skills-container">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category">
              <h2 className="category-title">{category.category}</h2>

              {category.category === 'Programming Languages' ? (
                <div className="programming-skills">
                  {category.skills.map((skill, idx) => (
                    <div key={idx} className="skill-with-level">
                      <div className="skill-header">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-level">{skill.level}/5</span>
                      </div>
                      <div className="skill-bar">
                        <div
                          className="skill-fill"
                          style={{ width: `${(skill.level / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="skills-grid">
                  {category.skills.map((skill, idx) => (
                    <div key={idx} className="skill-badge">
                      {skill}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="education-section">
          <h2 className="section-title">Education</h2>
          <div className="education-grid">
            <div className="education-card">
              <h3>Doctor of Philosophy in Chemistry</h3>
              <p className="institution">UC Davis - Physical Chemistry</p>
              <p className="date">Expected December 2025</p>
              <p className="gpa">GPA: 3.75</p>
              <ul>
                <li>Designed novel material modeling technique for amorphous carbon</li>
                <li>Trained machine learning models for 2D silicon allotrope research</li>
                <li>Co-author of open source κALDo software</li>
                <li>Nomination for best TA in general chemistry</li>
              </ul>
            </div>
            <div className="education-card">
              <h3>Bachelor of Science in Chemical Physics</h3>
              <p className="institution">UC Davis - with Highest Honors</p>
              <p className="date">June 2020</p>
              <p className="gpa">GPA: 3.61</p>
              <ul>
                <li>Highest Honors (equivalent to Summa Cum Laude)</li>
                <li>Thesis on thermal transport in amorphous silicon-germanium alloys</li>
                <li>Research in Brillouin and Raman spectroscopy</li>
                <li>Four consecutive Dean's List honors</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
