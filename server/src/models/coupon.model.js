import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      uppercase: true,
      minlength: 3,
      maxlength: 30,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },

    discountValue: {
      type: Number,
      required: true,
      min: 1,
      validate: {
        validator: function (value) {
          if (this.discountType === "percentage") {
            return value <= 100;
          }
          return true;
        },
        message: "Percentage discount cannot exceed 100%.",
      },
    },

    minimumOrderValue: {
      type: Number,
      default: 0,
      min: 0,
    },

    maximumDiscount: {
      type: Number,
      default: null,
      min: 0,
    },

    usageLimit: {
      type: Number,
      default: null,
      min: 0,
    },

    usedCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    startDate: {
      type: Date,
      required: true,
    },

    expiryDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "Expiry date must be greater than start date.",
      },
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    applicableCategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  {
    timestamps: true,
  }
);

couponSchema.index({ isActive: 1, expiryDate: 1 });

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;