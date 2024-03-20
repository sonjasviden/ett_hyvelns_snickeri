import React, { ChangeEvent, useRef, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { MoonLoader } from "react-spinners";
import { GalleryImage } from "../interfaces/index.interface";
import { db, storage } from "../firebase/firebase";

interface ImageUploadProp {
  setImages: React.Dispatch<React.SetStateAction<GalleryImage[]>>;
  onImageUploadSuccess: (uploadedImage: GalleryImage) => void;
}

const GalleryUpload: React.FC<ImageUploadProp> = ({ setImages }) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getImageDimensions = (
    file: File
  ): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    setUploading(true);
    const filesArray: File[] = Array.from(e.target.files);

    const uploadPromises = filesArray.map(async (file) => {
      const storageRef = ref(storage, `gallery/${file.name}`);
      const uploadTaskSnapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);
      const dimensions = await getImageDimensions(file);

      const newImage: GalleryImage = {
        id: uploadTaskSnapshot.ref.name,
        imageUrl: downloadURL,
        width: dimensions.width,
        height: dimensions.height,
        name: file.name,
      };
      await setDoc(doc(db, "gallery", newImage.id), newImage);
      return newImage;
    });

    const newImages = await Promise.all(uploadPromises);
    setImages((prevImages) => [...prevImages, ...newImages]);

    setUploading(false);
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        multiple
        disabled={uploading}
        style={{ display: "none" }}
      />
      <div className="upload-btn">
        <button onClick={handleButtonClick} disabled={uploading}>
          {uploading ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ marginRight: "10px", marginBottom: 0 }}>
                Laddar upp...
              </p>
              <MoonLoader color="#fff7ea" size={18} />
            </div>
          ) : (
            "Ladda upp bild(er)"
          )}
        </button>
      </div>
    </>
  );
};

export default GalleryUpload;
