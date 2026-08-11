import { body } from "express-validator";

export const updateAddressValidator = [
    body("fullName")
        .trim()
        .optional(),

    body("phone")
        .trim()
        .optional()
        .matches(/^[6-9]\d{9}$/)
        .withMessage("Invalid phone number"),

    body("addressType")
        .optional()
        .isIn(["Home", "Work", "Other"])
        .withMessage("Invalid address type"),

    body("addressLine1")
        .trim()
        .optional(),

    body("addressLine2")
        .optional()
        .trim(),

    body("landmark")
        .optional()
        .trim(),

    body("city")
        .trim()
        .optional(),

    body("state")
        .trim()
        .optional(),

    body("postalCode")
        .trim()
        .optional()
        .matches(/^\d{6}$/)
        .withMessage("Invalid postal code"),

    body("country")
        .optional()
        .trim(),
];