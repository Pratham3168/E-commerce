
import { body } from 'express-validator';

//anyone of email or phone is required

const loginValidator = [        
    body("login")
        .trim()
        .notEmpty()
        .withMessage("Email or phone is required"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
]

export default loginValidator;