import Order from "../../models/order.model.js";
import ApiError from "../../errors/apiError.js";

export const getAllOrders = async (query) => {
    const {page =1, limit =10,status,paymentStatus} = query;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber-1)*limitNumber;

    const filter = {};
    if (status) {
        filter.status = status;
    }
    if (paymentStatus) {
        filter["payment.status"] = paymentStatus;
    }

    const [orders, totalOrders] = await Promise.all([
        Order.find(filter)
            .populate("user", "firstName lastName email")
            .sort({createdAt: -1})
            .skip(skip)
            .limit(limitNumber),
        
        Order.countDocuments(filter),
    ]);

    return {
        orders,
        pagination:{
            currentPage: pageNumber,
            totalPages: Math.ceil(totalOrders/limitNumber),
            totalOrders,
            limit: limitNumber,
        },
    };
};


export const updateOrderStatus = async (orderId, newStatus) => {

    const order = await Order.findById(orderId);

    if(!order){
        throw new ApiError(404, "Order not found");
    }

    const transitionMap = {
        "Pending": ["Confirmed", "Cancelled"],
        "Confirmed": ["Packed", "Cancelled"],
        "Packed": ["Shipped", "Cancelled"],
        "Shipped": ["Delivered"],
        "Delivered": [],
        "Cancelled": [],
    }

    if(!transitionMap[order.status].includes(newStatus)){
        throw new ApiError(400, `Cannot change order status from ${order.status} to ${newStatus}`);
    }

    if(order.status === newStatus){
        throw new ApiError(400, `Order is already in ${newStatus} status`);
    }

    order.status = newStatus;
    await order.save();

    await order.populate("user", "firstName lastName email");
    return order;
}