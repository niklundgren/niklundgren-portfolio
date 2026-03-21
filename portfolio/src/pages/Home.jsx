import './Home.css';
import ImageCarousel from '../components/ImageCarousel';

const carouselImages = [
  {
    src: '/rad_ang.png',
    label: 'Radial Angular Distribution',
    caption: 'Angular-resolved radial distribution of phonon modes in semiconductor lattices',
    alt: 'Radial angular distribution plot',
  },
  {
    src: '/xls-dispersion.png',
    label: 'Equilibrium Phonon Dispersion',
    caption: 'Phonon dispersion relations computed via equilibrium lattice simulations',
    alt: 'Phonon dispersion curves',
  },
  {
    src: '/xls-rmse.png',
    label: 'Silicon Phases · Force RMSE',
    caption: 'Force RMSE vs. DFT reference across silicon phase configurations',
    alt: 'Silicon phases force RMSE plot',
  },
];

const Home = () => {
  return (
    <div className="home">
      <div className="hero-section">
        <ImageCarousel images={carouselImages} />

        <div className="hero-content">
          <h1 className="hero-title">Nicholas W. Lundgren</h1>
          <h2 className="hero-subtitle">Chemical Physicist • Python Developer • Data Scientist</h2>
          <p className="hero-description">
            Modeling thermal transport in semiconductors and developing cutting-edge
            heat transport software. Passionate about machine learning, data visualization,
            and high-performance computing.
          </p>
          <div className="hero-highlights">
            <div className="highlight-item">
              <strong>Expected PhD</strong>
              <span>December 2025</span>
            </div>
            <div className="highlight-item">
              <strong>Specialty</strong>
              <span>Heat Transport & Phonons</span>
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
