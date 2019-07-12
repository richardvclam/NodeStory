import mongoose from "mongoose";

import { Log } from "@core/utils/Log";

import databaseConfig from "./config/database.config.json";
import serverConfig from "./config/server.config.json";

import { LoginServer } from "./login/LoginServer";

const { version, subversion } = serverConfig;

Log.info("Starting NodeStory...");
Log.info(`Version: ${version}.${subversion}`);

const loginServer = new LoginServer();
loginServer.init();

mongoose.connect(databaseConfig.url, {
  useCreateIndex: true,
  useNewUrlParser: true,
});
mongoose.connection.on("open", () => {
  Log.info("Connected to database.");

  // Start servers only after database connection
  loginServer.start();
});
