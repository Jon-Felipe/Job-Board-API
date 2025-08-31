import express, { type Request, type Response } from 'express';
const app = express();

app.use(express.json());

app.get('/', (_: Request, res: Response) => {
  res.send('Hello World: TypeScript');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Job Board server running on port: ${port}`);
});
