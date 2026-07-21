import { Router } from "express";

import protect from "../middlewares/auth.middleware.js";
import validationMiddleware from "../middlewares/validation.middleware.js";

import { createReviewController, deleteReviewController, getProductReviewsController, updateProductReviewController } from "../controllers/review/review.controller.js";

import { createReviewValidator } from "../validators/review/createReview.validator.js";
import { mongoIdValidator } from "../validators/common/mongoId.validator.js";
import { updateReviewValidator } from "../validators/review/updateReview.validator.js";

const router = Router();

router.post(
    "/products/:productId",
    protect,
    mongoIdValidator("productId", "Invalid product ID"),
    createReviewValidator,
    validationMiddleware,
    createReviewController
);

router.get(
    "/products/:productId",
    mongoIdValidator("productId", "Invalid product ID"),
    validationMiddleware,
    getProductReviewsController
);


router.patch(
    "/:reviewId",
    protect,
    mongoIdValidator("reviewId", "Invalid review ID"),
    updateReviewValidator,
    validationMiddleware,
    updateProductReviewController
);

router.delete(
    "/:reviewId",
    protect,
    mongoIdValidator("reviewId", "Invalid review ID"),
    validationMiddleware,
    deleteReviewController
);

export default router;