import * as adminOrderService from '../../services/order/adminOrder.service.js';
import ApiResponse from '../../utils/apiResponse.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const getAllOrderController = asyncHandler(async (req,res) => {
    const data = await adminOrderService.getAllOrders(req.query);

    return res.status(200).json(
        new ApiResponse(
            200,
            data,
            "Orders fetched successfully"
        )
    );
});


export const updateOrderStatusController = asyncHandler(async (req,res) => {
    const {orderId} = req.params;
    const {newStatus} = req.body;

    const updatedOrder = await adminOrderService.updateOrderStatus(orderId, newStatus);

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedOrder,
            "Order status updated successfully"
        )
    );
});


export const getDashboardAnalyticsController = asyncHandler(async (req,res) => {
    const analyticsData = await adminOrderService.getDashboardAnalytics();

    return res.status(200).json(
        new ApiResponse(
            200,
            analyticsData,
            "Dashboard analytics fetched successfully"
        )
    );
});