import {Router} from 'express';

//middlewares
import protect  from '../middlewares/auth.middleware.js';
import authorize from '../middlewares/authorize.middleware.js';
import  validationMiddleware  from '../middlewares/validation.middleware.js';

//controllers
import { createProductController } from '../controllers/product/product.controller.js';
//validators
import { createProductValidator } from '../validators/product/createproduct.validator.js';

const router = Router();

router.post("/" , protect,authorize("admin"), createProductValidator, validationMiddleware, createProductController);

export default router;