import ApiError from '../errors/apiError.js';

const notFoundMiddleware = (req,res,next) => {
    const error = new ApiError(404, "Route not found");
    next(error);
}

export default notFoundMiddleware;