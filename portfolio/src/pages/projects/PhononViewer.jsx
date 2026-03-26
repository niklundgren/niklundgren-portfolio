import { useState } from 'react';
import katex from 'katex';
import { Link } from 'react-router-dom';
import 'katex/dist/katex.min.css';
import './PhononViewer.css';
import './ProjectPage.css';

const MATERIALS = {
  silicene_4x4: {
    label: 'Silicene',
    detail: '4×4 supercell',
    formula: 'Si',
    modes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  },
  bilayer_silicene_4x4: {
    label: 'Bilayer Silicene',
    detail: '4×4 supercell',
    formula: 'Si₂',
    modes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
  },
  silicon_3x3x3: {
    label: 'Silicon (Diamond)',
    detail: '3×3×3 supercell',
    formula: 'Si',
    modes: [0, 1, 2, 3, 4, 5],
  },
  mgo_3x3x3: {
    label: 'MgO',
    detail: '3×3×3 supercell',
    formula: 'MgO',
    modes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
  },
};

function renderKaTeX(latex, displayMode = false) {
  return {
    __html: katex.renderToString(latex, {
      displayMode,
      throwOnError: false,
      output: 'html',
    }),
  };
}

const PhononViewerWidget = () => {
  const [material, setMaterial] = useState('silicene_4x4');
  const [mode, setMode] = useState(MATERIALS.silicene_4x4.modes[0]);

  const current = MATERIALS[material];
  const src = `/phonon-viewer/${material}/mode_${mode}.html`;

  const changeMaterial = (val) => {
    const nextMaterial = MATERIALS[val];
    setMaterial(val);
    setMode(nextMaterial.modes[0]);
  };

  const changeMode = (m) => {
    setMode(m);
  };

  return (
    <div className="pv-widget">
      <div className="pv-header">
        <div className="pv-header-left">
          <span className="pv-instrument-label">PHONON VIEWER</span>
          <span className="pv-divider">|</span>
          <div className="pv-select-group">
            <label className="pv-field-label">MATERIAL</label>
            <div className="pv-select-wrap">
              <select
                className="pv-select"
                value={material}
                onChange={(e) => changeMaterial(e.target.value)}
              >
                {Object.entries(MATERIALS).map(([key, m]) => (
                  <option key={key} value={key}>
                    {m.label} ({m.detail})
                  </option>
                ))}
              </select>
              <span className="pv-select-arrow">▾</span>
            </div>
          </div>
        </div>

        <div className="pv-header-right">
          <label className="pv-field-label">MODE</label>
          <div className="pv-mode-tabs">
            {current.modes.map((m) => (
              <button
                key={m}
                className={`pv-mode-btn${mode === m ? ' active' : ''}`}
                onClick={() => changeMode(m)}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pv-display-wrap">
        <iframe
          key={src}
          src={src}
          title={`${current.label} phonon mode ${mode}`}
          className="pv-iframe"
        />
        <div className="pv-scanlines" aria-hidden="true" />
        <div className="pv-vignette" aria-hidden="true" />
      </div>
    </div>
  );
};

const PhononViewer = () => {
  return (
    <div className="project-page">
      <Link to="/projects" className="back-link">← Projects</Link>

      <header className="project-header">
        <h1 className="project-title">Phonon Viewer</h1>
        <p className="project-subtitle">Interactive phonon visualization for κALDo</p>
        <div className="project-meta">
          <span className="project-tag">Python</span>
          <span className="project-tag">Visualization</span>
          <span className="project-tag">Lattice Dynamics</span>
          <a
            href="https://github.com/nanotheorygroup/kaldo"
            target="_blank"
            rel="noopener noreferrer"
            className="project-github-link"
          >
            View κALDo on GitHub →
          </a>
        </div>
      </header>

      <PhononViewerWidget />

      <section className="project-section">
        <h2>Overview</h2>
        <p>
          This phonon viewer is using output from {' '}
          <a href="https://github.com/nanotheorygroup/kaldo" target="_blank" rel="noopener noreferrer">
            κALDo
          </a>
          , an open-source Python package for lattice dynamics and thermal transport
          simulations in crystalline and amorphous materials. κALDo outputs the trajectory of the atoms
          using the eigenmodes of the harmonic Hamiltonian, and the site here puts it in a stylized viewport.
          Featured here are a few materials that I've studied during my PhD.
        </p>
      </section>

      <section className="project-section">
        <h2>What is a Phonon?</h2>
        <p>
          Phonons are quantized vibrations of atoms in a crystal lattice — the
          collective, wave-like oscillations that carry heat through a solid.
          The unit cell of a crystal lattice has <span dangerouslySetInnerHTML={renderKaTeX('3N')} /> normal modes of vibration.
          Phonons represent a traveling excitation of one of these normal modes,
          and their energies change with the exact direction <span dangerouslySetInnerHTML={renderKaTeX('\\vec{k}')} /> and spatial frequency{' '}
          <span dangerouslySetInnerHTML={renderKaTeX('|k|')} /> of their travel.
          <br></br>
          <br></br>
          In the visualization above, I am showing all the phonon modes at a specific choice of{' '}
          <span dangerouslySetInnerHTML={renderKaTeX('\\vec{k}')} />, specifically not chosen to be the{' '}
          <span dangerouslySetInnerHTML={renderKaTeX('\\Gamma')} /> point
          (where <span dangerouslySetInnerHTML={renderKaTeX('\\Gamma')} /> is the name for the wavevector{' '}
          <span dangerouslySetInnerHTML={renderKaTeX('\\vec{k}=\\vec{0}')} />) so that the acoustic modes are visible.
          <br></br>
          <br></br>
          Understanding phonon dispersion (how phonon frequencies vary with
          their wavevector) is central to predicting thermal conductivity and 
          other thermodynamic properties of materials.
        </p>
      </section>

      <section className="project-section">
        <h2>My Contributions to κALDo</h2>
        <p>
          I contributed directly to the κALDo codebase across several areas:
        </p>
        <ul>
          <li>
            <strong>Core component implementation</strong> — worked on key parts of the lattice dynamics pipeline, 
            including parallelizing the calculation of force constants through finite difference
            and calculating various phonon properties, like the participation ratio.
          </li>
          <li>
            <strong>Non-analytical correction (NAC)</strong> — I led the full
            implementation of the non-analytical correction functionality, which
            accounts for the long-range dipole–dipole interactions in polar
            materials and is essential for accurately capturing the LO-TO splitting
            near the Γ-point in phonon dispersion. Checkout the corrected dispersion of MgO at -reference-
          </li>
        </ul>
      </section>
    </div>
  );
};

export default PhononViewer;
