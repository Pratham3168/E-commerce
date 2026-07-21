import * as reviewService from '../../services/review/review.service.js';
import ApiResponse from '../../utils/apiResponse.js';
import asyncHandler from '../../utils/asyncHandler.js'; 


export const createReviewController = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const productId = req.params.productId;
    const { rating, comment } = req.body;
    const reviewData = { user: userId, productId, rating, comment };

    const newReview = await reviewService.createReview(reviewData);

    return res.status(201).json(
        new ApiResponse(201, newReview, 'Review created successfully')
    );

})

export const getProductReviewsController = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    const result = await reviewService.getProductReviews(
        productId,
        req.query
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            result,
            "Product reviews fetched successfully"
        )
    );
});


export const updateProductReviewController = asyncHandler(async (req, res) => {

    const userId = req.user._id;
    const { reviewId } = req.params;

    const updatedReview = await reviewService.updateProductReview(
        userId,
        reviewId,
        req.body
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedReview,
            "Review updated successfully"
        )
    );

})

export const deleteReviewController = asyncHandler(async (req, res) => {

    const userId = req.user._id;
    const role = req.user.role;
    const { reviewId } = req.params;

    await reviewService.deleteReview(userId, reviewId, role);

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Review deleted successfully"
        )
    );
});