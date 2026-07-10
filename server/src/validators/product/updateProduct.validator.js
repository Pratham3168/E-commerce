import { body } from "express-validator";

export const updateProductValidator = [
    body("name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Product name cannot be empty"),

    body("description")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Description cannot be empty"),

    body("category")
        .optional()
        .isMongoId()
        .withMessage("Invalid category ID"),

    body("brand")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Brand cannot be empty"),

    body("price")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Price must be greater than or equal to 0"),

    body("discountPercentage")
        .optional()
        .isFloat({ min: 0, max: 100 })
        .withMessage("Discount percentage must be between 0 and 100"),

    body("stock")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Stock cannot be negative"),

    body("isFeatured")
        .optional()
        .isBoolean()
        .withMessage("isFeatured must be a boolean"),
];