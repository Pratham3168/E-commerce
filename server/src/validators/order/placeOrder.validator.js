import { body } from "express-validator";

export const placeOrderValidator = [
  body("shippingAddress.fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required"),

  body("shippingAddress.phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Invalid phone number"),

  body("shippingAddress.addressLine1")
    .trim()
    .notEmpty()
    .withMessage("Address Line 1 is required"),

  body("shippingAddress.addressLine2")
    .optional()
    .trim(),

  body("shippingAddress.city")
    .trim()
    .notEmpty()
    .withMessage("City is required"),

  body("shippingAddress.state")
    .trim()
    .notEmpty()
    .withMessage("State is required"),

  body("shippingAddress.postalCode")
    .trim()
    .notEmpty()
    .withMessage("Postal code is required")
    .isPostalCode("IN")
    .withMessage("Invalid postal code"),

  body("shippingAddress.country")
    .optional()
    .trim()
    .isString()
    .withMessage("Country must be a string"),

  body("paymentMethod")
    .optional()
    .isIn(["COD", "ONLINE"])
    .withMessage("Payment method must be either COD or ONLINE"),
];