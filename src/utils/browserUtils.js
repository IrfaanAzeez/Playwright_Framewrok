const playwright = require("playwright");

async function launchBrowser(headed = false) {
  const browser = await playwright.chromium.launch({
    headless: !headed,
    channel: "chrome",
    args: ["--start-maximized"],
    timeout: 30000
  });
  const context = await browser.newContext({
    viewport: null,
    navigationTimeout: 30000,
    actionTimeout: 15000
  });
  const page = await context.newPage();
  return { browser, context, page };
}

module.exports = { launchBrowser };
