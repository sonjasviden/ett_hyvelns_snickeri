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
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const reorder = (list: any[], startIndex: number, endIndex: number): any[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const AdminGalleryPage = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [message, setMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [items, setItems] = useState(images);

  const {
    data: galleryData,
    getData,
    isLoading,
    setIsLoading,
  } = useGetCollection<GalleryImage>(galleryCol);

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(newItems);
  };

  useEffect(() => {
    if (galleryData) {
      setImages(galleryData);
      setItems(galleryData);
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

      {isLoading && (
        <div className="loading-spinner">
          <MoonLoader color="#6c8c97" />
        </div>
      )}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="galleryDroppable"
          direction="horizontal"
          isCombineEnabled
        >
          {(provided) => (
            <Col {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((image, index) => (
                <Draggable key={image.id} draggableId={image.id} index={index}>
                  {(provided) => (
                    <div
                      className="image-box"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Image
                        onClick={() => handleDeleteImage(image)}
                        className="deleteIcon"
                        src="/images/deleteIcon-gallery.png"
                      />
                      <Image className="gallery-img" src={image.imageUrl} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Col>
          )}
        </Droppable>
      </DragDropContext>

      <GalleryUpload
        setImages={setImages}
        onImageUploadSuccess={handleImageUploadSuccess}
      />
    </div>
  );
};

export default AdminGalleryPage;
