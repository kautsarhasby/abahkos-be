import globals from "globals";
import pluginJs from "@eslint/js";
import pluginImport from "eslint-plugin-import";
/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    plugins: { import: pluginImport },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "import/no-unresolved": "error",
      "import/named": "error",
    },
  },
];
