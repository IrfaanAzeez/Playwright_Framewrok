// Minimal Playwright config used by the framework (optional)
// This file is present so IDEs and tooling that look for Playwright config find it.
module.exports = {
  timeout: 30000,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 }
  }
};