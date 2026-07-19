import * as adminCouponService from '../../services/coupon/adminCoupon.service.js';
import ApiResponse from '../../utils/apiResponse.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createCouponController = asyncHandler(async (req, res) => {
    const couponData = req.body;    
    const newCoupon = await adminCouponService.createCoupon(couponData);

    return res.status(201).json(
        new ApiResponse(201, newCoupon , 'Coupon created successfully')
    )

});