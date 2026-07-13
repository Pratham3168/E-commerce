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


export const getWishlistController = asyncHandler(async (req,res) => {
    const wishlist = await wishlistService.getWishlist(req.user._id);

    return res.status(200).json(
        new ApiResponse(
            200,
            wishlist,
            "Wishlist fetched successfully"
        )
    );
});

export const removeFromWishlistController = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    const wishlist = await wishlistService.removeFromWishlist(
        req.user._id,
        productId
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            wishlist,
            "Product removed from wishlist successfully"
        )
    );
});