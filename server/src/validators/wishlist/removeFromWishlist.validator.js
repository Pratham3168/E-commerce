import { param } from "express-validator";

export const removeFromWishlistValidator = [
    param("productId")
        .isMongoId()
        .withMessage("Invalid product ID"),
];