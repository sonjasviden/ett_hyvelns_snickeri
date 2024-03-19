import { Image } from "react-bootstrap";
import useResponsiveView from "../hooks/useResponsiveView";

const AboutPage = () => {
  const isMobileView = useResponsiveView();

  return (
    <div className="aboutPage">
      <h1>Om oss</h1>

      {isMobileView ? (
        <>
          <div className="about-mobile">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. <br /> <br />{" "}
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
            <Image src="/images/about-img.png" />
          </div>
        </>
      ) : (
        <div className="desktop-view">
          <Image className="about-img" src="/images/about-img.png" />
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. <br /> <br /> Lorem
            Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </p>
          <div className="bottom-blobs">
            <Image className="green" src="/images/about-green-blob.png" />
            <Image className="purple" src="/images/about-purple-blob.png" />
            <Image className="blue" src="/images/about-blue-blob.png" />
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutPage;
