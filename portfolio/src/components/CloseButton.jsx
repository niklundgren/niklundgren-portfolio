import './CloseButton.css';

const CloseButton = ({ onClick, 'aria-label': ariaLabel = 'Close', className }) => (
  <button
    type="button"
    className={className ? `close-btn ${className}` : 'close-btn'}
    onClick={onClick}
    aria-label={ariaLabel}
  >
    &#x2715;
  </button>
);

export default CloseButton;
