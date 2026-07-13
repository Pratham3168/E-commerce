import {Router} from 'express';

//validators
import { addToWishlistValidator } from "../validators/wishlist/addToWishlist.validator.js";

//middlewares
import protect from '../middlewares/auth.middleware.js';
import authorize from '../middlewares/authorize.middleware.js';
import validationMiddleware  from '../middlewares/validation.middleware.js'; 

//controllers
import { addToWishlistController,getWishlistController, removeFromWishlistController} from '../controllers/wishlist/wishlist.controller.js';
import { removeFromWishlistValidator } from '../validators/wishlist/removeFromWishlist.validator.js';


const router = Router();

router.post(
    "/:productId",
    protect,
    authorize("user"),
    addToWishlistValidator,
    validationMiddleware,
    addToWishlistController
);

router.get("/", protect, authorize("user"), validationMiddleware, getWishlistController);

router.delete(
    "/:productId",
    protect,
    removeFromWishlistValidator,
    validationMiddleware,
    removeFromWishlistController
);

export default router;