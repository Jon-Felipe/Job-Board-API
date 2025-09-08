import { NextFunction, Request, Response } from 'express';
import User from '../models/User';
import BadRequestError from '../errors/bad-request';

export async function registerUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { firstName, lastName, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      throw new BadRequestError('Something went wrong during registration.');
    }

    const user = await new User({
      firstName,
      lastName,
      email,
      password,
    }).save();

    res.status(201).json({
      msg: 'User registered successfully',
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    next(error);
  }
}
