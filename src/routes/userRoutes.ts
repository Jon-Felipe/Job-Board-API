import { Router } from 'express';
import { updateUser } from '../controllers/userController';

const router = Router();

router.post('/update-user', updateUser);

export default router;
