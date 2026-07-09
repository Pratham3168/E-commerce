import { Router } from "express";
import protect from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";

const router = Router();

router.get(
    "/dashboard",
    protect,
    authorize("admin"),
    (req, res) => {
        res.json({
            success: true,
            message: "Welcome Admin",
            user: req.user
        });
    }
);

export default router;