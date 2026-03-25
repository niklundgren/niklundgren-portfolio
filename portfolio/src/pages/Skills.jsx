import { useState, useCallback, useEffect } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import JustifiedGallery from '../components/JustifiedGallery';
import './Skills.css';

/* ── Static data ──────────────────────────────── */

const software = [
  { name: 'LAMMPS', logo: '/logos/lammps-logo.png', url: 'https://docs.lammps.org' },
  { name: 'GPUMD', logo: '/logos/gpumd-logo.png', url: 'https://gpumd.org' },
  { name: 'Quantum ESPRESSO', logo: '/logos/quantum-espresso-logo.png', url: 'https://www.quantum-espresso.org' },
  { name: 'ASE', logo: '/logos/ase-logo.png', url: 'https://wiki.fysik.dtu.dk/ase/' },
  { name: 'kALDo', logo: '/logos/kaldo-logo.png', url: 'https://nanotheorygroup.github.io/kaldo/' },
];

const figures = [
  { src: '/figures/mgo-disp.png', num: 'Fig. 01', label: 'MgO Phonon Dispersion', caption: 'Phonon dispersion relations for magnesium oxide computed via lattice dynamics.' },
  { src: '/figures/mgo-props.png', num: 'Fig. 02', label: 'MgO Thermal Properties', caption: 'Thermal conductivity and heat capacity of MgO as a function of temperature.' },
  { src: '/figures/si-bls-strain.png', num: 'Fig. 03', label: 'Bilayer Silicene Under Strain', caption: 'Structural and electronic properties of bilayer silicene under applied biaxial strain.' },
  { src: '/figures/si-strain-k.png', num: 'Fig. 04', label: 'Silicon Thermal Conductivity vs. Strain', caption: 'Dependence of thermal conductivity on strain for silicon phases.' },
  { src: '/figures/si-xls-rmse.png', num: 'Fig. 05', label: 'Silicon MLIP Parity Plot', caption: 'Force from machine learning interatomic potential vs. DFT reference across silicon phases.' },
  { src: '/figures/sige-diffusivity.png', num: 'Fig. 06', label: 'SiGe Diffusivity', caption: 'Thermal diffusivity of amorphous silicon–germanium alloys.' },
  { src: '/figures/sige-sizeconverge.png', num: 'Fig. 07', label: 'SiGe Size Convergence', caption: 'Convergence of thermal properties with supercell size in amorphous SiGe.' },
  { src: '/figures/sige-velocities.png', num: 'Fig. 08', label: 'SiGe Phonon Velocities', caption: 'Phonon group velocities in amorphous SiGe alloys.' },
];

/* ── Writing section data ─────────────────────── */

