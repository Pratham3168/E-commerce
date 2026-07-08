import { body } from 'express-validator';

const registerValidator = [
    body("firstName")
        .notEmpty()
        .withMessage("First name is required")
        .trim()
        .isString()
        .withMessage("Name must be a string")
        .bail(),
        

    body("lastName")
        .notEmpty()
        .withMessage("First name is required")
        .bail()
        .trim()
        .isString()
        .withMessage("Name must be a string"),
        
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .bail()
        .isEmail()
        .withMessage("Invalid email format")
        .normalizeEmail(),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .bail()
        .isLength({min : 8})
        .withMessage("Password must be atleast 8 characters Long")
        .matches(/[A-Z]/)
        .withMessage("Password Must contain atleast one uppercase letter")
        .matches(/[a-z]/)
        .withMessage("Password must contain atleast one lowercase letter")
        .matches(/[0-9]/)
        .withMessage("Password must contain atleast one number")
        .matches(/[!@#$%^&*]/)
        .withMessage("Password must contain atleast one special character"),

    body("phone")
        .notEmpty()
        .withMessage("Phone number is required")
        .bail()
        .matches(/^[6-9]\d{9}$/)
        .withMessage("Please enter a valid phone number")
]

export default registerValidator;