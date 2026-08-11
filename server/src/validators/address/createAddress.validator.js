import { body } from "express-validator";

export const createAddressValidator = [
    body("fullName")
        .trim()
        .notEmpty()
        .withMessage("Full name is required"),

    body("phone")
        .trim()
        .matches(/^[6-9]\d{9}$/)
        .withMessage("Invalid phone number"),

    body("addressType")
        .optional()
        .isIn(["Home", "Work", "Other"])
        .withMessage("Invalid address type"),

    body("addressLine1")
        .trim()
        .notEmpty()
        .withMessage("Address Line 1 is required"),

    body("addressLine2")
        .optional()
        .trim(),

    body("landmark")
        .optional()
        .trim(),

    body("city")
        .trim()
        .notEmpty()
        .withMessage("City is required"),

    body("state")
        .trim()
        .notEmpty()
        .withMessage("State is required"),

    body("postalCode")
        .trim()
        .matches(/^\d{6}$/)
        .withMessage("Invalid postal code"),

    body("country")
        .optional()
        .trim(),
];