import * as orderService from '../../services/order/order.service.js';
import asyncHandler from '../../utils/asyncHandler.js';
import ApiResponse from '../../utils/apiResponse.js';

export const placeOrderController = asyncHandler(async (req, res) => {

    const orderItems = await orderService.placeOrder(
        req.user._id,
        req.body.shippingAddress,
        req.body.paymentMethod,
        req.body.couponCode
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            orderItems,
            "Snapshot generated successfully"
        )
    );
});

export const getMyOrdersController = asyncHandler(async (req, res) => {
    const orders = await orderService.getMyOrders(req.user._id);

    return res.status(200).json(
        new ApiResponse(
            200,
            orders,
            "Orders fetched successfully"
        )
    );
});


export const getOrderByIdController = asyncHandler(async (req,res) => {
    const order = await orderService.getOrderById(
        req.user._id,
        req.params.orderId,
        req.user.role
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            order,
            "Order fetched successfully"
        )
    );
});


export const cancelOrderController = asyncHandler(async (req,res) => {
    const order = await orderService.cancelOrder(
        req.user._id,
        req.params.orderId,
        req.user.role
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            order,
            "Order cancelled successfully"
        )
    );
})