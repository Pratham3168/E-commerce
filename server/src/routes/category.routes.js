import { Router } from 'express';

//controllers
import { createCategoryController,getAllCategoriesController } from '../controllers/category/category.controller.js';

//validators
import { createCategoryValidator } from '../validators/category/createCategory.validator.js';

//middlewares
import validationMiddleware from '../middlewares/validation.middleware.js';
import authorize from "../middlewares/authorize.middleware.js";
import protect from "../middlewares/auth.middleware.js";


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

export default router;