const WRITING_SECTIONS = [
  {
    id: 'introduction',
    title: 'Introduction',
    subtitle: 'Heat transport carriers in solids',
    preview: {
      type: 'eq',
      latex: 'H = \\frac{1}{2}\\sum_{i\\alpha}\\frac{p_{i\\alpha}^2}{m_i} + V(\\mathbf{x})',
    },
    content: [
      { type: 'p', text: 'Heat energy is primarily conducted through two carriers in solid state materials. In metals, electrons are the dominant means of both electromagnetic and thermal flux. Semiconductors and other solids with more tightly bound electrons rely instead on traveling waves of atomic vibration.' },
      { type: 'p', text: 'These vibrations in highly ordered materials are modeled as quasi-particles known as phonons, however collective lattice vibration is important to thermal conductance even in the absence of long-range order. We begin with an overview of the quasi-particle picture of vibration and then discuss thermal flux in that framework.' },
      { type: 'p', text: 'Subsequent sections discuss the lattice dynamics of disordered systems, followed by brief remarks on the application of machine learning to the study of ice in these frameworks.' },
    ],
  },
  {
    id: 'phonons',
    title: 'The Phonon Picture',
    subtitle: 'Collective vibration in crystal lattices',
    preview: {
      type: 'eq',
      latex: 'H = \\tfrac{1}{2}\\hat{\\mathbf{p}}^T\\hat{\\mathbf{p}} + \\tfrac{1}{2}\\hat{\\mathbf{u}}^T\\Phi\\hat{\\mathbf{u}}',
    },
    content: [
      { type: 'p', text: 'Lattice dynamics seeks to understand how the motion of individual atomic nuclei couples to the lattice as a whole. The adiabatic approximation, justified by Born and Oppenheimer, allows us to disregard terms related to electrons when our focus is on nuclear motion — electron wavefunctions deform elastically in response to nuclear displacement, conserving energy eigenstates.' },
      { type: 'p', text: 'The Hamiltonian includes only nuclear kinetic and potential energy terms:' },
      { type: 'eq', latex: 'H(\\mathbf{x},\\mathbf{p}) = \\frac{1}{2}\\sum_{i\\alpha}\\frac{p_{i\\alpha}^2}{m_i} + V(\\mathbf{x})' },
      { type: 'p', text: 'Periodic boundary conditions, proposed by Born and von Kármán, recover the translational symmetry required to find eigenfunctions. A Taylor expansion of the potential energy surface in atomic displacements from equilibrium, truncated at quadratic order, yields the quasi-harmonic approximation:' },
      { type: 'eq', latex: 'V(\\mathbf{u}) \\approx \\frac{1}{2}\\sum_{ij\\alpha\\beta}\\frac{\\partial^2 V}{\\partial u_{i\\alpha}\\partial u_{j\\beta}}\\,u_{i\\alpha}\\,u_{j\\beta}' },
      { type: 'p', text: 'After quantization using mass-weighted displacement and momentum operators, the Hamiltonian in matrix form becomes:' },
      { type: 'eq', latex: 'H = \\tfrac{1}{2}\\hat{\\mathbf{p}}^T\\cdot\\hat{\\mathbf{p}} + \\tfrac{1}{2}\\hat{\\mathbf{u}}^T\\Phi\\,\\hat{\\mathbf{u}}' },
      { type: 'p', text: 'Since Φ is a positive-definite symmetric matrix, it is diagonalized as D = UΩUᵀ, yielding normal mode eigenvectors eᵘ and eigenvalue frequencies ω². Bloch\'s theorem restricts eigenfunctions to plane-wave form, mapping the infinite real-space lattice onto a compact Brillouin zone. The dynamical matrix in reciprocal space is:' },
      { type: 'eq', latex: 'D_{i\\alpha\\mathbf{k}j\\beta} = \\sum_{\\mathbf{l}} e^{-i\\mathbf{q}_\\mathbf{k}\\cdot\\mathbf{x}_\\mathbf{l}}\\,D_{i\\alpha\\mathbf{l}j\\beta}' },
    ],
  },
  {
    id: 'acoustic',
    title: 'Acoustic Modes & Band Theory',
    subtitle: 'Dispersion, group velocity, and speed of sound',
    preview: {
      type: 'fig',
      src: '/xls-dispersion.png',
      alt: 'Phonon dispersion',
    },
    content: [
      { type: 'p', text: 'There are 3N degrees of freedom in the unit cell, each corresponding to a phonon mode. Three of these are acoustic modes — equivalent to translation of the unit cell — excited by sound waves. The remainder are optical modes, which retain finite energy even at zero wave vector.' },
      { type: 'p', text: 'Tracking mode energy as a function of wave vector produces a phonon dispersion relation. In a dispersive medium, the group velocity of a wave is the derivative of its frequency with respect to wave vector:' },
      { type: 'eq', latex: 'v_g = \\frac{\\partial\\omega}{\\partial k}' },
      { type: 'p', text: 'Applying this to acoustic branches as k → 0 yields the material\'s speed of sound. Comparison of transverse and longitudinal velocities for ice XI, computed from three interatomic potentials (neural network, SNAP, force-matching), against piezoelectric transducer measurements of ice Ih:' },
      { type: 'fig', src: '/xls-dispersion.png', alt: 'Phonon dispersion of ice XI', caption: 'Low-frequency phonon dispersion for ice XI using three interatomic potentials. Linear fits near Γ in directions towards M, K, and A give the speed of sound in each case.' },
      { type: 'p', text: 'The neural network and SNAP potentials reproduce experimental velocities to within 10%. The force-matching potential overestimates acoustic velocities by nearly an order of magnitude, ruling it out for lattice dynamics calculations of amorphous ice.' },
    ],
  },
  {
    id: 'bte',
    title: 'Boltzmann Transport',
    subtitle: 'Thermal conductivity from first principles',
    preview: {
      type: 'eq',
      latex: 'n_\\mu = \\frac{1}{e^{\\hbar\\omega_\\mu/k_BT}-1}',
    },
    content: [
      { type: 'p', text: 'Thermal transport in crystal lattices requires quantum treatment of nuclear motion combined with statistical thermodynamics. Phonons are bosons — their equilibrium population is governed by the Bose-Einstein distribution:' },
      { type: 'eq', latex: 'n_\\mu = \\frac{1}{e^{\\hbar\\omega_\\mu/k_BT}-1}' },
      { type: 'p', text: 'A small temperature gradient induces a gradient in phonon population. The linearized Boltzmann transport equation balances phonon diffusion against scattering processes:' },
      { type: 'eq', latex: '\\mathbf{v}_\\mu\\cdot\\nabla T\\,\\frac{\\partial n_\\mu}{\\partial T} = \\left.\\frac{\\partial n_\\mu}{\\partial t}\\right|_{\\mathrm{scatt}}' },
      { type: 'p', text: 'The primary scattering processes in bulk semiconductors are three-phonon interactions — annihilation (μ, μ′ → μ″) and creation (μ → μ′, μ″) — with rates derived from third-order force constants and Fermi\'s Golden Rule. Combining scattering rates with the mean free path and heat current yields the thermal conductivity:' },
      { type: 'eq', latex: '\\kappa_{\\alpha\\beta} = \\frac{1}{N_k V}\\sum_\\mu c_\\mu\\,v_{\\mu\\alpha}\\,\\lambda_{\\mu\\beta}' },
      { type: 'p', text: 'Acoustic modes dominate thermal transport — their large Bose-Einstein populations at ambient temperature combined with group velocities in the km/s regime means they carry the vast majority of heat energy. Four-phonon processes become relevant in soft, highly anharmonic materials but are typically too computationally expensive to calculate.' },
    ],
  },
  {
    id: 'qhgk',
    title: 'Quasi-Harmonic Green-Kubo',
    subtitle: 'A unified framework for crystals and glasses',
    preview: {
      type: 'eq',
      latex: "\\kappa_{\\alpha\\beta} = \\frac{k_B}{V}\\sum_{\\mu\\mu'} c_{\\mu\\mu'} v^\\alpha_{\\mu\\mu'} v^\\beta_{\\mu\\mu'} \\tau_{\\mu\\mu'}",
    },
    content: [
      { type: 'p', text: 'Materials without long-range order — glasses, nano-crystalline solids — still transfer heat primarily through vibration, but the phonon picture breaks down: modes are formally ill-defined and many have mean free paths too short for the BTE to apply. Heat instead diffuses through delocalized vibrations of similar frequency.' },
      { type: 'p', text: 'The quasi-harmonic Green-Kubo (QHGK) framework combines anharmonic lattice dynamics with Green-Kubo linear response theory, extending Allen-Feldman theory while simplifying to the BTE-RTA limit for crystals. The central Green-Kubo relation connects conductivity to the heat flux autocorrelation:' },
      { type: 'eq', latex: '\\kappa_{\\alpha\\beta} = \\frac{1}{Vk_BT^2}\\int_0^\\infty \\langle J_\\alpha(t)\\,J_\\beta(0)\\rangle\\,dt' },
      { type: 'p', text: 'Writing the harmonic energy flux in terms of boson creation and annihilation operators and applying Wick\'s theorem reduces canonical averages to single-mode Green\'s functions. Anharmonic broadening adds a finite imaginary frequency component γ to each mode, preventing the integral from diverging. The final conductivity:' },
      { type: 'eq', latex: "\\kappa_{\\alpha\\beta} = \\frac{k_B}{V}\\sum_{\\mu\\mu'} c_{\\mu\\mu'}\\,v^\\alpha_{\\mu\\mu'}\\,v^\\beta_{\\mu\\mu'}\\,\\tau^\\circ_{\\mu\\mu'}" },
      { type: 'p', text: 'The generalized lifetime τ is a sum of two Lorentzian functions accounting for resonant and anti-resonant interactions between mode pairs. The generalized heat capacity c_{μμ′} encodes population factors and scales with the frequency similarity of the two modes. Acoustic modes remain dominant — the physics of thermal transport through long-wavelength vibration is robust across ordered and disordered systems alike.' },
    ],
  },
];

