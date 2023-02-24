import express from "express";
import "./loadEnviroment.js";
import morgan from "morgan";
import createDebug from "debug";
import startServer from "./server/startServer.js";
import chalk from "chalk";
import connectDataBase from "./database/connectDataBase.js";

const debug = createDebug("index:*");

const port = process.env.PORT ?? 4000;
const mongoDbUrl = process.env.MONGODB_URL_CONNECTION;

export const app = express();
app.disable("x-powered-by");

app.use(morgan("dev"));
app.use(express.json());

try {
  await connectDataBase(mongoDbUrl!);
  debug(chalk.green("Connected to data base."));

  await startServer(+port);
  debug(chalk.green(`Server listening on port ${port}`));
} catch (error) {
  debug(error.message);
}
