import { NextFunction, Request, Response } from "express";
import { CustomError } from "../CustomError/CustomError";
import { User } from "../database/models/Users";

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
      error.message,
      500,
      "Couldn't retrieve users."
    );
  }
};
