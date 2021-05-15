import { resolve } from "path";
import { readFile } from "fs";
import { promisify } from "util";
import { spawn, execSync } from "child_process";

const readFilePromise = promisify(readFile);

class CloudFunctionsEnvironment {
  constructor(private readonly envPath: string) {}

  public async getLocalEnvironmentVariables() {
    let envLocal: string = "";

    try {
      envLocal = await readFilePromise(this.envPath, { encoding: "utf8" });
    } catch (error) {
      throw new Error("Could not find .env.json file at root folder");
    }

    return envLocal;
  }

  public async setRemoteEnvironmentVariables() {
    let envLocal: string | null | undefined =
      await this.getLocalEnvironmentVariables();

    if (envLocal && envLocal.length > 0) {
      const firebaseSetRemoteProcess = spawn("firebase", [
        "functions:config:set",
        `env=${envLocal}`,
      ]);

      firebaseSetRemoteProcess.stdout.on("data", (chunk: Buffer) => {
        console.log(chunk.toString());
      });

      firebaseSetRemoteProcess.on("error", (err: Error) => {
        console.error(err.message);
      });

      firebaseSetRemoteProcess.on("close", (code: number, signal) => {
        if (code === 0) {
          console.log("Process finished successfully");
        } else {
          console.error(`Process terminated with an error code: ${code}`);
        }
      });
    } else {
      console.error(
        "The .env.json file could not be found at root directory or its empty"
      );
    }
  }

  public async getRemoteEnvironmentVariables() {
    let dataString: string = "";

    const firebaseGetRemoteEnvProcess = spawn("firebase", [
      "functions:config:get",
    ]);

    firebaseGetRemoteEnvProcess.stdout.on("data", (chunk: Buffer) => {
      dataString += chunk.toString();
    });

    return new Promise((resolve, reject) => {
      firebaseGetRemoteEnvProcess.on("error", (err: Error) => {
        reject(`The following error occurred: ${err}`);
      });

      firebaseGetRemoteEnvProcess.on("close", (code: number, signal) => {
        if (code === 0) {
          resolve(JSON.parse(dataString));
        } else {
          const err: NodeJS.ErrnoException = new Error(
            `Child process exited with code: ${code}`
          );

          reject(err);
        }
      });
    });
  }

  public unsetRemoteEnvironmentVariables() {
    try {
      execSync("firebase functions:config:unset env");

      console.log(
        "Cloud functions environment variables were unset successfully"
      );
    } catch (error) {
      console.error(
        `An error occurred when trying to unset your cloud functions environment variables: \n ${error}`
      );
    }
  }
}

export default CloudFunctionsEnvironment;
