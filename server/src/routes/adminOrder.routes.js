import { Router } from 'express';
const router = Router();

import { getAllOrderController } from "../controllers/order/adminOrder.controller.js";

import protect from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";

router.get(
    "/orders",
    protect,
    authorize("admin"),
    getAllOrderController
);

export default router;