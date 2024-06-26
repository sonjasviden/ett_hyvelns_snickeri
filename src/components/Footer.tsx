import useResponsiveView from "../hooks/useResponsiveView";

const Footer = () => {
  const isMobileView = useResponsiveView();

  return (
    <div className="footer-box">
      {!isMobileView && (
        <div className="footer">
          <p>© {new Date().getFullYear()} Ett Hyvelns Snickeri AB</p>
        </div>
      )}
    </div>
  );
};

export default Footer;