/* ── Helpers ──────────────────────────────────── */

function renderKaTeX(latex, displayMode = false) {
  return katex.renderToString(latex, { displayMode, throwOnError: false, output: 'html' });
}

/* ── Sub-components ───────────────────────────── */

const SectionDivider = ({ num, title }) => (
  <div className="skills-divider">
    <span className="skills-divider-label">§ {num} — {title}</span>
    <div className="skills-divider-rule" />
  </div>
);

const WritingCard = ({ section, onClick }) => {
  const { preview } = section;
  return (
    <button className="writing-card" onClick={() => onClick(section)}>
      <span className="writing-card-title">{section.title}</span>
      <div className="writing-card-preview">
        {preview.type === 'eq' ? (
          <div dangerouslySetInnerHTML={{ __html: renderKaTeX(preview.latex, true) }} />
        ) : (
          <img src={preview.src} alt={preview.alt} />
        )}
      </div>
    </button>
  );
};

const ContentBlock = ({ block }) => {
  if (block.type === 'p') {
    return <p className="panel-para">{block.text}</p>;
  }
  if (block.type === 'eq') {
    return (
      <div
        className="panel-eq"
        dangerouslySetInnerHTML={{ __html: renderKaTeX(block.latex, true) }}
      />
    );
  }
  if (block.type === 'fig') {
    return (
      <figure className="panel-figure">
        <img src={block.src} alt={block.alt} />
        {block.caption && <figcaption>{block.caption}</figcaption>}
      </figure>
    );
  }
  return null;
};

