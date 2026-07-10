import {body} from 'express-validator';

export const createProductValidator = [
    body("name")
        .notEmpty()
        .withMessage("Product name is required")
        .trim(),

    body("description")
        .notEmpty()
        .withMessage("Product description is required")
        .trim(),
    
    body("categoryId")
        .notEmpty()
        .withMessage("Product category is required")
        .isMongoId()
        .withMessage("Invalid category ID"),
    
    body("brand")
        .notEmpty()
        .withMessage("Product brand is required"),

    body("price")
        .notEmpty()
        .withMessage("Product price is required")
        .isFloat({ gt: 0 })
        .withMessage("Product price must be a positive number"),
    
    body("discount")
        .optional()
        .isFloat({ min: 0, max: 100 })
        .withMessage("Discount must be a number between 0 and 100"),
    
    body("stock")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Stock must be a non-negative integer"),

    body("featured")
        .optional()
        .isBoolean()
        .withMessage("Featured must be a boolean value"),
]