import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './__tests__',
  outputDir: './tmp/artifacts',
  use: {
    baseURL: 'http://127.0.0.1:8080',
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure',
    locale: 'ru-RU',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: process.env.PROJECT_DIR
    ? {
        command: 'npm run start -- --host 127.0.0.1 --port 8080 --strictPort',
        cwd: process.env.PROJECT_DIR,
        url: 'http://127.0.0.1:8080',
        timeout: 30_000,
        reuseExistingServer: false,
      }
    : undefined,
});
