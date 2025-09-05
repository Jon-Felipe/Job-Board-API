import { Request, Response } from 'express';
import Job from '../models/Job';
import getValidTypes from '../utils/helpers';

interface IGetJobsQuery {
  limit?: string;
  employmentType?: string | string[];
  experienceLevel?: string | string[];
}

export async function getJobs(
  req: Request<{}, {}, {}, IGetJobsQuery>,
  res: Response
): Promise<void> {
  const limit = parseInt(req.query.limit as string, 10) || 6;
  const { employmentType, experienceLevel } = req.query;

  let filter: Record<string, any> = {};

  const allowedTypes = ['Full-time', 'Part-time', 'Internship', 'Freelance'];
  const allowedExperienceTypes = ['Entry', 'Mid', 'Senior'];

  const validEmploymentTypes = getValidTypes(employmentType, allowedTypes);
  const validExperienceTypes = getValidTypes(
    experienceLevel,
    allowedExperienceTypes
  );

  if (validEmploymentTypes && validEmploymentTypes.length > 0) {
    filter.employmentType = { $in: validEmploymentTypes };
  }

  if (validExperienceTypes && validExperienceTypes.length > 0) {
    filter.experienceLevel = { $in: validExperienceTypes };
  }

  try {
    const jobs = await Job.find(filter).limit(limit).exec();
    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
