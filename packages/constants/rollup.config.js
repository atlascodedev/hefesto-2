import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import * as path from "path";
import { terser } from "rollup-plugin-terser";
import babel from "@rollup/plugin-babel";

export default [
  {
    input: path.resolve(__dirname, "src", "index.ts"),
    output: {
      file: `dist/index.min.js`,
      format: "umd",
      name: "library",
      esModule: false,
      exports: "named",
      sourcemap: true,
    },
    plugins: [
      resolve(),
      typescript({ declaration: false }),
      babel({ babelHelpers: "bundled" }),
      terser(),
    ],
  },

  {
    input: path.resolve(__dirname, "src", "index.ts"),
    output: {
      file: "dist/index.esm.js",
      format: "esm",
      exports: "named",
      sourcemap: true,
    },
    plugins: [resolve(), typescript({ declaration: false })],
  },

  {
    input: path.resolve(__dirname, "src", "index.ts"),
    output: {
      file: "dist/index.js",
      format: "cjs",
      exports: "named",
      sourcemap: true,
    },
    plugins: [resolve(), typescript({ declaration: false })],
  },
];
