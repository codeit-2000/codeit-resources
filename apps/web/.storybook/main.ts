/* eslint-disable @typescript-eslint/no-explicit-any */
import path from "path"; // path 모듈 추가
import type { StorybookConfig } from "@storybook/react-vite";
import svgr from "vite-plugin-svgr";

const config: StorybookConfig = {
  stories: [
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/**/*.mdx",
    "../../../packages/ui/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal: async (config: any) => {
    // 경로 알리아스 설정
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "../src"),
      // 필요한 추가 경로를 여기에 추가
      "@packages": path.resolve(__dirname, "../../../packages"),
    };

    // SVGR 플러그인 추가
    config.plugins = [...config.plugins, svgr()];

    return config;
  },
};

export default config;
