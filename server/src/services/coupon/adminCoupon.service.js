import Coupon from '../../models/coupon.model.js';
import ApiError from '../../errors/apiError.js';

export const createCoupon = async (couponData) => {

    const {
        code,
        description,
        discountType,
        discountValue,
        maximumDiscount,
        minimumOrderValue,
        usageLimit,
        startDate,
        expiryDate,
        isActive
    } = couponData;


    const coupon = await Coupon.findOne({ code: code.toUpperCase() });
    if(coupon){
        if(coupon.isActive){
            throw new ApiError(409, 'Coupon code already exists and is active.');
        }
        else{
            throw new ApiError(409, 'Coupon code already exists but is inactive.');
        }
    };

    const newCoupon = await Coupon.create({
        code,
        description,
        discountType,
        discountValue,
        maximumDiscount,
        minimumOrderValue,
        usageLimit,
        startDate,
        expiryDate,
        isActive
    });

    return newCoupon;

}