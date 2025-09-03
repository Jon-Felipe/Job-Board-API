import { Request, Response } from 'express';
import Job from '../models/Job';

interface IGetJobsQuery {
  limit?: string;
  employmentType?: string | string[];
}

export async function getJobs(
  req: Request<{}, {}, {}, IGetJobsQuery>,
  res: Response
): Promise<void> {
  const limit = parseInt(req.query.limit as string, 10) || 6;
  const { employmentType } = req.query;

  let filter: Record<string, any> = {};

  const allowedTypes = ['Full-time', 'Part-time', 'Internship', 'Freelance'];
  const types = Array.isArray(employmentType)
    ? employmentType
    : employmentType?.split(',');

  const validTypes = types?.filter((type) => allowedTypes.includes(type));

  if (validTypes && validTypes.length > 0) {
    filter.employmentType = { $in: validTypes };
  }

  try {
    const jobs = await Job.find(filter).limit(limit).exec();
    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
