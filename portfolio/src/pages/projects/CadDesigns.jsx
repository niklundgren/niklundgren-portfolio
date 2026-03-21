import { Link } from 'react-router-dom';
import StlViewer from '../../components/StlViewer';
import './CadDesigns.css';
import './ProjectPage.css';

const MODELS = [
  {
    id: 'makeup_brush_holder',
    title: 'Makeup Brush Holder',
    file: '/cad/makeup_brush_holder.stl',
    eyebrow: 'Desk organizer',
    summary: 'A brush holder with a straightforward cylindrical layout meant for everyday use and easy cleanup.',
    body: 'The design focuses on a balance between capacity and print simplicity. Wide openings keep the brushes easy to grab, while the overall form stays rigid enough to print without complicated supports. It is the kind of small utility object where proportion and printability matter more than surface ornament.',
  },
  {
    id: 'bratz_stand',
    title: 'Bratz Stand',
    file: '/cad/bratz_stand.stl',
    eyebrow: 'Display fixture',
    summary: 'A compact display stand sized to hold a Bratz doll upright without hiding the silhouette of the outfit.',
    body: 'This piece was designed around stability first: a footprint wide enough to stay planted on a shelf, with a simple geometry that prints cleanly and can be reproduced quickly. The goal was to make something functional but visually quiet, so the stand supports the doll without competing with it.',
  },
];

const CadDesigns = () => {
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

      <section className="cad-storyboard" aria-label="CAD model gallery">
        {MODELS.map((model, index) => (
          <article
            key={model.id}
            className={`cad-story-chunk ${index % 2 === 1 ? 'cad-story-chunk-reversed' : ''}`}
          >
            <div className="cad-story-viewer">
              <div className="cad-viewer-shell">
                <div className="cad-viewer-header">
                  <span className="cad-instrument-label">STL VIEWER</span>
                  <span className="cad-divider">|</span>
                  <span className="cad-model-name">{model.title}</span>
                </div>

                <StlViewer
                  url={model.file}
                  overlayLabel={`Click to interact with ${model.title}`}
                />

                <div className="cad-status-bar">
                  <span className="cad-hint">click to enable · drag to rotate · scroll to zoom</span>
                  <span className="cad-status-sep">·</span>
                  <span>{model.eyebrow}</span>
                </div>
              </div>
            </div>

            <div className="cad-story-copy">
              <p className="cad-story-eyebrow">{model.eyebrow}</p>
              <h2>{model.title}</h2>
              <p className="cad-story-summary">{model.summary}</p>
              <p>{model.body}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default CadDesigns;
