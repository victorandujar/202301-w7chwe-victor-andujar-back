import createDebug from "debug";
import { type Response, type Request, type NextFunction } from "express";
import { CustomError } from "../../CustomError/CustomError.js";

const debug = createDebug("users:server");

export const notFoundError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new CustomError("Path not found", 404, "Endpoint not found");

  next(error);
};

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  debug(error.message);

  res
    .status(error.statusCode || 500)
    .json({ error: error.publicMessage || "Something went wrong." });
};
