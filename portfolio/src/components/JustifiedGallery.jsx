import { useState, useEffect, useRef, useCallback } from 'react';
import './JustifiedGallery.css';

// Justified-row layout algorithm:
// Given measured image ratios and a container width, greedily pack figures into
// rows so each row fills the container exactly — no letterboxing, no cropping.
function buildRows(figures, containerWidth, targetRowHeight, gap) {
  const rows = [];
  let i = 0;

  while (i < figures.length) {
    // Greedily accumulate figures until row width exceeds container
    let rowFigures = [];
    let totalRatio = 0;

    while (i < figures.length) {
      const fig = figures[i];
      const ratio = fig.ratio ?? 4 / 3;
      totalRatio += ratio;
      rowFigures.push(fig);
      i++;

      const totalGap = gap * (rowFigures.length - 1);
      const rowWidth = totalRatio * targetRowHeight + totalGap;
      if (rowWidth >= containerWidth) break;
    }

    // Scale row height so all widths sum to containerWidth exactly
    const totalGap = gap * (rowFigures.length - 1);
    const rowHeight = (containerWidth - totalGap) / rowFigures.reduce((s, f) => s + (f.ratio ?? 4 / 3), 0);

    rows.push(rowFigures.map((fig) => ({
      ...fig,
      width: (fig.ratio ?? 4 / 3) * rowHeight,
      height: rowHeight,
    })));
  }

  return rows;
}

const JustifiedGallery = ({ figures, targetRowHeight = 260, gap = 12 }) => {
  const containerRef = useRef(null);
  const [ratios, setRatios] = useState({});
  const [containerWidth, setContainerWidth] = useState(0);

  // Measure image natural dimensions
  useEffect(() => {
    figures.forEach((fig) => {
      if (ratios[fig.src] != null) return;
      const img = new Image();
      img.onload = () => {
        if (img.naturalWidth && img.naturalHeight) {
          setRatios((prev) => ({
            ...prev,
            [fig.src]: img.naturalWidth / img.naturalHeight,
          }));
        }
      };
      img.src = fig.src;
      if (img.complete && img.naturalWidth) {
        setRatios((prev) => ({
          ...prev,
          [fig.src]: img.naturalWidth / img.naturalHeight,
        }));
      }
    });
  }, [figures]);

  // Track container width via ResizeObserver
  const measureContainer = useCallback(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    measureContainer();
    const ro = new ResizeObserver(measureContainer);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [measureContainer]);

  const figuresWithRatios = figures.map((fig) => ({
    ...fig,
    ratio: ratios[fig.src] ?? null,
  }));

  // Only lay out once we have at least some ratios and a width
  const rows = containerWidth > 0
    ? buildRows(figuresWithRatios, containerWidth, targetRowHeight, gap)
    : [];

  return (
    <div className="jg-container" ref={containerRef}>
      {rows.map((row, rowIdx) => (
        <div key={rowIdx} className="jg-row" style={{ gap: `${gap}px`, marginBottom: `${gap}px` }}>
          {row.map((fig) => (
            <figure
              key={fig.src}
              className="jg-figure"
              style={{ width: fig.width, flexShrink: 0 }}
            >
              <div className="jg-img-wrap" style={{ height: fig.height }}>
                <img
                  src={fig.src}
                  alt={fig.alt ?? fig.label}
                  className="jg-img"
                  draggable={false}
                />
              </div>
              <figcaption className="jg-caption">
                <span className="jg-fig-num">{fig.num}</span>
                <span className="jg-fig-label">{fig.label}</span>
                {fig.caption && <p className="jg-fig-caption">{fig.caption}</p>}
              </figcaption>
            </figure>
          ))}
        </div>
      ))}
    </div>
  );
};

export default JustifiedGallery;
