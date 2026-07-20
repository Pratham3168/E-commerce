import Coupon from "../../models/coupon.model.js";
import ApiError from "../../errors/apiError.js";

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
    isActive,
  } = couponData;

  const coupon = await Coupon.findOne({ code: code.toUpperCase() });
  if (coupon) {
    if (coupon.isActive) {
      throw new ApiError(409, "Coupon code already exists and is active.");
    } else {
      throw new ApiError(409, "Coupon code already exists but is inactive.");
    }
  }

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
    isActive,
  });

  return newCoupon;
};


export const getAllCoupons = async (query) => {
  const {
    page = 1,
    limit = 10,
    search,
    discountType,
    status,
    order,
    isActive,
  } = query;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const skip = (pageNumber - 1) * limitNumber;

  const filter = {};

  // Search by coupon code
  if (search) {
    filter.code = {
      $regex: search,
      $options: "i",
    };
  }

  // Filter by discount type
  if (discountType && ["percentage", "fixed"].includes(discountType)) {
    filter.discountType = discountType;
  }

  // Filter by active/inactive
  if (isActive !== undefined) {
    filter.isActive = isActive === "true";
  }

  // Filter by validity
  const currentDate = new Date();

  if (status === "valid") {
    filter.isActive = true;
    filter.startDate = { $lte: currentDate };
    filter.expiryDate = { $gte: currentDate };
  }

  if (status === "expired") {
    filter.expiryDate = { $lt: currentDate };
  }

  // Sorting
  const sortOrder = order?.toLowerCase() === "asc" ? 1 : -1;

  const [coupons, totalCoupons] = await Promise.all([
    Coupon.find(filter)
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(limitNumber),

    Coupon.countDocuments(filter),
  ]);

  return {
    coupons,
    pagination: {
      currentPage: pageNumber,
      totalPages: Math.ceil(totalCoupons / limitNumber),
      totalCoupons,
      limit: limitNumber,
    },
  };
};



export const updateCoupon = async (couponId, updateData) => {

    const coupon = await Coupon.findById(couponId);
    if (!coupon) {
      throw new ApiError(404, "Coupon not found.");
    }

    // If the code is being updated, check for uniqueness
    if(updateData.code && updateData.code.toUpperCase() !== coupon.code) {
      const existingCoupon = await Coupon.findOne({ code: updateData.code.toUpperCase() });
      if (existingCoupon) {
        throw new ApiError(409, "Coupon code already exists.");
      }
      updateData.code = updateData.code.toUpperCase(); // Ensure the code is stored in uppercase
    }

    Object.assign(coupon, updateData);
    await coupon.save();

    return coupon;

};



export const deleteCoupon = async (couponId) => {
  const coupon = await Coupon.findById(couponId);

  if (!coupon) {
    throw new ApiError(404, "Coupon not found.");
  }

  if (!coupon.isActive) {
    throw new ApiError(400, "Coupon is already inactive.");
  }

  coupon.isActive = false;
  await coupon.save();

  return coupon;
};


export const restoreCoupon = async (couponId) => {
  const coupon = await Coupon.findById(couponId);

  if (!coupon) {
    throw new ApiError(404, "Coupon not found.");
  }

  if (coupon.isActive) {
    throw new ApiError(400, "Coupon is already active.");
  }

  coupon.isActive = true;
  await coupon.save();

  return coupon;
};