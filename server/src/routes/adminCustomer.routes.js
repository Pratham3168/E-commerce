import { Router } from "express";
import { body } from "express-validator";
import { listCustomersController, updateCustomerStatusController } from "../controllers/admin/customer.controller.js";
import protect from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";
import validationMiddleware from "../middlewares/validation.middleware.js";
import { mongoIdValidator } from "../validators/common/mongoId.validator.js";

const router = Router();

router.get(
  "/customers",
  protect,
  authorize("admin"),
  listCustomersController,
);

router.patch(
  "/customers/:customerId/status",
  protect,
  authorize("admin"),
  mongoIdValidator("customerId", "Invalid customerId"),
  body("isActive").isBoolean().withMessage("isActive must be a boolean"),
  validationMiddleware,
  updateCustomerStatusController,
);

export default router;
