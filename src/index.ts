import "./loadEnvironment.js";
import createDebug from "debug";
import startServer from "./server/startServer.js";
import chalk from "chalk";
import connectDataBase from "./database/connectDataBase.js";
import mongoose from "mongoose";

const debug = createDebug("index:*");

const port = process.env.PORT ?? 4000;
const mongoDbUrl = process.env.MONGODB_URL_CONNECTION;

mongoose.set("toJSON", {
  virtuals: true,
  transform(doc, ret) {
    delete ret._id;
    delete ret.__v;
  },
});

try {
  await connectDataBase(mongoDbUrl!);
  debug(chalk.green("Connected to data base."));

  await startServer(+port);
  debug(chalk.green(`Server listening on port ${port}`));
} catch (error) {
  debug(error.message);
}
