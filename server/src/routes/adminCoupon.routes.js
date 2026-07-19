import { Router } from 'express';

const router = Router();

//middleware
import protect from '../middlewares/auth.middleware.js';
import authorize from '../middlewares/authorize.middleware.js';
import validationMiddleware  from '../middlewares/validation.middleware.js';

//validator
import { createCouponValidator } from '../validators/coupon/createCoupon.validator.js';


//controller
import { createCouponController } from '../controllers/coupon/adminCoupon.controller.js';


router.post('/', protect, authorize('admin'), createCouponValidator,validationMiddleware, createCouponController);

export default router;