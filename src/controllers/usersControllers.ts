import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../CustomError/CustomError.js";
import { User } from "../database/models/Users.js";
import { type UserRegister } from "../types/types.js";
import bcryptjs from "bcryptjs";

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
    const { email, name, password, phoneNumber, username } = req.body;
    const image = req.file?.filename;

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = User.create({
      email,
      name,
      password: hashedPassword,
      phoneNumber,
      username,
      image,
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
