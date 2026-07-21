import { body } from "express-validator";

export const updateReviewValidator = [

    body("rating")
        .optional()
        .isInt({ min: 1, max: 5 })
        .withMessage("Rating must be between 1 and 5"),

    body("comment")
        .optional()
        .isString()
        .trim()
        .isLength({ max: 1000 })
        .withMessage("Comment cannot exceed 1000 characters"),

];