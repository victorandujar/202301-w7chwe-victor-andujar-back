import express from "express";
import "./loadEnviroment.js";
import morgan from "morgan";
import createDebug from "debug";
import startServer from "./server/startServer.js";
import chalk from "chalk";

const debug = createDebug("index:*");

const port = process.env.PORT ?? 4000;

export const app = express();
app.disable("x-powered-by");

app.use(morgan("dev"));
app.use(express.json());

try {
  await startServer(+port);
  debug(chalk.green(`Server listening on port ${port}`));
} catch (error) {
  debug(error.message);
}
