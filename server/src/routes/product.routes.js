import {Router} from 'express';

//middlewares
import protect  from '../middlewares/auth.middleware.js';
import authorize from '../middlewares/authorize.middleware.js';
import  validationMiddleware  from '../middlewares/validation.middleware.js';

//controllers
import { createProductController,getAllProductsController,getAllProductsBySlugController,updateProductController, deleteProductController, restoreProductController } from '../controllers/product/product.controller.js';
//validators
import { createProductValidator } from '../validators/product/createproduct.validator.js';
import { updateProductValidator } from '../validators/product/updateProduct.validator.js';
import { mongoIdValidator } from '../validators/common/mongoId.validator.js';

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

router.patch("/:id", protect, authorize("admin"), updateProductValidator, validationMiddleware, updateProductController);

router.delete(
    "/:id",
    protect,
    authorize("admin"),
    mongoIdValidator,
    validationMiddleware,
    deleteProductController
);

router.patch(
    "/:id/restore",
    protect,
    authorize("admin"),
    mongoIdValidator,
    validationMiddleware,
    restoreProductController
);
export default router;