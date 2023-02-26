import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import connectDataBase from "../../database/connectDataBase";
import { User } from "../../database/models/Users";
import { app } from "..";
import { type UserRegister, type UserLogin } from "../../types/types";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

let server: MongoMemoryServer;
const urlRegister = "/users/register";
const urlLogin = "/users/login";

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDataBase(server.getUri());
});

afterEach(async () => {
  await User.deleteMany();
});

afterAll(async () => {
  await server.stop();
  await mongoose.connection.close();
});

describe("Given a POST users/register", () => {
  const user = {
    name: "Sara",
    email: "sara@yahoo.com",
    username: "sara_88",
    password: "ghf564xfdgxgf",
    phoneNumber: "1234567890",
    image: "sara.png",
    friends: [],
    enemies: [],
  };
  describe("When it receives a request with a user", () => {
    beforeEach(async () => {
      await User.deleteMany();
    });

    test("Then it should respond with status 201 and an object with the property 'user'", async () => {
      const expectedStatus = 201;

      const response = await request(app)
        .post(urlRegister)
        .set("content-type", "multipart/form-data")
        .field("name", user.name)
        .field("email", user.email)
        .field("username", user.username)
        .field("password", user.password)
        .field("phoneNumber", user.phoneNumber)
        .field("friends", user.friends)
        .field("enemies", user.enemies)
        .attach("image", "uploads/image.png")
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("user");
    });
  });
});

describe("Given a POST /users/login endpoint", () => {
  const user: UserLogin = {
    username: "ammavaru",
    password: "123456789",
  };

  const mockUser: UserRegister = {
    email: "adjkhdsaj@gmail.com",
    enemies: [],
    friends: [],
    image: "",
    name: "Victor",
    password: "123456789",
    phoneNumber: "2367432476",
    username: "ammavaru",
  };

  describe("When it receives a request with a username 'ammavaru' and a password '123456789'", () => {
    test("Then it should call its status method with 200 and ab object with the property 'token'", async () => {
      jwt.sign = jest.fn().mockImplementation(() => ({
        token: "asdfasdfasdfgsadf3242345",
      }));
      const expectedStatus = 200;
      const hashedpassword = await bcrypt.hash(user.password, 10);

      await User.create({
        ...mockUser,
        password: hashedpassword,
      });

      const response = await request(app)
        .post(urlLogin)
        .send(user)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("token");
    });
  });
});
