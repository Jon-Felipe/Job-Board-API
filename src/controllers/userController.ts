import { NextFunction, Response } from 'express';
import User, { IUser } from '../models/User';
import { AuthRequest } from '../middleware/authMiddleware';
import NotFoundRequestError from '../errors/not-found-request';

export async function updateUser(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const allowedFields: Array<
      keyof Pick<IUser, 'firstName' | 'lastName' | 'phone' | 'age' | 'address'>
    > = ['firstName', 'lastName', 'phone', 'age', 'address'];
    const updates: Record<string, any> = {};

    for (const key of allowedFields) {
      if (key === 'address' && typeof req.body.address === 'object') {
        for (const [subKey, value] of Object.entries(req.body.address)) {
          updates[`address.${subKey}`] = value;
        }
      } else if (key in req.body) {
        updates[key] = req.body[key];
      }
    }

    const user = await User.findByIdAndUpdate(req.userId, updates, {
      new: true,
    });

    if (!user) {
      throw new NotFoundRequestError('Failed to update user');
    }

    res.status(200).json({ msg: 'User updated' });
  } catch (error) {
    next(error);
  }
}
