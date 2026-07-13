import { param } from "express-validator";

export const addToWishlistValidator = [
    param("productId")
        .isMongoId()
        .withMessage("Invalid product ID"),
];