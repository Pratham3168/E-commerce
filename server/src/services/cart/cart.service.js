import Cart from "../../models/cart.model.js";
import Product from "../../models/product.model.js";
import ApiError from "../../errors/ApiError.js";
import recalculateCart from "../../utils/recalculateCart.js";

export const addToCart = async (userId, productId, quantity = 1) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  if (!product.isActive) {
    throw new ApiError(400, "Product is unavailable");
  }

  if (product.stock === 0) {
    throw new ApiError(400, "Product is out of stock");
  }

  if (quantity > product.stock) {
    throw new ApiError(400, "Quantity exceeds available stock");
  }

  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId,
  );
  if (existingItem) {
    if (existingItem.quantity + quantity > product.stock) {
      throw new ApiError(400, "Quantity exceeds available stock");
    }
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      product: productId,
      quantity: quantity,
      priceAtAddition: product.price,
    });
  }

  recalculateCart(cart);

  await cart.save();

  return cart;
};

export const getCart = async (userId) => {
  const cart = await Cart.findOne({
    user: userId,
  });

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  await cart.populate({
    path: "items.product",
    select: "name slug price stock thumbnail isActive",
});

  cart.items = cart.items.filter(
    (item) => item.product && item.product.isActive,
  );

  recalculateCart(cart);

  await cart.save();

  return cart;
};


export const updateCartItem = async (userId, productId, quantity) => {

    const cart = await Cart.findOne({ user: userId});
    if(!cart){
        throw new ApiError(404,"Cart not found");
    }

    const existingItem = cart.items.find(
        item => item.product.toString() === productId
    );

    if(!existingItem){
        throw new ApiError(404,"Product not found in cart");
    }

    const product = await Product.findById(productId);
    if(!product || !product.isActive){
        throw new ApiError(404,"Product not found or unavailable");
    }

    if(quantity > product.stock){
        throw new ApiError(400,"Quantity exceeds available stock");
    }

    if(product.stock === 0){
        throw new ApiError(400,"Product is out of stock");
    }
    existingItem.quantity = quantity;

    recalculateCart(cart);

    await cart.save();
    await cart.populate({
        path: "items.product",
        select: "name slug price stock thumbnail isActive"
    })

    return cart;


}