import * as functions from "firebase-functions";
import { resolve } from "path";
import { existsSync } from "fs";

let config = functions.config().env;

if (
  process.env.NODE_ENV !== "production" &&
  existsSync(resolve(process.cwd(), ".env.json"))
) {
  const env = require(resolve(process.cwd(), ".env.json"));

  config = env;
}

export default config;
