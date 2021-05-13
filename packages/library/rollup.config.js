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
        declaration: true,
        declarationDir: "dist/cjs",
        module: "commonjs",
        moduleResolution: "node",
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
        declaration: true,
        declarationDir: "dist/esm",
        module: "ESNEXT",
        moduleResolution: "node",
      }),
    ],
  },
];
