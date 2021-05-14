import { spawn, SpawnOptions } from "child_process";
const BufferList = require("bl");

const awaitSpawn = (
  command: string,
  args: string[],
  options?: SpawnOptions
) => {
  const child = spawn(command, args, options ? options : {});
  const stdout: any = child.stdout ? new BufferList() : "";
  const stderr: any = child.stderr ? new BufferList() : "";

  if (child.stdout) {
    child.stdout.on("data", (data: Buffer) => {
      stdout.append(data);
    });
  }

  if (child.stderr) {
    child.stderr.on("data", (data: Buffer) => {
      stderr.append(data);
    });
  }

  return new Promise((resolve, reject) => {
    child.on("error", reject);

    child.on("close", (code: number) => {
      if (code === 0) {
        resolve(stdout);
      } else {
        const err = new Error(`child exited with code ${code}`);

        reject(err);
      }
    });
  });
};

export default awaitSpawn;
