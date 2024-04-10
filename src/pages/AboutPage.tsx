import { Button, Image } from "react-bootstrap";
import useResponsiveView from "../hooks/useResponsiveView";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const isMobileView = useResponsiveView();
  const navigate = useNavigate();

  return (
    <div className="aboutPage">
      <h1>Om oss</h1>

      {isMobileView ? (
        <>
          <div className="about-mobile">
            <p>
              Vi är ett litet (men hyvelns) snickeri på Ringön. I dagsläget är
              vi 1 anställd som gärna hjälper er med era möbelbehov. Vägghängda,
              fristående eller platsbyggda spelar oss ingen roll. Skicka gärna
              en förfrågan så skissar vi upp ett förslag. <br />
              <Button onClick={() => navigate("/kontakt")}>Kontakta oss</Button>
            </p>
            <Image src="/images/about-img.png" />
          </div>
        </>
      ) : (
        <>
          <div className="desktop-view">
            <Image className="about-img" src="/images/about-img.png" />
            <p>
              Vi är ett litet (men hyvelns) snickeri på Ringön. I dagsläget är
              vi 1 anställd som gärna hjälper er med era möbelbehov. Vägghängda,
              fristående eller platsbyggda spelar oss ingen roll. Skicka gärna
              en förfrågan så skissar vi upp ett förslag. <br />
              <Button onClick={() => navigate("/kontakt")}>Kontakta oss</Button>
            </p>
            <div className="bottom-blobs">
              <Image className="green" src="/images/about-green-blob.png" />
              <Image className="purple" src="/images/about-purple-blob.png" />
              <Image className="blue" src="/images/about-blue-blob.png" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AboutPage;
