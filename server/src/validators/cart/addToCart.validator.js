import { body } from "express-validator";

export const addToCartValidator = [
    body("productId")
        .notEmpty()
        .withMessage("Product ID is required")
        .isMongoId()
        .withMessage("Invaid product ID"),

    body("quantity")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Quantity must be a positive integer")
]