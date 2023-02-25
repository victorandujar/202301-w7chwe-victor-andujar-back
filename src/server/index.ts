import express from "express";
import morgan from "morgan";
import { usersRouter } from "../routers/usersRouter.js";
import cors from "cors";

export const app = express();
app.disable("x-powered-by");

const corsOptions = {
  origin: [
    "http://localhost:4000/",
    "https://master--202301-w7chwe-victor-andujar.netlify.app/",
  ],
};

app.use(morgan("dev"));
app.use(express.json());
app.use(cors(corsOptions));

app.use("/users", usersRouter);
