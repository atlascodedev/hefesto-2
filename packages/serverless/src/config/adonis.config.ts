import firebaseConfig from "./firebase.config";

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

export interface AdonisConfig {
  path: AdonisPath;
  createBlur: boolean;
  storageBucketPath: string;
  baseCloudURL: string;
}

export const adonisImagePath: AdonisPath = {
  rootFolder: "adonis", // Replace with constants package values
  gallery: "gallery", // Replace with constants package values
  galleryThumbnail: "gallery_thumbnail", // Replace with constants package values
  galleryThumbnailBlur: "gallery_thumbnail_blur", // Replace with constants package values
};

export const adonisConfig: AdonisConfig = {
  path: adonisImagePath, // Replace with constants package values
  createBlur: true, // Replace with global config
  storageBucketPath: firebaseConfig.storageBucket, // Remove in favor of global config
  baseCloudURL: "https://firebasestorage.googleapis.com/v0/b/", // Remove in favor of CONSTANTS
};

// DONT FORGET TO REPLICATE CHANGES HERE AT THE ADONIS.CONFIG.TS FILE INSIDE THE ./FUNCTIONS/SRC/CONFIG/
