import {body} from 'express-validator';

export const createCouponValidator = [
    body('code')
        .notEmpty()
        .bail()
        .withMessage('Coupon code is required')
        .isLength({ min: 3, max: 30 })
        .bail()
        .withMessage('Coupon code must be between 3 and 30 characters')
        .matches(/^[A-Z0-9]+$/)
        .withMessage('Coupon code must be uppercase alphanumeric'),
    
    body('description')
        .optional()
        .isString()
        .bail()
        .withMessage('Description must be a string'),
    
    body('discountType')
        .notEmpty()
        .bail()
        .withMessage('Discount type is required')
        .isIn(['percentage', 'fixed'])
        .withMessage('Discount type must be either "percentage" or "fixed"'),
    
    body('discountValue')
        .notEmpty()
        .bail()
        .withMessage('Discount value is required')
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
        .notEmpty()
        .bail()
        .withMessage('Start date is required')
        .isISO8601()
        .bail()
        .withMessage('Start date must be a valid date'),
    
    body('expiryDate')
        .notEmpty()
        .bail()
        .withMessage('Expiry date is required')
        .isISO8601()
        .bail()
        .withMessage('Expiry date must be a valid date'),
    
    body('isActive')
        .optional()
        .isBoolean()
        .bail()
        .withMessage('isActive must be a boolean value'),
]