import { Request, Response } from 'express';
import Job from '../models/Job';

interface IGetJobsQuery {
  limit?: string;
}

export async function getJobs(
  req: Request<{}, {}, {}, IGetJobsQuery>,
  res: Response
): Promise<void> {
  const limit = parseInt(req.query.limit as string, 10) || 6;

  let query = Job.find({});

  if (limit > 0) {
    query = query.limit(limit);
  }

  try {
    const jobs = await query.exec();
    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
