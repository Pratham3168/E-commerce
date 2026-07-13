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


}