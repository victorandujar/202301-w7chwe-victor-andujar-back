import "../../loadEnvironment.js";
import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../CustomError/CustomError.js";
import { User } from "../../database/models/Users.js";
import { type UserLogin, type UserRegister } from "../../types/types.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find().exec();

    res.status(200).json({ users });
  } catch (error) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Couldn't retrieve users."
    );

    next(customError);
  }
};

export const registerUser = async (
  req: Request<Record<string, unknown>, Record<string, unknown>, UserRegister>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, name, password, phoneNumber, username, enemies, friends } =
      req.body;
    const image = req.file?.filename;

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await User.create({
      email,
      name,
      password: hashedPassword,
      phoneNumber,
      username,
      image,
      enemies,
      friends,
    });

    res.status(201).json({ user });
  } catch (error) {
    const customError = new CustomError(
      "Couldn't create the user.",
      500,
      "Couldn't create the user."
    );

    next(customError);
  }
};

export const loginUser = async (
  req: Request<Record<string, unknown>, Record<string, unknown>, UserLogin>,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  const passwordConfirmation = await bcryptjs.compare(password, user!.password);

  if (!user || !passwordConfirmation) {
    const customError = new CustomError(
      "Wrong credentials.",
      401,
      "Wrong credentials."
    );

    next(customError);
    return;
  }

  const jwtPayload = {
    sub: user._id,
  };

  const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!);

  res.status(200).json({ token });
};
