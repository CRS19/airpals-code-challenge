import { configDefaults, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      provider: "istanbul",
      reporter: ["cobertura", "json", "html", "text-summary"],
      reportsDirectory: "./coverage",
      branches: 100,
      include: ["**/*.ts", "**/*.tsx"],
      exclude: [...configDefaults.coverage.exclude, "./vitest.setup.ts"],
    },
    environment: "happy-dom",
  },
});
