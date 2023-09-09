import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

import tsconfig from "./tsconfig.json";

const SRC_PATH = path.resolve(__dirname, "src");

const parseTsConfigPaths = (
  paths: Record<string, string[]>
): Record<string, string> => {
  const webpackConfigAliases: Record<string, string> = {};

  Object.entries(paths).forEach(([alias, paths]) => {
    const aliasPath = paths[0];

    webpackConfigAliases[alias] = path.join(SRC_PATH, aliasPath);
  });

  return webpackConfigAliases;
};

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: parseTsConfigPaths(tsconfig.compilerOptions.paths),
  },
});
