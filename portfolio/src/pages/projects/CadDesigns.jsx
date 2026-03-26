import { Link } from 'react-router-dom';
import StlViewer from '../../components/StlViewer';
import './CadDesigns.css';
import './ProjectPage.css';

const MODELS = [
  {
    id: 'makeup_brush_holder',
    title: 'Makeup Brush Holder',
    file: '/cad/makeup_brush_holder.stl',
    eyebrow: 'Vanity Organizer',
    summary: 'A makeup brush holder with floral detailing.',
    body: `My wife wanted a place to store her makeup brushes in a new vanity we bought, so I designed this in Onshape with custom dimensions to fit the space precisely.
    There is a shelf inside to elevate the smaller brushes. To bring some life to it, I added a flower pattern with petals that curve away from the cup to make them pop.
    This was my first CAD design, and it took about 20 hours, mostly spent fussing over flower variations.`,
  },
  {
    id: 'bratz_stand',
    title: 'Bratz Stand',
    file: '/cad/bratz_stand.stl',
    eyebrow: 'Display fixture',
    summary: 'Collectible Doll Stand',
    body: `A friend of ours collects Bratz dolls and wanted a custom support. I figured out how to trace images in CAD for the first time so the lip-shaped base
    of the display stand perfectly matches the official Bratz logo. The design is visually quiet so it does not compete with the collectible itself.`,
  },
];

const CadDesigns = () => {
  return (
    <div className="project-page">
      <Link to="/projects" className="back-link">← Projects</Link>

      <header className="project-header">
        <h1 className="project-title">CAD Designs</h1>
        <p className="project-subtitle">3D Models Designed for Printing</p>
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
