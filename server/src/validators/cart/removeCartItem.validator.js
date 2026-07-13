import { param} from "express-validator";

export const removeCartItemValidator = [
    param("productId")
        .notEmpty()
        .withMessage("Product ID is required")
        .isMongoId()
        .withMessage("Invalid Product ID"),
];

