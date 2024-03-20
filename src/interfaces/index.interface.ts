export interface GalleryImage {
  id: string;
  imageUrl: string;
  name: string;
  width: number;
  height: number;
}

export interface GalleryImages {
  [key: string]: GalleryImage;
}

export interface Image {
  _id?: number;
  src: string;
}

// Interface för att hantera staten i en React-komponent som hanterar galleriet
export interface GalleryState {
  images: GalleryImage[];
  loading: boolean;
  error: Error | null;
}

export type LoginCredentials = {
  email: string;
  password: string;
};
