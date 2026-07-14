import {Router} from 'express';

//middlewares
import protect  from '../middlewares/auth.middleware.js';
import authorize from '../middlewares/authorize.middleware.js';
import  validationMiddleware  from '../middlewares/validation.middleware.js';
import upload from "../middlewares/upload.middleware.js";

//controllers
import { createProductController,getAllProductsController,getAllProductsBySlugController,updateProductController, deleteProductController, restoreProductController,uploadProductImagesController, deleteProductImageController, setProductThumbnailController } from '../controllers/product/product.controller.js';
//validators
import { createProductValidator } from '../validators/product/createproduct.validator.js';
import { updateProductValidator } from '../validators/product/updateProduct.validator.js';
import { mongoIdValidator } from '../validators/common/mongoId.validator.js';
import {deleteProductImageValidator} from '../validators/product/deleteProductImage.validator.js';

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


router.post(
    "/:id/images",
    protect,
    authorize("admin"),
    mongoIdValidator("id", "Invalid product ID"),
    upload.array("images", 5),
    uploadProductImagesController
);



router.get("/:slug", getAllProductsBySlugController);

router.patch("/:id", protect, authorize("admin"), updateProductValidator, validationMiddleware, updateProductController);

router.delete(
    "/:id",
    protect,
    authorize("admin"),
    mongoIdValidator("id", "Invalid product ID"),
    validationMiddleware,
    deleteProductController
);

router.patch(
    "/:id/restore",
    protect,
    authorize("admin"),
    mongoIdValidator("id", "Invalid product ID"),
    validationMiddleware,
    restoreProductController
);


router.delete(
    "/:productId/images/:imageId",
    protect,
    authorize("admin"),
    deleteProductImageValidator,
    validationMiddleware,
    deleteProductImageController
)

router.patch(
    "/:productId/images/:imageId/thumbnail",
    protect,
    authorize("admin"),
    deleteProductImageValidator,
    validationMiddleware,
    setProductThumbnailController
);


export default router;