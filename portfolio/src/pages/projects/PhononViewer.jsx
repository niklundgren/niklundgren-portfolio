import { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './PhononViewer.css';
import './ProjectPage.css';

const MATERIALS = {
  silicene_25x25: {
    label: 'Silicene',
    detail: '25×25 supercell',
    formula: 'Si',
    modes: [0, 1, 2, 3, 4, 5],
  },
  silicene_4x4: {
    label: 'Silicene',
    detail: '4×4 supercell',
    formula: 'Si',
    modes: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  },
  bilayer_silicene_4x4: {
    label: 'Bilayer Silicene',
    detail: '4×4 supercell',
    formula: 'Si₂',
    modes: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
  },
  silicon_3x3x3: {
    label: 'Silicon (Diamond)',
    detail: '3×3×3 supercell',
    formula: 'Si',
    modes: [2, 3, 4, 5],
  },
  mgo_3x3x3: {
    label: 'MgO',
    detail: '3×3×3 supercell',
    formula: 'MgO',
    modes: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
  },
};

const PhononViewerWidget = () => {
  const [material, setMaterial] = useState('silicene_25x25');
  const [mode, setMode] = useState(0);
  const [paused, setPaused] = useState(false);
  const iframeRef = useRef(null);
  const observerRef = useRef(null);

  const current = MATERIALS[material];
  const src = `/phonon-viewer/${material}/mode_${mode}.html`;

  const changeMaterial = (val) => {
    setMaterial(val);
    setMode(0);
    setPaused(false);
  };

  const changeMode = (m) => {
    setMode(m);
    setPaused(false);
  };

  // After iframe loads, watch the iframe's own playbtn for text changes
  // so both buttons stay in sync no matter which one is clicked.
  const handleIframeLoad = useCallback(() => {
    observerRef.current?.disconnect();
    try {
      const playBtn = iframeRef.current?.contentWindow?.document.getElementById('playbtn');
      if (!playBtn) return;
      observerRef.current = new MutationObserver(() => {
        // "Pause" text means it's currently playing; "Play" means paused
        setPaused(playBtn.textContent.trim() === 'Play');
      });
      observerRef.current.observe(playBtn, { childList: true, subtree: true, characterData: true });
    } catch (_) {}
  }, []);

  const handlePauseToggle = () => {
    try {
      iframeRef.current?.contentWindow?.togglePlay();
    } catch (_) {}
    // State update comes from the MutationObserver, not set here
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
          ref={iframeRef}
          src={src}
          title={`${current.label} phonon mode ${mode}`}
          className="pv-iframe"
          onLoad={handleIframeLoad}
        />
        <div className="pv-scanlines" aria-hidden="true" />
        <div className="pv-vignette" aria-hidden="true" />
      </div>

      <div className="pv-status-bar">
        <button
          className={`pv-pause-btn${paused ? ' paused' : ''}`}
          onClick={handlePauseToggle}
          title={paused ? 'Resume' : 'Pause'}
        >
          {paused ? '⏸' : '▶'}
        </button>

        <span className={`pv-status-item${paused ? ' paused' : ''}`}>
          <span className="pv-status-dot" />
          {paused ? 'PAUSED' : 'LIVE'}
        </span>
        <span className="pv-status-sep">·</span>
        <span>{current.formula} / {current.detail}</span>
        <span className="pv-status-sep">·</span>
        <span>MODE {String(mode).padStart(2, '0')}</span>
        <span className="pv-status-sep">·</span>
        <span className="pv-status-dim">κALDo lattice dynamics</span>
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
          Phonon Viewer is a visualization tool built to work alongside{' '}
          <a href="https://github.com/nanotheorygroup/kaldo" target="_blank" rel="noopener noreferrer">
            κALDo
          </a>
          , an open-source Python package for lattice dynamics and thermal transport
          simulations in crystalline and amorphous materials. The viewer makes it
          possible to interactively inspect phonon modes computed by κALDo.
        </p>
      </section>

      <section className="project-section">
        <h2>My Contributions to κALDo</h2>
        <p>
          Beyond building the viewer, I contributed directly to the κALDo codebase
          across several areas:
        </p>
        <ul>
          <li>
            <strong>Core component implementation</strong> — worked on key parts of
            the lattice dynamics pipeline, including force constant handling and
            phonon property calculations.
          </li>
          <li>
            <strong>Non-analytical correction (NAC)</strong> — led the full
            implementation of the non-analytical correction functionality, which
            accounts for the long-range dipole–dipole interactions in polar
            materials and is essential for accurately capturing the LO-TO splitting
            near the Γ-point in phonon dispersion.
          </li>
        </ul>
      </section>

      <section className="project-section">
        <h2>What is a Phonon?</h2>
        <p>
          Phonons are quantized vibrations of atoms in a crystal lattice — the
          collective, wave-like oscillations that carry heat through a solid.
          Understanding phonon dispersion (how phonon frequencies vary with
          wavevector) is central to predicting thermal conductivity and other
          thermodynamic properties of materials.
        </p>
      </section>
    </div>
  );
};

export default PhononViewer;
