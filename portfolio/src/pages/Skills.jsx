import JustifiedGallery from '../components/JustifiedGallery';
import './Skills.css';

const software = [
  {
    name: 'LAMMPS',
    logo: '/logos/lammps-logo.png',
    url: 'https://docs.lammps.org',
  },
  {
    name: 'GPUMD',
    logo: '/logos/gpumd-logo.png',
    url: 'https://gpumd.org',
  },
  {
    name: 'Quantum ESPRESSO',
    logo: '/logos/quantum-espresso-logo.png',
    url: 'https://www.quantum-espresso.org',
  },
  {
    name: 'ASE',
    logo: '/logos/ase-logo.png',
    url: 'https://wiki.fysik.dtu.dk/ase/',
  },
  {
    name: 'kALDo',
    logo: '/logos/kaldo-logo.png',
    url: 'https://nanotheorygroup.github.io/kaldo/',
  },
];

const figures = [
  {
    src: '/figures/mgo-disp.png',
    num: 'Fig. 01',
    label: 'MgO Phonon Dispersion',
    caption: 'Phonon dispersion relations for magnesium oxide computed via lattice dynamics.',
  },
  {
    src: '/figures/mgo-props.png',
    num: 'Fig. 02',
    label: 'MgO Thermal Properties',
    caption: 'Thermal conductivity and heat capacity of MgO as a function of temperature.',
  },
  {
    src: '/figures/si-bls-strain.png',
    num: 'Fig. 03',
    label: 'Bilayer Silicene Under Strain',
    caption: 'Structural and electronic properties of bilayer silicene under applied biaxial strain.',
  },
  {
    src: '/figures/si-strain-k.png',
    num: 'Fig. 04',
    label: 'Silicon Thermal Conductivity vs. Strain',
    caption: 'Dependence of thermal conductivity on strain for silicon phases.',
  },
  {
    src: '/figures/si-xls-rmse.png',
    num: 'Fig. 05',
    label: 'Silicon MLIP Parity Plot',
    caption: 'Force from machine learning interatomic potential vs. DFT reference across silicon phases.',
  },
  {
    src: '/figures/sige-diffusivity.png',
    num: 'Fig. 06',
    label: 'SiGe Diffusivity',
    caption: 'Thermal diffusivity of amorphous silicon–germanium alloys.',
  },
  {
    src: '/figures/sige-sizeconverge.png',
    num: 'Fig. 07',
    label: 'SiGe Size Convergence',
    caption: 'Convergence of thermal properties with supercell size in amorphous SiGe.',
  },
  {
    src: '/figures/sige-velocities.png',
    num: 'Fig. 08',
    label: 'SiGe Phonon Velocities',
    caption: 'Phonon group velocities in amorphous SiGe alloys.',
  },
];

// Placeholder essay — replace with real content
const ESSAY_SECTIONS = [
  {
    heading: null,
    body: `Placeholder — drop in your lattice dynamics essay here. The layout supports long-form prose,
section headers, and pull quotes. Body text renders in Fraunces for readability at length;
section headers use JetBrains Mono to stay consistent with the rest of the site.`,
  },
];

const PULL_QUOTE = `"Phonons are the primary carriers of heat in semiconductors — understanding their behavior from first principles is essential to engineering thermal properties."`;

const SectionDivider = ({ num, title }) => (
  <div className="skills-divider">
    <span className="skills-divider-label">§ {num} — {title}</span>
    <div className="skills-divider-rule" />
  </div>
);

const Skills = () => (
  <div className="skills-page">

    <header className="skills-header">
      <p className="skills-eyebrow">Skills & Expertise</p>
      <h1 className="skills-title">The Work</h1>
    </header>

    {/* ── § 00 Software ───────────────────────────────── */}
    <section className="skills-section" id="software">
      <SectionDivider num="00" title="Scientific &amp; Technical Software" />
      <div className="software-strip">
        {software.map((s) => (
          <a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="software-logo-link"
            title={s.name}
          >
            <img src={s.logo} alt={s.name} className="software-logo" />
          </a>
        ))}
      </div>
    </section>

    {/* ── § 01 Data Visualization ─────────────────────── */}
    <section className="skills-section" id="visualization">
      <SectionDivider num="01" title="Data Visualization" />
      <p className="skills-section-intro">
        Scientific figures from published and in-progress research on thermal transport,
        lattice dynamics, and machine learning interatomic potentials.
      </p>
      <JustifiedGallery figures={figures} targetRowHeight={280} gap={14} />
    </section>

    {/* ── § 02 Technical Writing ──────────────────────── */}
    <section className="skills-section" id="writing">
      <SectionDivider num="02" title="Technical Writing" />

      <div className="essay-wrap">
        <header className="essay-header">
          <h2 className="essay-title">Lattice Dynamics &amp; Thermal Transport</h2>
          <p className="essay-subtitle">
            An introduction to phonon theory, thermal conductivity from first principles,
            and the role of machine learning in modern lattice dynamics.
          </p>
        </header>

        <div className="essay-body">
          {ESSAY_SECTIONS.map((sec, i) => (
            <div key={i} className="essay-section">
              {sec.heading && <h3 className="essay-heading">{sec.heading}</h3>}
              {sec.body.split('\n').filter(Boolean).map((para, j) => (
                <p key={j}>{para}</p>
              ))}
            </div>
          ))}

          <blockquote className="essay-pullquote">
            {PULL_QUOTE}
          </blockquote>
        </div>
      </div>
    </section>

  </div>
);

export default Skills;
