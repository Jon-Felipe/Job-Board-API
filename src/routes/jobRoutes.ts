import { Router } from 'express';
import { getJob, getJobs } from '../controllers/jobController';

const router = Router();

router.get('/', getJobs);
router.get('/:id', getJob);

export default router;
