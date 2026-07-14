import * as orderService from '../../services/order/order.service.js';
import asyncHandler from '../../utils/asyncHandler.js';
import ApiResponse from '../../utils/apiResponse.js';

export const placeOrderController = asyncHandler(async (req, res) => {

    const orderItems = await orderService.placeOrder(
        req.user._id,
        req.body.shippingAddress,
        req.body.paymentMethod
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