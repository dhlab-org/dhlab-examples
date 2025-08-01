import { defineConfig } from "@dhlab/e2e-autogen";

export default defineConfig({
  sheetsUrl:
    "https://docs.google.com/spreadsheets/d/1AuqnVaipoquSgNYHCVEySgHdWZNErCBke40rcXPv9RY/edit",
  stubOutputFolder: "./playwright/__generated-stub__",
  jsonReporterFile: "./playwright/e2e-autogen-report.json",
  credentialsFile: "./playwright/.auth/credentials.json",
  mswHandlersFile: "./src/app/mocks/__handlers__/index.ts",
});
