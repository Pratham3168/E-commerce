import { Router } from 'express';
const router = Router();

import protect from '../middlewares/auth.middleware.js';
import { getMyOrdersController, getOrderByIdController, placeOrderController } from '../controllers/order/order.controller.js';
import validationMiddleware from '../middlewares/validation.middleware.js';
import { placeOrderValidator } from '../validators/order/placeOrder.validator.js';
import { mongoIdValidator } from '../validators/common/mongoId.validator.js';


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
);


router.get(
    "/:orderId",
    protect,
    mongoIdValidator("orderId", "Invalid order ID"),
    validationMiddleware,
    getOrderByIdController
)




export default router;