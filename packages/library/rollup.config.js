import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import * as path from "path";

export default [
  {
    input: path.resolve(__dirname, "src", "index.ts"),
    output: {
      sourcemap: true,
      dir: "dist/cjs",
    },
    plugins: [
      resolve(),
      typescript({
        declarationDir: "dist/cjs",
        module: "commonjs",
      }),
    ],
  },

  {
    input: path.resolve(__dirname, "src", "index.ts"),
    output: {
      sourcemap: true,
      dir: "dist/esm",
    },
    plugins: [
      resolve(),
      typescript({
        declarationDir: "dist/esm",
        module: "ESNEXT",
      }),
    ],
  },
];
