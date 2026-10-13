

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import apiRouter from './routes/index.js';
import notFoundMiddleware from './middlewares/notfound.middleware.js';
import errorMiddleware from './middlewares/error.middleware.js';
import { apiLimiter } from './middlewares/rateLimit.middleware.js';

const app = express();

// Render runs behind a load balancer.
app.set("trust proxy", 1);


const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
	.split(',')
	.map(origin => origin.trim())
	.filter(Boolean);

// GLOBAL MIDDLEWARES
app.use(helmet());
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));
app.use(cookieParser());
app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev')
);
app.use('/api/v1', apiLimiter);

//API ROUTES
app.use('/api/v1', apiRouter);

//404
app.use(notFoundMiddleware);

//global error handler
app.use(errorMiddleware);



export default app;