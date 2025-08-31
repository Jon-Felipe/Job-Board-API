import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';

dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (_: Request, res: Response) => {
  res.send('Hello World: TypeScript');
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Job Board server running on PORT: ${PORT}`);
  });
});
