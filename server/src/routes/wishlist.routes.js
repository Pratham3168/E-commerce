import {Router} from 'express';

//validators
import { addToWishlistValidator } from "../validators/wishlist/addToWishlist.validator.js";

//middlewares
import protect from '../middlewares/auth.middleware.js';
import authorize from '../middlewares/authorize.middleware.js';
import validationMiddleware  from '../middlewares/validation.middleware.js'; 

//controllers
import { addToWishlistController} from '../controllers/wishlist/wishlist.controller.js';


const router = Router();

router.post(
    "/:productId",
    protect,
    authorize("user"),
    addToWishlistValidator,
    validationMiddleware,
    addToWishlistController
);

export default router;