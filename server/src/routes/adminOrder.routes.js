import { Router } from 'express';

import { getAllOrderController, updateOrderStatusController } from "../controllers/order/adminOrder.controller.js";

import protect from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";
import { updateOrderStatusValidator } from '../validators/order/updateOrderStatus.validator.js';
import validationMiddleware from '../middlewares/validation.middleware.js';
import { mongoIdValidator } from '../validators/common/mongoId.validator.js';
const router = Router();

router.get(
    "/orders",
    protect,
    authorize("admin"),
    getAllOrderController
);

router.patch(
    "/orders/:orderId/status",
    protect,
    authorize("admin"),
    mongoIdValidator("orderId","Invalid orderId"),
    updateOrderStatusValidator,
    validationMiddleware,
    updateOrderStatusController
)


export default router;