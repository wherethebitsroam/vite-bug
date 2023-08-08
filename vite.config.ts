import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    tsconfigPaths(),
  ],
  server: {
    port: 3000,
    headers: {
      "Content-Security-Policy": "frame-ancestors 'none'",
    },
  },
  build: {
    outDir: "build",
    sourcemap: true,
  },
});
