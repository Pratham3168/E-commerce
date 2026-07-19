import {body} from 'express-validator';

export const createCouponValidator = [
    body('code')
        .notEmpty()
        .withMessage('Coupon code is required')
        .isLength({ min: 3, max: 30 })
        .withMessage('Coupon code must be between 3 and 30 characters')
        .matches(/^[A-Z0-9]+$/)
        .withMessage('Coupon code must be uppercase alphanumeric'),
    
    body('description')
        .optional()
        .isString()
        .withMessage('Description must be a string'),
    
    body('discountType')
        .notEmpty()
        .withMessage('Discount type is required')
        .isIn(['percentage', 'fixed'])
        .withMessage('Discount type must be either "percentage" or "fixed"'),
    
    body('discountValue')
        .notEmpty()
        .withMessage('Discount value is required')
        .isFloat({ min: 1 })
        .withMessage('Discount value must be a number greater than or equal to 1'),
    
    body('minimumOrderValue')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Minimum order value must be a number greater than or equal to 0'),    
    
    body('maximumDiscount')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Maximum discount must be a number greater than or equal to 0'),
    
    body('usageLimit')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Usage limit must be a non-negative integer'),
    
    body('startDate')
        .notEmpty()
        .withMessage('Start date is required')
        .isISO8601()
        .withMessage('Start date must be a valid date'),
    
    body('expiryDate')
        .notEmpty()
        .withMessage('Expiry date is required')
        .isISO8601() 
        .withMessage('Expiry date must be a valid date'),
    
    body('isActive')
        .optional()
        .isBoolean()
        .withMessage('isActive must be a boolean value'),
]