import './SectionDivider.css';

// num is optional — if provided renders "§ {num} — {title}", otherwise just "{title}"
const SectionDivider = ({ num, title }) => (
  <div className="section-divider">
    <span className="section-divider-label">
      {num ? `§ ${num} — ${title}` : title}
    </span>
    <div className="section-divider-rule" />
  </div>
);

export default SectionDivider;
