import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    // shadcn CLI owns these files — we don't hand-edit them, so the generated
    // setState-in-effect pattern is exempted instead.
    files: ["src/components/ui/**", "src/hooks/use-mobile.ts"],
    rules: {
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);

export default eslintConfig;
