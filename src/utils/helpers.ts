import { Response } from 'express';
import jwt from 'jsonwebtoken';

export default function getValidTypes(
  filter: string | string[] | undefined,
  allowedTypes: string[]
): string[] {
  const types = Array.isArray(filter) ? filter : filter?.split(',');
  return (types ?? [])?.filter((type) => allowedTypes.includes(type));
}

interface TokenPayload {
  id: unknown;
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });
}

export function setAuthCookie(res: Response, token: string) {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 1000,
  });
}
