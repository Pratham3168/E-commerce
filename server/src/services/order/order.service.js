import mongoose from "mongoose";
import Cart from "../../models/cart.model.js";
import Order from "../../models/order.model.js";
import Product from "../../models/product.model.js";
import ApiError from "../../errors/apiError.js";

export const placeOrder = async (
  userId,
  shippingAddress,
  paymentMethod = "COD",
) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    const cart = await Cart.findOne({ user: userId })
      .populate("items.product")
      .session(session);

    if (!cart) {
      throw new ApiError(404, "Cart not found");
    }
    if (cart.items.length === 0) {
      throw new ApiError(400, "Cart is empty");
    }

    const orderItems = [];

    let subtotal = 0;

    for (const item of cart.items) {
      const product = item.product;

      if (!product || !product.isActive) {
        throw new ApiError(
          400,
          `Product ${item.product?.name} is not available`,
        );
      }

      if (item.quantity > product.stock) {
        throw new ApiError(
          400,
          `Insufficient stock for product ${product.name}`,
        );
      }

      const itemSubtotal = item.quantity * product.price;
      orderItems.push({
        product: product._id,
        name: product.name,
        slug: product.slug,
        thumbnail: product.thumbnail,
        quantity: item.quantity,
        priceAtPurchase: product.price,
        subtotal: itemSubtotal,
      });
      subtotal += itemSubtotal;
    }

    const shippingFee = subtotal >= 500 ? 0 : 50;
    const discount = 0;

    const tax = 0;

    const totalAmount = subtotal + shippingFee + tax - discount;

    const [order] = await Order.create(
      [
        {
          user: userId,
          items: orderItems,
          shippingAddress,
          payment: {
            method: paymentMethod,
            status: paymentMethod === "COD" ? "PENDING" : "PENDING",
            transactionId: null,
          },
          status: "Pending",
          subtotal,
          shippingCharge: shippingFee,
          discount,
          tax,
          totalAmount,
        },
      ],
      { session },
    );

    for (const item of cart.items) {
      const product = item.product;
      await Product.findByIdAndUpdate(
        product._id,
        {
          $inc: {
            stock: -item.quantity,
            soldCount: item.quantity,
          },
        },
        { session },
      );
    }

    cart.items = [];
    cart.totalItems = 0;
    cart.totalPrice = 0;
    await cart.save({ session });

    await session.commitTransaction();

    await order.populate("user", "firstName lastName email");
    return order;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};


export const getMyOrders = async (userId) => {
    const orders = await Order.find({
        user: userId
    }).sort({createdAt: -1});

    return orders;
};


export const getOrderById = async (userId, orderId, role) => {
  const order = await Order.findById(orderId);

  if(!order){
    throw new ApiError(404, "Order not found");
  }
  if(role !== "admin" && 
    order.user.toString() !== userId.toString()
  ){
    throw new ApiError(403,"You are not authorized to access this order");
  }

  await order.populate("user", "firstName lastName email");
  return order;
};

export const cancelOrder = async (
  userId,
  orderId,
  role
) => {


  const session = await mongoose.startSession();
  session.startTransaction();

  try{
    
    const order = await Order.findById(orderId).session(session);

    if(!order){
      throw new ApiError(404, "Order not found");
    }

    if(role !== "admin" && 
      order.user.toString() !== userId.toString()
    ){
      throw new ApiError(403,"You are not authorized to cancel this order");
    }

    if(!["Pending", "Confirmed"].includes(order.status)){
      throw new ApiError(400, `Order cannot be canceled because it is ${order.status}`);
    }

    for(const item of order.items){
      await Product.findByIdAndUpdate(
        item.product,
        {
          $inc:{
            stock: item.quantity,
            soldCount: -item.quantity
          }
        },
        {session}
      );
    }

    order.status = "Cancelled";
    await order.save({session});
    await session.commitTransaction();

    return order;

  }
  catch(error){
    await session.abortTransaction();
    throw error;
  }
  finally{
    session.endSession();
  }

}