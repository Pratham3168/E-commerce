import Review from "../../models/review.model.js";
import Product from "../../models/product.model.js";
import Order from "../../models/order.model.js";
import ApiError from "../../errors/apiError.js";
import mongoose from "mongoose";

const updateProductReviewStats = async (productId) => {
  //using aggregation to calculate the new average rating and total reviews for the product
  const reviewStats = await Review.aggregate([
    {
      $match: {
        product: new mongoose.Types.ObjectId(productId),
      },
    },
    {
      $group: {
        _id: "$product",
        averageRating: { $avg: "$rating" },
        totalReviews: { $sum: 1 },
      },
    },
  ]);

  await Product.findByIdAndUpdate(productId, {
    averageRating: reviewStats[0]?.averageRating || 0,
    totalReviews: reviewStats[0]?.totalReviews || 0,
  });
};

export const createReview = async (reviewData) => {
  const { user, productId, rating, comment } = reviewData;

  const existingProduct = await Product.findById(productId);
  if (!existingProduct || !existingProduct.isActive) {
    throw new ApiError(404, "Product not found or unavailable for review");
  }

  //check if user has purchased the product before allowing them to review it
  const hasPurchased = await Order.exists({
    user,
    status: "Delivered",
    "items.product": productId,
  });
  if (!hasPurchased) {
    throw new ApiError(403, "You can only review products you have purchased");
  }

  const existingReview = await Review.findOne({ user, product: productId });
  if (existingReview) {
    throw new ApiError(400, "You have already reviewed this product");
  }

  const isVerifiedPurchase = hasPurchased ? true : false;

  const newReview = new Review({
    user,
    product: productId,
    rating,
    comment,
    isVerifiedPurchase,
  });

  await newReview.save();

  await updateProductReviewStats(productId);

  return newReview;
};

export const getProductReviews = async (productId ,query) => {
  const { page, limit, sortBy, order, minRating, maxRating } = query;
  const pageNumber = Number(page) || 1;
  const limitNumber = Number(limit) || 10;
  const skip = (pageNumber - 1) * limitNumber;
  const minRatingNumber = Number(minRating) || 1;
  const maxRatingNumber = Number(maxRating) || 5;

  const existingProduct = await Product.exists({
    _id: product,
    isActive: true,
  });
  if (!existingProduct) {
    throw new ApiError(404, "Product not found or unavailable for review");
  }

  const allowedSortFields = ["createdAt", "rating"];

const sortField = allowedSortFields.includes(sortBy)
    ? sortBy
    : "createdAt";
  const sortOrder = order === "asc" ? 1 : -1;
  const sortOption = {
    [sortField]: sortOrder,
  };

  const filter = {
    product: productId,
    rating: {
        $gte: minRatingNumber,
        $lte: maxRatingNumber,
    },
};
  const [reviews, totalReviews] = await Promise.all([
    Review.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNumber)
      .populate("user", "firstName lastName avatar"),

    Review.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(totalReviews / limitNumber);
  const hasNextPage = pageNumber * limitNumber < totalReviews;
  const hasPrevPage = pageNumber > 1;

  return {
    reviews,
    pagination: {
      page: pageNumber,
      limit: limitNumber,
      totalReviews,
      totalPages,
      hasNextPage,
      hasPrevPage,
    },
  };
};


export const updateProductReview = async (userId, reviewId, updateData) => {
    const { rating, comment} = updateData;
    const review = await Review.findOne({_id: reviewId, user: userId});
    if(!review) {
        throw new ApiError(404, "Review not found");
    }

    if(review.user.toString() !== userId.toString()){
        throw new ApiError(403, "You are not authorized to update this review");
    }

    if(rating !== undefined) {
        review.rating = rating;
    }
    if(comment !== undefined) {
        review.comment = comment;
    }

    await review.save();

    await updateProductReviewStats(review.product);

    await review.populate("user", "firstName lastName avatar");

    return review;
}


export const deleteReview = async (userId, reviewId, role) => {

    const review = await Review.findById(reviewId);

    if (!review) {
        throw new ApiError(404, "Review not found");
    }

    if (
        role !== "admin" &&
        review.user.toString() !== userId.toString()
    ) {
        throw new ApiError(403, "You are not authorized to delete this review");
    }

    const productId = review.product;

    await review.deleteOne();

    await updateProductReviewStats(productId);

    return;
};