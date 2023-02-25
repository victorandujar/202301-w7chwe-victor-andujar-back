import express from "express";
import morgan from "morgan";
import { usersRouter } from "../routers/usersRouter.js";
import cors from "cors";

export const app = express();
app.disable("x-powered-by");

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/users", usersRouter);
