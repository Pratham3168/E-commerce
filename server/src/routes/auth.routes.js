import { Router } from 'express';
import { refreshAccessToken, registerUser,loginUser, logoutUser, changePassword , deleteAccount } from '../controllers/auth/auth.controller.js';

//importing middlewares
import registerValidator from '../validators/auth/register.validator.js';
import loginValidator from '../validators/auth/login.validator.js';
import changePassValidator from '../validators/auth/Changepass.validator.js';
import deleteAccountValidator from '../validators/auth/deleteAccount.validator.js';
import validationMiddleware from '../middlewares/validation.middleware.js';
import protect from '../middlewares/auth.middleware.js';
import { authLimiter, sensitiveLimiter } from '../middlewares/rateLimit.middleware.js';

const router = Router();

router.post('/register', authLimiter, registerValidator, validationMiddleware, registerUser);
router.post('/login', authLimiter, loginValidator, validationMiddleware, loginUser);
router.post("/refresh-token", authLimiter, refreshAccessToken);
router.post("/logout", sensitiveLimiter, protect, logoutUser);
router.patch("/change-password", sensitiveLimiter, protect, changePassValidator, validationMiddleware, changePassword);
router.delete("/delete-account", sensitiveLimiter, protect, deleteAccountValidator, validationMiddleware, deleteAccount);

export default router;