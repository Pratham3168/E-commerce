import Wishlist from "../../models/wishlist.model.js";
import Product from "../../models/product.model.js";
import ApiError from "../../errors/apiError.js";


export const addToWishlist = async (userId, productId) => {
    const wishlist = await Wishlist.findOne({user: userId});
    const product = await Product.findById(productId);

    if(!product || !product.isActive){
        throw new ApiError(404, "Product not found or unavailable");
    }

    if(!wishlist) {
        throw new ApiError(404, "Wishlist not found");
    }


    

    const exists = wishlist.products.some(
        id => id.toString() === productId
    )

    if(exists) {
        throw new ApiError(409, "Product already in wishlist");
    }

    wishlist.products.push(productId);

    await wishlist.save();

    await wishlist.populate("products","name slug price thumbnail stock averageRating");

    return wishlist;
};


export const getWishlist = async (userId) => {
    const wishlist = await Wishlist.findOne({user: userId})
    if(!wishlist) {
        throw new ApiError(404, "Wishlist not found");
    }
    await wishlist.populate("products","name slug price thumbnail stock isActive averageRating");
    const originalLength = wishlist.products.length;
    wishlist.products = wishlist.products.filter(product => product && product.isActive);
    if(wishlist.products.length !== originalLength) {
        await wishlist.save();
    }
    return wishlist;
};


export const removeFromWishlist = async (userId, productId) => {
    const wishlist = await Wishlist.findOne({user: userId});
    if(!wishlist) {
        throw new ApiError(404, "Wishlist not found");
    }
    const exists = wishlist.products.some(
        id => id.toString() === productId
    );

    if(!exists) {
        throw new ApiError(404, "Product not found in wishlist");
    }

    wishlist.products = wishlist.products.filter(
        id => id.toString() !== productId
    );

    await wishlist.save();
    await wishlist.populate("products","name slug price thumbnail stock isActive averageRating");
    return wishlist;
};


export const clearWishlist = async (userId )=> {
    const wishlist = await Wishlist.findOne({user: userId});

    if(!wishlist){
        throw new ApiError(404, "Wishlist not found");
    }

    if(wishlist.products.length === 0){
        throw new ApiError(400, "Wishlist is already empty");
    }

    wishlist.products =[];

    await wishlist.save();
    return wishlist;
}