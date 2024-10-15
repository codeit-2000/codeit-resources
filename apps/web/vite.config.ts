import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    svgr(),
  ],
  resolve: {
    alias: {
      "@src": resolve(__dirname, "src"), // 절대 경로 설정
      "@shared-assets": resolve(__dirname, "../../packages/shared-assets"), // 절대 경로 설정
    },
  },
});
