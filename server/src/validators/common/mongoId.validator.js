import { param } from "express-validator";

export const mongoIdValidator = (field, message =" Invalid ID") => [
    param(field)
        .isMongoId()
        .withMessage(message),
];