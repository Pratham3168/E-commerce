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