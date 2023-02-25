import { type Request, type Response } from "express";
import { User } from "../../database/models/Users.js";
import { type UserRegister } from "../../types/types.js";
import { getUsers, registerUser } from "./usersControllers.js";
import bcrypt from "bcryptjs";

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as Partial<Response>;
const req = { file: { originalname: "patatetes" } } as Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserRegister
>;
const next = jest.fn();

describe("Given a getUsers controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call it status method with 200", async () => {
      const expectedStatus = 200;

      User.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue({}),
      }));

      await getUsers(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });
});

describe("Given a registerUser controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call its status method 201", async () => {
      const newUser: UserRegister = {
        name: "Sara",
        email: "sara@yahoo.com",
        username: "sara_88",
        password: "ghf564xfdgxgf",
        phoneNumber: "1234567890",
        image: "sara.png",
        enemies: ["Alex"],
        friends: ["Víctor"],
      };

      const expectedStatusCode = 201;

      req.body = newUser;
      bcrypt.hash = jest.fn().mockResolvedValue("2489478932473298dh");
      User.create = jest.fn().mockResolvedValue(newUser);

      await registerUser(req, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });
});
