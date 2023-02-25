import { type Request } from "express";
import { type Jwt } from "jsonwebtoken";

export interface UserLogin {
  username: string;
  password: string;
}

export interface UserRegister extends UserLogin {
  email: string;
  phoneNumber: string;
  name: string;
  image: string;
  friends: string[];
  enemies: string[];
}

export interface CustomRequest extends Request {
  ownerId: string;
}

export interface CustomJwtPayload extends Jwt {
  sub: string;
}
