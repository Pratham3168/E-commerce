import asyncHandler from "../../utils/asyncHandler.js";
import * as cartService from "../../services/cart/cart.service.js";
import ApiResponse from "../../utils/apiResponse.js";

export const addToCartController = asyncHandler(async (req,res) => {
    const {productId,quantity} = req.body;

    const cart = await cartService.addToCart(
        req.user._id,
        productId,
        quantity
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            cart,
            "Product added to cart successfully"
        )
    );
});


export const getCartController = asyncHandler(async (req,res) => {

    const cart = await cartService.getCart(req.user._id);

    return res.status(200).json(
        new ApiResponse(
            200,
            cart,
            "Cart fetched successfully"
        )
    );

});


export const updateCartController = asyncHandler(async (req,res) => {
    const {productId} = req.params;
    const {quantity} = req.body;

    const cart = await cartService.updateCartItem(
        req.user._id,
        productId,
        quantity
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            cart,
            "Cart updated successfully"
        )
    );
})