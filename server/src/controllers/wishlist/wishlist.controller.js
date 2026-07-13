import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/apiResponse.js";
import * as wishlistService from "../../services/wishlist/wishlist.service.js";

export const addToWishlistController = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    const wishlist = await wishlistService.addToWishlist(
        req.user._id,
        productId
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            wishlist,
            "Product added to wishlist successfully"
        )
    );
});