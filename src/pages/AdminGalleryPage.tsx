import { useEffect, useState } from "react";
import { Col, Image } from "react-bootstrap";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { MoonLoader } from "react-spinners";
import useGetCollection from "../hooks/useGetCollection";
import { GalleryImage } from "../interfaces/index.interface";
import { db, galleryCol, storage } from "../services/firebase";
import GalleryUpload from "../components/GalleryUpload";
import Logout from "../components/Logout";

const AdminGalleryPage = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [message, setMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  console.log("images", images);

  const {
    data: galleryData,
    getData,
    isLoading,
    setIsLoading,
  } = useGetCollection<GalleryImage>(galleryCol);

  useEffect(() => {
    if (galleryData) {
      setImages(galleryData);
    }
  }, [galleryData]);

  const deleteImage = async (imageName: string) => {
    try {
      const storageRef = ref(storage, `gallery/${imageName}`);
      await deleteObject(storageRef);
      const docRef = doc(db, "gallery", imageName);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error removing image: ", error);
      throw error;
    }
  };

  const handleDeleteImage = async (image: GalleryImage) => {
    try {
      setIsDeleting(true);
      await deleteImage(image.name);
      await getData();
      setIsLoading(false);
      setMessage("Bild raderad!");
      setTimeout(() => {
        setMessage("");
      }, 2500);
      setIsDeleting(false);
    } catch (error) {
      setMessage("Kunde tyvärr inte radera bilden, försök igen senare!");
      setIsDeleting(false);
    }
  };

  const handleImageUploadSuccess = (uploadedImage: GalleryImage) => {
    setImages((prevImages) => [...prevImages, uploadedImage]);
  };

  return (
    <div className="editGallery-view">
      <Col className="col-logout-heading">
        <Logout />
        <h1>Hantera galleriet</h1>
        {isDeleting ? (
          <div className="delete-image-indicator">
            <p>Raderar bild...</p>
            <MoonLoader color="#000000" size={18} />
          </div>
        ) : (
          <>
            {message && (
              <div className="delete-image-indicator">
                <p>Bild raderad!</p>
              </div>
            )}
          </>
        )}
      </Col>

      <Col>
        {isLoading && (
          <div className="loading-spinner">
            <MoonLoader color="#6c8c97" />
          </div>
        )}
        {images.map((image) => (
          <div key={image.id} className="image-box">
            <Image
              onClick={() => handleDeleteImage(image)}
              className="deleteIcon"
              src="/images/deleteIcon-gallery.png"
            />
            <Image className="gallery-img" src={image.imageUrl} />
          </div>
        ))}
      </Col>

      <GalleryUpload
        setImages={setImages}
        onImageUploadSuccess={handleImageUploadSuccess}
      />
    </div>
  );
};

export default AdminGalleryPage;
