import { Router } from 'express';

//controllers
import { createCategoryController,getAllCategoriesController, getCategoryBySlugController, updateCategoryController } from '../controllers/category/category.controller.js';

//validators
import { createCategoryValidator } from '../validators/category/createCategory.validator.js';

//middlewares
import validationMiddleware from '../middlewares/validation.middleware.js';
import authorize from "../middlewares/authorize.middleware.js";
import protect from "../middlewares/auth.middleware.js";
import { updateCategoryValidator } from '../validators/category/updateCategory.validator.js';


const router = Router();


router
    .route("/")
    .get(getAllCategoriesController)
    .post(
        protect,
        authorize("admin"),
        createCategoryValidator,
        validationMiddleware,
        createCategoryController
    );

router.get("/:slug", getCategoryBySlugController);

router.patch("/:id",protect,authorize("admin") ,updateCategoryValidator,validationMiddleware, updateCategoryController);

export default router;