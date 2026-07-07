import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import apiRouter from './routes/index.js';
import notFoundMiddleware from './middlewares/notfound.middleware.js';
import errorMiddleware from './middlewares/error.middleware.js';

const app = express();


// GLOBAL MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(morgan('dev'));

//API ROUTES
app.use('/api/v1', apiRouter);

//404
app.use(notFoundMiddleware);

//global error handler
app.use(errorMiddleware);



export default app;