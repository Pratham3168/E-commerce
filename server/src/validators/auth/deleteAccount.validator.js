import { body } from 'express-validator';

const deleteAccountValidator = [
    body("password")
        .notEmpty()
        .withMessage("Password is required")
]

export default deleteAccountValidator;