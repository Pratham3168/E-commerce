import { body} from 'express-validator'; 


export const updateCouponValidator = [

    body()
    .custom(value => {
        if (Object.keys(value).length === 0) {
            throw new Error("At least one field is required to update.");
        }
        return true;
    }),

    body('code')
        .optional()
        .isLength({ min: 3, max: 30 })
        .bail()
        .withMessage('Coupon code must be between 3 and 30 characters')
        .matches(/^[a-zA-Z0-9]+$/)
        .withMessage('Coupon code must be uppercase alphanumeric'),

    body('description')
        .optional()
        .isString()
        .bail()
        .withMessage('Description must be a string'),

    body('discountType')
        .optional()
        .isIn(['percentage', 'fixed'])
        .withMessage('Discount type must be either "percentage" or "fixed"'),

    body('discountValue')
        .optional()
        .isFloat({ min: 1 })
        .withMessage('Discount value must be a number greater than or equal to 1'),

    body('minimumOrderValue')
        .optional()
        .isFloat({ min: 0 })
        .bail()
        .withMessage('Minimum order value must be a number greater than or equal to 0'),

    body('maximumDiscount')
        .optional()
        .isFloat({ min: 0 })
        .bail()
        .withMessage('Maximum discount must be a number greater than or equal to 0'),

    body('usageLimit')
        .optional()
        .isInt({ min: 0 })
        .bail()
        .withMessage('Usage limit must be a non-negative integer'),

    body('startDate')
        .optional()
        .isISO8601()
        .bail()
        .withMessage('Start date must be a valid date'),

    body('expiryDate')
        .optional()
        .isISO8601()
        .bail()
        .withMessage('Expiry date must be a valid date'),

    body('isActive')
        .optional()
        .isBoolean()
        .withMessage('isActive must be a boolean value'),

]