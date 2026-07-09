import { Router } from "express";
import protect from "../middlewares/auth.middleware.js";
import { getProfile } from "../controllers/user/user.controller.js";

const router = Router();

router.get("/profile", protect, getProfile);

export default router;