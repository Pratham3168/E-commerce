import {Router} from 'express';

//validators
import { addToCartValidator } from '../validators/cart/addToCart.validator.js';
import { updateCartValidator } from '../validators/cart/updateCart.validator.js';
//middlewares
import protect from '../middlewares/auth.middleware.js';
import authorize from '../middlewares/authorize.middleware.js';
import validationMiddleware  from '../middlewares/validation.middleware.js';

//middlewares
import { addToCartController, getCartController, updateCartController } from '../controllers/cart/cart.controller.js';
const router = Router();


router.post(
    "/",
    protect,
    authorize("user"),
    addToCartValidator,
    validationMiddleware,
    addToCartController
)

router.get(
    "/",
    protect,
    authorize("user"),
    validationMiddleware,
    getCartController
)

router.patch("/:productId", protect, authorize("user"),updateCartValidator, validationMiddleware, updateCartController)

export default router;