import {body} from 'express-validator';

export const adjustStockValidator = [
    body("newStock")
        .notEmpty()
        .withMessage("New stock is required")
        .isInt({ min: 0 })
        .withMessage("New stock must be a non-negative integer"),

    body("reason")
        .notEmpty()
        .withMessage("Reason is required")
        .isString()
        .trim()
        .withMessage("Reason must be a string"),
];