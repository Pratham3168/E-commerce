import { validationResult } from "express-validator";

const validationMiddleware = (req, res, next) => {
    const errors = validationResult(req);

    if(errors.isEmpty()){
        return next();
    }
    return res.status(400).json({
        success: false,
        errors: errors.array().map((error) => ({
            field: error.param,
            message: error.msg
        }))
    });
}

export default validationMiddleware;   