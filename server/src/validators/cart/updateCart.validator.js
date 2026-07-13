import { body, param } from "express-validator";

export const updateCartValidator =[
    param("productId")
        .isMongoId()
        .withMessage("Invalid product ID"),
    body("quantity")
        .isInt({ min: 1 })
        .withMessage("Quantity must be a positive integer")
]