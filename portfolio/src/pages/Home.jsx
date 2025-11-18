import { useState } from 'react';
import './Home.css';

const Home = () => {
  const [imageInteraction, setImageInteraction] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setImageInteraction({ x, y });
  };

  const handleMouseLeave = () => {
    setImageInteraction({ x: 0, y: 0 });
  };

  return (
    <div className="home">
      <div className="hero-section">
        <div
          className="image-container"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="interactive-image"
            style={{
              transform: `perspective(1000px) rotateX(${-imageInteraction.y}deg) rotateY(${imageInteraction.x}deg)`
            }}
          >
            <img src="/rad_ang.png" alt="Nicholas Lundgren" className="hero-image" />
          </div>
        </div>

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
