import { useState } from 'react';
import { Link } from 'react-router-dom';
import StlViewer from '../../components/StlViewer';
import './CadDesigns.css';
import './ProjectPage.css';

const MODELS = [
  {
    id: 'bratz_stand',
    label: 'Bratz Stand',
    file: '/cad/bratz_stand.stl',
    description: 'Display stand for Bratz dolls.',
  },
  {
    id: 'makeup_brush_holder',
    label: 'Makeup Brush Holder',
    file: '/cad/makeup_brush_holder.stl',
    description: 'Organizer for makeup brushes.',
  },
];

const CadDesigns = () => {
  const [selected, setSelected] = useState(MODELS[0]);

  return (
    <div className="project-page">
      <Link to="/projects" className="back-link">← Projects</Link>

      <header className="project-header">
        <h1 className="project-title">CAD Designs</h1>
        <p className="project-subtitle">3D models designed for print</p>
        <div className="project-meta">
          <span className="project-tag">CAD</span>
          <span className="project-tag">3D Printing</span>
        </div>
      </header>

      <div className="cad-viewer-widget">
        <div className="cad-viewer-header">
          <span className="cad-instrument-label">STL VIEWER</span>
          <span className="cad-divider">|</span>
          <label className="cad-model-picker">
            <span>Model</span>
            <select
              className="cad-model-select"
              value={selected.id}
              onChange={(e) => setSelected(MODELS.find((m) => m.id === e.target.value) || MODELS[0])}
            >
              {MODELS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <StlViewer url={selected.file} />

        <div className="cad-status-bar">
          <span className="cad-hint">drag to rotate · scroll to zoom</span>
          <span className="cad-status-sep">·</span>
          <span>{selected.label}</span>
        </div>
      </div>

      <section className="project-section">
        <h2>{selected.label}</h2>
        <p>{selected.description}</p>
      </section>
    </div>
  );
};

export default CadDesigns;
