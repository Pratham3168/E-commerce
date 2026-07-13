import Cart from "../../models/cart.model.js";
import Product from "../../models/product.model.js";
import ApiError from "../../errors/ApiError.js";

export const addToCart = async (userId,productId,quantity = 1) => {

    const cart = await Cart.findOne({user: userId});

    if (!cart) {
    throw new ApiError(404, "Cart not found");
}

    const product = await Product.findById(productId);
    if(!product) {
        throw new ApiError(404, "Product not found");
    }

    if(!product.isActive){
        throw new ApiError(400, "Product is unavailable");
    }

    if(product.stock === 0){
        throw new ApiError(400, "Product is out of stock");
    }

    if(quantity > product.stock){
        throw new ApiError(400, "Quantity exceeds available stock");
    }

    const existingItem = cart.items.find(
        item => item.product.toString() === productId
    )
    if(existingItem){
        if(existingItem.quantity + quantity > product.stock){
            throw new ApiError(400, "Quantity exceeds available stock");
        }
        existingItem.quantity += quantity;
    }
    else{
        cart.items.push({
            product: productId,
            quantity: quantity,
            priceAtAddition: product.price
        });
    }

    cart.totalItems += quantity;
    cart.totalPrice += product.price * quantity;

    await cart.save();

    return cart;

};