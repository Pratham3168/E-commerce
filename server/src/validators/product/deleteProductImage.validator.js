import { param } from "express-validator";

export const deleteProductImageValidator = [
  param("productId")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Invalid Product ID"),

  param("imageId")
    .notEmpty()
    .withMessage("Image ID is required")
    .isMongoId()
    .withMessage("Invalid Image ID"),
];