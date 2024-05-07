import { v2 as cloudinary } from "cloudinary";
//import dotenv from 'dotenv';
//dotenv.config;

 const CLOUD_NAME = "dvvduygrm";
const API_KEY = "471551555295284";
const API_SECRET = "937OASOHUxiGATOcPy5B27_D0Lk";

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

interface CloudinaryUploadResult {
  url: string;
  asset_id: string;
  public_id: string;
}

interface CloudinaryDeleteResult {
  url: string;
  asset_id: string;
  public_id: string;
}

const cloudinaryDeleteImg = async (
  fileToDelete: string
): Promise<CloudinaryDeleteResult> => {
  return new Promise((resolve) => {
    cloudinary.uploader.destroy(fileToDelete, (result) => {
      resolve({
        url: result.secure_url,
        asset_id: result.asset_id,
        public_id: result.public_id,
      });
    });
  });
};

export { cloudinary };
