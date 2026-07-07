import { Router } from 'express';
import healthRouter from '../routes/health.routes.js';
const router = Router();

router.use('/health', healthRouter);

export default router;