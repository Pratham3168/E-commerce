import { Router } from 'express';
import { refreshAccessToken, registerUser,loginUser, logoutUser, changePassword , deleteAccount } from '../controllers/auth/auth.controller.js';

//importing middlewares
import registerValidator from '../validators/auth/register.validator.js';
import loginValidator from '../validators/auth/login.validator.js';
import changePassValidator from '../validators/auth/Changepass.validator.js';
import deleteAccountValidator from '../validators/auth/deleteAccount.validator.js';
import validationMiddleware from '../middlewares/validation.middleware.js';
import protect from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', registerValidator, validationMiddleware, registerUser);
router.post('/login', loginValidator, validationMiddleware, loginUser);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout",protect, logoutUser);
router.patch("/change-password",protect,changePassValidator,validationMiddleware,changePassword);
router.delete("/delete-account",protect,deleteAccountValidator,validationMiddleware,deleteAccount);

export default router;