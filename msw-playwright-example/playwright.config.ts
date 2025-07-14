import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./playwright/e2e",
  fullyParallel: true,
  retries: 1,
  workers: undefined,
  reporter: [
    ["html", { outputFolder: "./playwright/reporters" }],
    ["json", { outputFile: "./playwright/reporters/results.json" }],
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
