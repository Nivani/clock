import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      // Function is used by setTimeout/setInterval
      "@typescript-eslint/no-unsafe-function-type": "off",
      // any[] is used for calling setTimeout/setInterval handlers
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];
