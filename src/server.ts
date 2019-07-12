import mongoose from "mongoose";

import { LoginServer } from "./login/LoginServer";

import databaseConfig from "./config/database.config.json";

console.log("Starting NodeStory");

mongoose.connect(databaseConfig.url, {
  useCreateIndex: true,
  useNewUrlParser: true,
});
mongoose.connection.on("open", () => {
  console.log("Connected to database.");

  // Start servers only after database connection
  new LoginServer().start();
});