const WritingPanel = ({ section, onClose }) => {
  useEffect(() => {
    if (!section) return;
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [section, onClose]);

  if (!section) return null;

  return (
    <>
      <div className="writing-panel-backdrop" onClick={onClose} />
      <div className="writing-panel" role="dialog" aria-modal="true" aria-label={section.title}>
        <div className="writing-panel-header">
          <div>
            <p className="writing-panel-eyebrow">Technical Writing</p>
            <h2 className="writing-panel-title">{section.title}</h2>
            <p className="writing-panel-subtitle">{section.subtitle}</p>
          </div>
          <button className="writing-panel-close" onClick={onClose} aria-label="Close panel">✕</button>
        </div>
        <div className="writing-panel-body">
          {section.content.map((block, i) => (
            <ContentBlock key={i} block={block} />
          ))}
        </div>
      </div>
    </>
  );
};

/* ── Page ─────────────────────────────────────── */

const Skills = () => {
  const [activeSection, setActiveSection] = useState(null);
  const closePanel = useCallback(() => setActiveSection(null), []);

  return (
    <div className="skills-page">

      <header className="skills-header">
        <p className="skills-eyebrow">Skills &amp; Expertise</p>
        <h1 className="skills-title">The Work</h1>
      </header>

      {/* ── § 00 Software ─────────────────────── */}
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

      {/* ── § 01 Data Visualization ───────────── */}
      <section className="skills-section" id="visualization">
        <SectionDivider num="01" title="Data Visualization" />
        <p className="skills-section-intro">
          Scientific figures from published and in-progress research on thermal transport,
          lattice dynamics, and machine learning interatomic potentials.
        </p>
        <JustifiedGallery figures={figures} targetRowHeight={280} gap={14} />
      </section>

      {/* ── § 02 Technical Writing ────────────── */}
      <section className="skills-section" id="writing">
        <SectionDivider num="02" title="Technical Writing" />
        <p className="skills-section-intro">
          An excerpt from a review of lattice dynamics and thermal transport theory —
          covering the phonon picture of collective vibration, the Boltzmann transport equation,
          and a unified Green-Kubo framework for glasses. Select a section to read.
        </p>
        <div className="writing-cards-grid">
          {WRITING_SECTIONS.map((sec) => (
            <WritingCard key={sec.id} section={sec} onClick={setActiveSection} />
          ))}
        </div>
      </section>

      <WritingPanel section={activeSection} onClose={closePanel} />

    </div>
  );
};

export default Skills;
