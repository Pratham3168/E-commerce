import { Router } from 'express';
const router = Router();

import protect from '../middlewares/auth.middleware.js';
import { getMyOrdersController, placeOrderController } from '../controllers/order/order.controller.js';
import validationMiddleware from '../middlewares/validation.middleware.js';
import { placeOrderValidator } from '../validators/order/placeOrder.validator.js';


router.post(
    "/",
    protect,
    placeOrderValidator,
    validationMiddleware,
    placeOrderController
);

router.get(
    "/",
    protect,
    getMyOrdersController
)

export default router;