import { type Request, type Response } from "express";
import { User } from "../../database/models/Users";
import { getUsers } from "./usersControllers";

describe("Given a getUsers controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call it status method with 200", async () => {
      const req = {} as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue({}),
      } as Partial<Response>;
      const next = jest.fn();

      const expectedStatus = 200;

      User.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue({}),
      }));

      await getUsers(req, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });
});
