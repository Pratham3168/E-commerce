import { Router } from 'express';

const router = Router();

//middleware
import protect from '../middlewares/auth.middleware.js';
import authorize from '../middlewares/authorize.middleware.js';
import validationMiddleware  from '../middlewares/validation.middleware.js';

//validator
import { createCouponValidator } from '../validators/coupon/createCoupon.validator.js';


//controller
import { createCouponController, getAllCouponsController, updateCouponController } from '../controllers/coupon/adminCoupon.controller.js';
import { updateCouponValidator } from '../validators/coupon/updateCoupon.validator.js';
import { mongoIdValidator } from '../validators/common/mongoId.validator.js';


router.post('/', protect, authorize('admin'), createCouponValidator,validationMiddleware, createCouponController);
router.get('/', protect, authorize('admin'), getAllCouponsController);
router.patch('/:id', protect, authorize('admin'), mongoIdValidator('id',"Invalid coupon ID"), updateCouponValidator , validationMiddleware, updateCouponController);

export default router;