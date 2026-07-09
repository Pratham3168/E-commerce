import {body} from "express-validator";

export const updateCategoryValidator = [
    body("name")
        .optional()
        .notEmpty()
        .withMessage("Category name cannot be empty")
        .isLength({min: 3, max: 40})
        .trim(),
    
    body("description")
        .optional()
        .isLength({max: 400})
        .withMessage("Category description cannot exceed 400 characters")
        .trim()
];