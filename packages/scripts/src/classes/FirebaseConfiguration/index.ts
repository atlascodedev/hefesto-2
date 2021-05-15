import { HefestoConfig } from "@atlascode/hefesto-types";
import * as fs from "fs";
import { resolve } from "path";
import { promisify } from "util";

const readFile = promisify(fs.readFile);

class FirebaseConfiguration {
  private readonly configPath: string;

  constructor(configPath: string) {
    this.configPath = configPath;
  }

  private checkConfigExists(): boolean {
    return fs.existsSync(resolve(this.configPath));
  }

  public async checkFirebaseConfigExists() {
    if (this.checkConfigExists()) {
      let configValue: string | null = null;

      try {
        configValue = await readFile(this.configPath, { encoding: "utf8" });

        let parsedConfig: HefestoConfig = JSON.parse(configValue.toString());

        if (parsedConfig.firebase) {
          return true;
        } else {
          console.log(
            "Firebase configuration object was not found within Hefesto configuration file"
          );
          return false;
        }
      } catch (error) {
        throw new Error(
          "Could not find or read file at specified path:" + this.configPath
        );
      }
    }
  }

  public async verifyFirebaseImplementation(): Promise<boolean> {
    if (this.checkConfigExists()) {
      let configurationFile = await readFile(this.configPath, {
        encoding: "utf8",
      });

      let parsedFile: HefestoConfig = JSON.parse(configurationFile.toString());

      return Boolean(
        parsedFile.firebase &&
          parsedFile &&
          "locationId" in parsedFile.firebase &&
          "appId" in parsedFile.firebase &&
          "projectId" in parsedFile.firebase &&
          "apiKey" in parsedFile.firebase &&
          "authDomain" in parsedFile.firebase &&
          "messagingSenderId" in parsedFile.firebase &&
          "measurementId" in parsedFile.firebase &&
          "storageBucket" in parsedFile.firebase
      );
    } else {
      return false;
    }
  }
}

export default FirebaseConfiguration;
