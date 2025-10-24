import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/helpers';
import UnauthenticatedError from '../errors/unauthenticated-request';

export interface AuthRequest extends Request {
  userId?: unknown;
}

export function authenticateUser(
  req: AuthRequest,
  _: Response,
  next: NextFunction
) {
  const token = req.cookies?.token;
  if (!token) throw new UnauthenticatedError('authentication invalid');

  try {
    const { userId } = verifyToken(token);
    req.userId = userId;
    next();
  } catch (error) {
    throw new UnauthenticatedError('authentication invalid');
  }
}
