import { useEffect, useState } from 'react';
import './ImageCarousel.css';

// Resting positions (left %) for the 3 slots
// curr: occupies 9%–91% (center of viewport)
// prev/next: scaled 0.78, so visual width = 82*0.78 = 63.96%
// prev visual right edge lands at 50% (center of curr): left = 50 - 72.98 ≈ -23
// next visual left edge lands at 50%: left = 50 - 9.02 ≈ 41
const REST = { prev: -23, curr: 9, next: 41 };

const ImageCarousel = ({ images }) => {
  const N = images.length;
  const [currentIndex, setCurrentIndex] = useState(0); // drives header/footer/pips — updates immediately
  const [slotCenter, setSlotCenter] = useState(0);     // drives slot content — updates after animation
  const [positions, setPositions] = useState(REST);
  const [slotVisual, setSlotVisual] = useState({ prev: 'side', curr: 'center', next: 'side' });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [noTransition, setNoTransition] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [imageRatios, setImageRatios] = useState(() => images.map(() => null));

  useEffect(() => {
    let cancelled = false;

    setImageRatios(images.map(() => null));

    images.forEach((image, index) => {
      const img = new Image();

      const applyRatio = () => {
        if (cancelled || !img.naturalWidth || !img.naturalHeight) return;
        const ratio = img.naturalWidth / img.naturalHeight;
        setImageRatios((prev) => {
          if (prev[index] === ratio) return prev;
          const next = [...prev];
          next[index] = ratio;
          return next;
        });
      };

      img.onload = applyRatio;
      img.src = image.src;

      if (img.complete) {
        applyRatio();
      }
    });

    return () => {
      cancelled = true;
    };
  }, [images]);

  const navigate = (dir) => {
    if (isTransitioning) return;
    const newIndex = dir === 'next' ? (currentIndex + 1) % N : (currentIndex - 1 + N) % N;

    setCurrentIndex(newIndex);
    setIsTransitioning(true);
    setTilt({ x: 0, y: 0 });

    if (dir === 'next') {
      setPositions({ prev: -93, curr: -93, next: 9 });
      setSlotVisual({ prev: 'side', curr: 'side', next: 'center' });
    } else {
      setPositions({ prev: 9, curr: 81, next: 81 });
      setSlotVisual({ prev: 'center', curr: 'side', next: 'side' });
    }

    setTimeout(() => {
      // Disable CSS transition, snap positions back, swap content
      setNoTransition(true);
      setPositions(REST);
      setSlotVisual({ prev: 'side', curr: 'center', next: 'side' });
      setSlotCenter(newIndex);
      // Re-enable transition after two frames (ensures snap renders before re-enabling)
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setNoTransition(false);
          setIsTransitioning(false);
        })
      );
    }, 370);
  };

  const handleMouseMove = (e) => {
    if (isTransitioning) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const prevIndex = (slotCenter - 1 + N) % N;
  const nextIndex = (slotCenter + 1) % N;
  const current = images[currentIndex];
  const figNum = String(currentIndex + 1).padStart(2, '0');
  const total = String(N).padStart(2, '0');
  const fallbackRatio = imageRatios[currentIndex] ?? 4 / 3;
  const smallestRatio = imageRatios.reduce((min, ratio) => {
    if (!ratio) return min;
    return min === null ? ratio : Math.min(min, ratio);
  }, null);
  const viewportAspectRatio = (smallestRatio ?? fallbackRatio) / 0.82;

  const slotStyle = (pos, imageIndex, withTilt = false) => ({
    left: `${pos}%`,
    '--slide-aspect-ratio': imageRatios[imageIndex] ?? fallbackRatio,
    '--interactive-transform': withTilt
      ? `perspective(1000px) rotateX(${-tilt.y}deg) rotateY(${tilt.x}deg)`
      : 'none',
    ...(noTransition && { transition: 'none' }),
  });

  return (
    <div className="carousel-wrapper">

      <div className="carousel-header">
        <span className="fig-counter">FIG. {figNum} / {total}</span>
        <span className="fig-label-text">{current.label}</span>
        <div className="header-line" />
      </div>

      <div
        className="carousel-viewport"
        style={{ aspectRatio: viewportAspectRatio }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Prev slot */}
        <div className={`slide-slot ${slotVisual.prev}`} style={slotStyle(positions.prev, prevIndex)}>
          <img src={images[prevIndex].src} alt={images[prevIndex].alt} className="carousel-img" draggable={false} />
        </div>

        {/* Curr slot — carries tilt transform + scan + reticles */}
        <div className={`slide-slot ${slotVisual.curr}`} style={slotStyle(positions.curr, slotCenter, true)}>
          <img src={images[slotCenter].src} alt={images[slotCenter].alt} className="carousel-img" draggable={false} />
          <div className="scan-sweep" />
        </div>

        {/* Next slot */}
        <div className={`slide-slot ${slotVisual.next}`} style={slotStyle(positions.next, nextIndex)}>
          <img src={images[nextIndex].src} alt={images[nextIndex].alt} className="carousel-img" draggable={false} />
        </div>

        {/* Corner reticles — fixed to viewport, aligned to curr-slot edges */}
        <div className="reticle tl" />
        <div className="reticle tr" />
        <div className="reticle bl" />
        <div className="reticle br" />

        {/* Nav buttons overlaid on viewport */}
        <button className="carousel-nav prev" onClick={() => navigate('prev')} aria-label="Previous figure">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button className="carousel-nav next-btn" onClick={() => navigate('next')} aria-label="Next figure">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className="carousel-footer">
        <p className="carousel-caption">{current.caption}</p>
        <div className="carousel-track">
          {images.map((_, i) => (
            <button
              key={i}
              className={`track-pip ${i === currentIndex ? 'active' : ''}`}
              onClick={() => i !== currentIndex && navigate(i > currentIndex ? 'next' : 'prev')}
              aria-label={`Figure ${i + 1}`}
            />
          ))}
        </div>
      </div>

    </div>
  );
};

export default ImageCarousel;
