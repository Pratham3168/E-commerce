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

export const getAllCouponsController = asyncHandler(async (req, res) => {
    const query = req.query;
    const data = await adminCouponService.getAllCoupons(query);

    return res.status(200).json(
        new ApiResponse(200, data , 'Coupons retrieved successfully')
    )
});


export const updateCouponController = asyncHandler(async (req, res) => {
    const couponId = req.params.id;
    const updateData = req.body;
    const updatedCoupon = await adminCouponService.updateCoupon(couponId, updateData);

    return res.status(200).json(
        new ApiResponse(200, updatedCoupon , 'Coupon updated successfully')
    )
});


export const deleteCouponController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const coupon = await adminCouponService.deleteCoupon(id);

  return res.status(200).json(
    new ApiResponse(
      200,
      coupon,
      "Coupon deleted successfully."
    )
  );
});

export const restoreCouponController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const coupon = await adminCouponService.restoreCoupon(id);

  return res.status(200).json(
    new ApiResponse(
      200,
      coupon,
      "Coupon restored successfully."
    )
  );
});