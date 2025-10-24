import { Request, Response } from 'express';

export async function updateUser(req: Request, res: Response) {
  const body = req.body;

  res.status(200).json(body);
}
