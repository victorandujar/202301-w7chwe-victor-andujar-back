import "../../loadEnvironment.js";
import { type NextFunction, type Response } from "express";
import { CustomError } from "../../CustomError/CustomError.js";
import { type CustomJwtPayload, type CustomRequest } from "../../types/types";
import jwt from "jsonwebtoken";

const auth = (req: CustomRequest, res: Response, next: NextFunction) => {
  if (!req.header("Authorization")) {
    const customError = new CustomError(
      "Missing authorization header.",
      401,
      "Missin token."
    );

    next(customError);
    return;
  }

  if (!req.header("Authorization")?.replace(/Bearer\s*/, "")) {
    const customError = new CustomError(
      "Missing authorization header.",
      401,
      "Bearer has not been replaced."
    );

    next(customError);
    return;
  }

  const token = req.header("Authorization")?.replace(/Bearer\s*/, "");

  try {
    const { sub: ownerId } = jwt.verify(
      token!,
      process.env.JWT_SECRET!
    ) as CustomJwtPayload;

    req.ownerId = ownerId;
  } catch (error: unknown) {
    next(error);
  }

  next();
};

export default auth;
