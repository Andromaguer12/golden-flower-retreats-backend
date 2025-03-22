import express from 'express';
import cors from 'cors';
// import { AllEndPoints } from './routes/endpoints.index';
import dotenv from 'dotenv';
import configs from '../constants/constants-config';
import passport from 'passport';
import appRoutes from '../../routes';
import { errorHandler, notFound } from '../../middlewares/errorMiddlewares';
import userPassportAuthorization from '../../middlewares/passportMiddleware';
import path from 'path';

const app = express();

// applying middlewares
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ['*'],
    methods: ['GET', 'POST'],
  }),
);

// app routes
app.use('/api', appRoutes);

//config statics
const __dirnames = path.resolve();
app.use('/public', express.static(path.join(__dirnames, 'public')));
app.use(notFound);
app.use(errorHandler);

//applying middleware to passport
passport.use(userPassportAuthorization);

export default app;
