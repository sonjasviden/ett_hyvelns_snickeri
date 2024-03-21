import { Container, Image as Img } from "react-bootstrap";
import useResponsiveView from "../hooks/useResponsiveView";
import { Gallery, Image } from "react-grid-gallery";
import useGetCollection from "../hooks/useGetCollection";
import { GalleryImage } from "../interfaces/index.interface";
import { galleryCol } from "../services/firebase";
import { MoonLoader } from "react-spinners";

const GalleryPage = () => {
  const isMobileView = useResponsiveView();

  const { data: galleryData, isLoading } =
    useGetCollection<GalleryImage>(galleryCol);

  const convertToImageFormat = (images: GalleryImage[]): Image[] => {
    return images.map((img) => ({
      src: img.imageUrl,
      width: img.width,
      height: img.height,
    }));
  };

  const photos = galleryData ? convertToImageFormat(galleryData) : [];

  return (
    <div className="galleryPage">
      <h1>Galleri</h1>
      {isLoading && (
        <div className="loading-spinner">
          <MoonLoader color="#fd7f32" />
        </div>
      )}

      <div className="gallery-bg">
        <Img src="/images/gallery-background.png" />
      </div>

      <Container>
        <div className="galleryGrid">
          <Gallery
            images={photos}
            enableImageSelection={false}
            rowHeight={500}
            margin={10}
          />
        </div>
      </Container>
    </div>
  );
};

export default GalleryPage;
