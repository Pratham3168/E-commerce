import { body, param } from 'express-validator';

export const updateOrderStatusValidator = [

    body("newStatus")
        .notEmpty()
        .withMessage("Status is required")
        .isIn(["Pending", "Confirmed", "Packed", "Shipped", "Delivered", "Cancelled"])
        .withMessage("Invalid status value"),
]