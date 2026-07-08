import { Router } from 'express';
import { registerUser } from '../controllers/auth/auth.controller.js';

//importing middlewares
import registerValidator from '../validators/auth/register.validator.js';
import validationMiddleware from '../middlewares/validation.middleware.js';

const router = Router();

router.post('/register', registerValidator, validationMiddleware, registerUser);


export default router;