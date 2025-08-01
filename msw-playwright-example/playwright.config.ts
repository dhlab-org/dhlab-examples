import { defineConfig, devices } from "@playwright/test";

const reporterPath = new URL(
  "./node_modules/@dhlab/e2e-autogen/dist/packages/playwright/reporter.js",
  import.meta.url
).pathname;

export default defineConfig({
  testDir: "./playwright/e2e",
  fullyParallel: true,
  retries: 1,
  workers: undefined,
  reporter: [
    ["html", { outputFolder: "./playwright/reporters" }],
    [
      reporterPath,
      {
        outputFile: "./playwright/e2e-autogen-report.json",
      },
    ],
  ],
  use: {
    baseURL: "http://localhost:5173",
    trace: "on",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
  webServer: {
    command: "yarn dev",
    url: "http://localhost:5173",
    reuseExistingServer: true,
  },
});
