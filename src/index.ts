import express, { type Request, type Response } from 'express';
const app = express();
const port = 3000;

app.get('/', (_: Request, res: Response) => {
  res.send('Hello World: TypeScript');
});

app.listen(port, () => {
  console.log(`Job Board server running on port: ${port}`);
});
