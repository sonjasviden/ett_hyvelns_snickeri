import { Image } from "react-bootstrap";
import useResponsiveView from "../hooks/useResponsiveView";

const HomePage = () => {
  const isMobileView = useResponsiveView();

  return (
    <div className="homepage">
      {isMobileView ? (
        <>
          <div className="homepage-logo">
            <Image src="/images/logo.png" />
          </div>

          <p>
            Kalkbruksgatan 4B <br />
            417 70 Göteborg
          </p>

          <div className="mobile-bottoms">
            <Image className="stool" src="/images/stool-homepage-mobile.png" />
            <Image className="blob" src="/images/blue-blob-mobile.png" />
          </div>
        </>
      ) : (
        <>
          <div className="homepage-middle">
            <Image className="stool" src="/images/stool-homepage.png" />
            <Image className="chair" src="/images/chair-homepage.png" />
          </div>

          <div className="logo-box">
            <div className="homepage-logo">
              <Image className="logo" src="/images/logo.png" />
            </div>
            <p>
              Kalkbruksgatan 4B <br />
              417 70 Göteborg
            </p>
          </div>

          <div className="homepage-bottom">
            <div className="yellow">
              <Image src="/images/yellow-blob.png" />
            </div>
            <div className="orange">
              <Image src="/images/orange-blob.png" />
            </div>
            <div className="blue">
              <Image src="/images/blue-blob.png" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
