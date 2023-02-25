import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../CustomError/CustomError.js";
import { User } from "../database/models/Users.js";

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