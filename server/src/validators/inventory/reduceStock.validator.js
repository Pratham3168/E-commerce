import {body} from "express-validator";

export const reduceStockValidator = [
    body("quantity")
        .notEmpty()
        .withMessage("Quantity is required")
        .isInt({ min: 1 })
        .withMessage("Quantity must be a positive integer"),

    body("reason")
        .optional()
        .isString()
        .trim()
        .withMessage("Reason must be a string"),
];