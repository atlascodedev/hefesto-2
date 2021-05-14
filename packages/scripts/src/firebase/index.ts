import * as path from "path";
import * as fs from "fs";
import { promisify } from "util";
import * as child_process from "child_process";

let envPath: string = path.resolve(process.cwd(), ".env.json");

const readFile = promisify(fs.readFile);

export const getLocalEnvinronmentVariables = async (): Promise<string> => {
  let envContent: string = "";

  try {
    envContent = await readFile(envPath, {
      encoding: "utf8",
    });
  } catch (error) {
    console.log(error);
  }

  return envContent;
};

export const setRemoveEnvinronmentVariables = async (): Promise<void> => {
  let envContent: string | null = "";

  envContent = await getLocalEnvinronmentVariables();

  if (envContent && envContent.length > 0) {
    let firebaseFnProcess = child_process.spawn("firebase", [
      "functions:config:set",
      `env=${envContent}`,
    ]);

    firebaseFnProcess.stdout.on("data", (chunk: Buffer) => {
      console.log(chunk.toString());
    });

    firebaseFnProcess.stdout.on("error", (err: Error) => {
      console.error(err.message);
    });

    firebaseFnProcess.on("close", (code, signal) => {
      console.log("CODE:" + code);
      console.log("SIGNAL:" + signal);
    });
  } else {
    console.error(
      "The .env.json file could not be found at the root directory or its empty"
    );
  }
};

export const getRemoteEnvinromentVariables = async (): Promise<object> => {
  let dataString: string = "";

  const firebaseGetRemoteEnvProcess = child_process.spawn("firebase", [
    "functions:config:get",
  ]);

  firebaseGetRemoteEnvProcess.stdout.on("data", (chunk: Buffer) => {
    dataString += chunk.toString();
  });

  return new Promise((resolve, reject) => {
    firebaseGetRemoteEnvProcess.on("error", (err: Error) => {
      reject("The following error ocurred" + err.message);
    });

    firebaseGetRemoteEnvProcess.on("close", (code, signal) => {
      if (code === 0) {
        resolve(JSON.parse(dataString));
      } else {
        const err: NodeJS.ErrnoException = new Error(
          `Child process exited with code ${code}`
        );
        reject(err);
      }
    });
  });
};

getRemoteEnvinromentVariables()
  .then((value) => console.log(`I got this value: ${JSON.stringify(value)}`))
  .catch((error) => {
    console.log(error);
  });
