import { NextFunction, Request, Response } from 'express';
import User from '../models/User';
import BadRequestError from '../errors/bad-request';
import { generateToken, setAuthCookie } from '../utils/helpers';

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

    const token = generateToken({ id: user._id });
    setAuthCookie(res, token);

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

export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      throw new BadRequestError('Invalid credentials');
    }

    const userObj = user.toObject() as any;
    delete userObj.password;

    const token = generateToken({ id: user._id });
    setAuthCookie(res, token);

    res.status(200).json({
      msg: 'User logged in successfully',
      user: userObj,
    });
  } catch (error) {
    next(error);
  }
}
