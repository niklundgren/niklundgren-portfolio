import './Home.css';
import ImageCarousel from '../components/ImageCarousel';

const carouselImages = [
  {
    src: '/rad_ang.png',
    label: 'Radial and Angular Distribution of aSiGe',
    caption: 'Angular and radial distribution of amorphous silicon germanium alloys. Inset diagrams with pink nuclei to help explain the physical meaning of the quantity.',
    alt: 'Radial/Angular distribution plot',
  },
  {
    src: '/xls-dispersion.png',
    label: 'Silicene Phonon Dispersion and DoS',
    caption: 'Phonon dispersion relations and phonon density of states in monolayer (MLS) and bilayer (BLS) silicene computed via two methods (Lattice Dynamics and Molecular Dynamics).',
    alt: 'Phonon dispersion curves of 2D silicon phases',
  },
  {
    src: '/xls-rmse.png',
    label: 'Parity plot of Machine Learning Interatomic Potential for silicon',
    caption: 'Force from MLIP (NEP) vs. DFT reference across silicon phases. Plot colors corresponded to phases illustrated on either side of the central figure.',
    alt: 'Silicon phases force RMSE plot',
  },
];

const Home = () => {
  return (
    <div className="home">
      <div className="hero-section">

        <div className="hero-visual">
          <ImageCarousel images={carouselImages} />
        </div>

        <div className="hero-content">
          <p className="hero-eyebrow">Chemical Physicist · PhD Candidate</p>
          <h1 className="hero-title">Nicholas<br />W. Lundgren</h1>
          <p className="hero-description">
            Modeling thermal transport in semiconductors and developing cutting-edge
            heat transport software. Passionate about machine learning, data visualization,
            and high-performance computing.
          </p>
          <div className="hero-highlights">
            <div className="highlight-item">
              <strong>Expected PhD</strong>
              <span>June 2026</span>
            </div>
            <div className="highlight-item">
              <strong>Specialty</strong>
              <span>Lattice Thermal Transport</span>
            </div>
            <div className="highlight-item">
              <strong>Developer</strong>
              <span>κALDo Lattice Dynamics</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
