import {body} from 'express-validator';

const changePassValidator = [
    body("currentPassword")
        .notEmpty()
        .withMessage("Old password is required"),

    body("newPassword")
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
]

export default changePassValidator;