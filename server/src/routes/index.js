import { Router } from 'express';
import healthRouter from './health.routes.js';
import authRouter from './auth.routes.js';
import userRouter from './user.routes.js';
// import adminRouter from './admin.routes.js';
import categoryRouter from './category.routes.js';
import productRouter from './product.routes.js';
import cartRouter from './cart.routes.js';
import wishlistRouter from './wishlist.routes.js';
import orderRouter from './order.routes.js';
import adminOrderRouter from './adminOrder.routes.js';
import adminCouponRouter from './adminCoupon.routes.js';
import reviewRouter from './review.routes.js';
import addressRouter from './address.routes.js';
const router = Router();

router.use('/health', healthRouter);
router.use('/auth', authRouter);
router.use('/users', userRouter);
// router.use('/admin', adminRouter);
router.use('/categories', categoryRouter);
router.use('/products', productRouter);
router.use('/cart',cartRouter);
router.use('/wishlist',wishlistRouter);
router.use('/orders', orderRouter);
router.use('/admin', adminOrderRouter);
router.use('/coupons',adminCouponRouter);
router.use('/reviews', reviewRouter);
router.use('/addresses', addressRouter)

export default router;