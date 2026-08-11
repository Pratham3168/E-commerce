import { Router } from "express";

import protect from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";
import validationMiddleware from "../middlewares/validation.middleware.js";

import { mongoIdValidator } from "../validators/common/mongoId.validator.js";
import { addStockValidator } from "../validators/inventory/addStock.validator.js";

import { addStockController, adjustStockController, getInventoryHistoryController, reduceStockController } from "../controllers/inventory/inventory.controller.js";
import { reduceStockValidator } from "../validators/inventory/reduceStock.validator.js";
import { adjustStockValidator } from "../validators/inventory/adjustStock.validator.js";

const router = Router();

router.post(
    "/in/:productId",
    protect,
    authorize("admin"),
    mongoIdValidator("productId", "Invalid product ID"),
    addStockValidator,
    validationMiddleware,
    addStockController
);


router.post(
    "/out/:productId",
    protect,
    authorize("admin"),
    mongoIdValidator("productId", "Invalid product ID"),
    reduceStockValidator,
    validationMiddleware,
    reduceStockController
);

router.post(
    "/adjust/:productId",
    protect,
    authorize("admin"),
    mongoIdValidator("productId", "Invalid product ID"),
    adjustStockValidator,
    validationMiddleware,
    adjustStockController
);

router.get(
    "/:productId",
    protect,
    authorize("admin"),
    mongoIdValidator("productId", "Invalid product ID"),
    validationMiddleware,
    getInventoryHistoryController
);

export default router;