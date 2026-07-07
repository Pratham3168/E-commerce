import { Router } from 'express';
const router = Router();

router.get('/health', (req,res) => {
    res.status(200).json({
        message : "Server is running",
        success : true
    })
});

export default router;