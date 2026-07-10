import {Router} from 'express';

//middlewares
import protect  from '../middlewares/auth.middleware.js';
import authorize from '../middlewares/authorize.middleware.js';
import  validationMiddleware  from '../middlewares/validation.middleware.js';

//controllers
import { createProductController,getAllProductsController,getAllProductsBySlugController } from '../controllers/product/product.controller.js';
//validators
import { createProductValidator } from '../validators/product/createproduct.validator.js';

const router = Router();

router
    .route("/")
    .get(getAllProductsController)
    .post(
        protect,
        authorize("admin"),
        createProductValidator,
        validationMiddleware,
        createProductController
    );


router.get("/:slug", getAllProductsBySlugController);
export default router;