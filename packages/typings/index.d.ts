export interface AdonisPath {
  rootFolder: string;
  gallery: string;
  galleryThumbnail: string;
  galleryThumbnailBlur: string;
}

export type AdonisOrderedTriple = {
  gallery: string;
  gallery_thumbnail: string;
  gallery_thumbnail_blur: string;
};

export interface AdonisImage extends AdonisOrderedTriple {
  fileName: string;
  uuid: string;
}

export interface HefestoConfig {
  firebase?: FirebaseConfig;
  adonis?: AdonisConfig;
  branding?: BrandingConfig;
}

export interface FirebaseConfig {
  projectId: string;
  appId: string;
  storageBucket: string;
  locationId: string;
  apiKey: string;
  authDomain: string;
  messagingSenderId: string;
  measurementId: string;
}

export interface AdonisConfig {
  createBlur: boolean;
}

export interface BrandingConfig {
  companyName: string;
  companyWebsite: string;
  companyLogo: string;
}
