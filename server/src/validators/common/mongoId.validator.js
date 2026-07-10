import { param } from "express-validator";

export const mongoIdValidator = [
    param("id")
        .isMongoId()
        .withMessage("Invalid product ID"),
];