import { v2 as cloudinary } from "cloudinary";
import ApiError from "../errors/apiError.js";



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const uploadToCloudinary = async (filePath, folder = "ecommerce/products") => {
  try {
    

    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: "image",
    });

    

    return {
      public_id: result.public_id,
      url: result.secure_url,
    };
  } catch (error) {
    console.error("Cloudinary Error:");
    console.dir(error, { depth: null });

    throw new ApiError(
      500,
      `Failed to upload image to Cloudinary: ${error.message}`
    );
  }
};

export const deleteFromCloudinary = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        throw new ApiError(error.statusCode ,`Failed to delete image from Cloudinary: ${error.message}`);
    }
};
