import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
  code?: number;
  keyValue?: Record<string, any>;
  errors?: Record<string, { message: string }>;
}

function errorHandlerMiddleware(
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong, try again later';

  if (err.name === 'ValidationError' && err.errors) {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((item) => item.message)
      .join(', ');
  }
  if (err.code === 11000 && err.keyValue) {
    statusCode = 400;
    const fields = Object.keys(err.keyValue).join(', ');
    message = `${fields} field(s) has to be unique`;
  }

  res.status(statusCode).json({ success: false, message });
}

export default errorHandlerMiddleware;
