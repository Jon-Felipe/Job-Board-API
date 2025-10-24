import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from './config/db';

// routes
import jobRoutes from './routes/jobRoutes';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';

// middleware
import errorHandlerMiddleware from './middleware/error-handler';
import { authenticateUser } from './middleware/authMiddleware';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173' }));

app.get('/', (_: Request, res: Response) => {
  res.send('Hello World: TypeScript');
});

app.use('/api/auth', authRoutes);
app.use('/api/user', authenticateUser, userRoutes);
app.use('/api/jobs', jobRoutes);

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Job Board server running on PORT: ${PORT}`);
  });
});
