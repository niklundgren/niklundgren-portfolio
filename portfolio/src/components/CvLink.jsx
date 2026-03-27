const CV_PATH = '/Nicholas_Lundgren_CV.pdf';

const isMobileBrowser = () => {
  if (typeof navigator === 'undefined') {
    return false;
  }

  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
};

const triggerDesktopDownload = () => {
  const anchor = document.createElement('a');
  anchor.href = CV_PATH;
  anchor.download = 'Nicholas_Lundgren_CV.pdf';
  anchor.rel = 'noopener';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
};

const openMobilePdf = () => {
  window.open(CV_PATH, '_blank', 'noopener,noreferrer');
};

const CvLink = ({ className, children }) => {
  const handleClick = (event) => {
    event.preventDefault();

    if (isMobileBrowser()) {
      openMobilePdf();
      return;
    }

    triggerDesktopDownload();
  };

  return (
    <a
      href={CV_PATH}
      className={className}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

export default CvLink;
