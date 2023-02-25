import { Router } from "express";
import { getUsers } from "../controllers/usersControllers.js";
import { app } from "../server/index.js";

export const usersRouter = Router();

app.get("/users", getUsers);
