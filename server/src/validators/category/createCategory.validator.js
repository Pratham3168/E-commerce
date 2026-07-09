import { body } from 'express-validator';

export const createCategoryValidator = [
    body("name")
        .notEmpty()
        .withMessage("Category name is required")
        .trim()
        .isLength({min: 2, max:40})
        .withMessage("Category name must be between 2 and 40 characters"),

    body("description")
        .optional()
        .trim()
        .isLength({max:400})
        .withMessage("Category description must be less than 400 characters"),
]