import { Router } from 'express';
import { refreshAccessToken, registerUser } from '../controllers/auth/auth.controller.js';
import { loginUser } from '../controllers/auth/auth.controller.js';

//importing middlewares
import registerValidator from '../validators/auth/register.validator.js';
import loginValidator from '../validators/auth/login.validator.js';
import validationMiddleware from '../middlewares/validation.middleware.js';

const router = Router();

router.post('/register', registerValidator, validationMiddleware, registerUser);
router.post('/login', loginValidator, validationMiddleware, loginUser);
router.post("/refresh-token", refreshAccessToken);


export default router;