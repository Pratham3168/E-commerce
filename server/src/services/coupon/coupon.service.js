import Coupon from "../../models/coupon.model.js";
import ApiError from "../../errors/apiError.js";

export const validateAndCalculateCoupon = async (
  couponCode,
  subtotal,
  session
) => {
  if (!couponCode) {
    return {
      coupon: null,
      discount: 0,
    };
  }

  const coupon = await Coupon.findOne({
    code: couponCode.toUpperCase(),
  }).session(session);

  if (!coupon) {
    throw new ApiError(404, "Coupon not found");
  }

  if (!coupon.isActive) {
    throw new ApiError(400, "Coupon is inactive");
  }

  const now = new Date();

  if (coupon.startDate > now) {
    throw new ApiError(400, "Coupon is not active yet");
  }

  if (coupon.expiryDate < now) {
    throw new ApiError(400, "Coupon has expired");
  }

  if (
    coupon.usageLimit !== null &&
    coupon.usedCount >= coupon.usageLimit
  ) {
    throw new ApiError(400, "Coupon usage limit reached");
  }

  if (subtotal < coupon.minimumOrderValue) {
    throw new ApiError(
      400,
      `Minimum order value should be ₹${coupon.minimumOrderValue}`
    );
  }

  let discount = 0;

  if (coupon.discountType === "percentage") {
    discount = (subtotal * coupon.discountValue) / 100;

    if (coupon.maximumDiscount !== null) {
      discount = Math.min(discount, coupon.maximumDiscount);
    }
  } else {
    discount = coupon.discountValue;
  }

  discount = Math.min(discount, subtotal);

  return {
    coupon,
    discount,
  };
};