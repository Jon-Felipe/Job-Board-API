import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';

import connectDB from './config/db';
import jobRoutes from './routes/jobRoutes';

const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

app.get('/', (_: Request, res: Response) => {
  res.send('Hello World: TypeScript');
});

app.use('/api/jobs', jobRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Job Board server running on PORT: ${PORT}`);
  });
});
