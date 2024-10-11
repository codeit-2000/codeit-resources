module.exports = {
  root: true,
  ignorePatterns: ["dist"],
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "@repo/eslint-config/react-internal",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
      extends: ["plugin:@typescript-eslint/recommended"],
    },
  ],
  plugins: ["react-refresh", "simple-import-sort"],
  rules: {
    "no-console": "error",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          // 그룹 간 줄바꿈 없이 단일 그룹으로 처리
          ["^\\u0000", "^@?\\w", "^", "^\\."],
        ],
      },
    ],
    "simple-import-sort/exports": "error",
  },
};
