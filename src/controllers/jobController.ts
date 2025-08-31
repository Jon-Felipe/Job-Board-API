import { Request, Response } from 'express';
import Job from '../models/Job';

export async function getJobs(_: Request, res: Response): Promise<void> {
  try {
    const jobs = await Job.find({});
    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
