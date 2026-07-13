import {Router} from 'express';

//validators
import { addToCartValidator } from '../validators/cart/addToCart.validator.js';
//middlewares
import protect from '../middlewares/auth.middleware.js';
import authorize from '../middlewares/authorize.middleware.js';
import validationMiddleware  from '../middlewares/validation.middleware.js';

//middlewares
import { addToCartController, getCartController } from '../controllers/cart/cart.controller.js';
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

export default router;