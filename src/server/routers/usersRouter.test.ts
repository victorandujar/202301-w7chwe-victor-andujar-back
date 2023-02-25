import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import connectDataBase from "../../database/connectDataBase";
import { User } from "../../database/models/Users";
import { app } from "..";

let server: MongoMemoryServer;
const url = "/users/register";

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
    relationship: {
      friends: [],
      enemies: ["Alex"],
    },
  };
  describe("When it receives a request with a user", () => {
    beforeEach(async () => {
      await User.deleteMany();
    });

    test("Then it should respond with status 201 and an object with the property 'user'", async () => {
      const expectedStatus = 201;

      const response = await request(app)
        .post(url)
        .set("content-type", "multipart/form-data")
        .field("name", user.name)
        .field("email", user.email)
        .field("username", user.username)
        .field("password", user.password)
        .field("phoneNumber", user.phoneNumber)
        .field("friends", user.relationship.friends)
        .field("enemies", user.relationship.enemies)
        .attach("image", "uploads/image.png")
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("user");
    });
  });
});
