const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const fs = require('fs');
const path = require('path');
const { getAuthHandler } = require('../authorization/authHandler');
const { dev: config } = require('../../config/environment.json');

setDefaultTimeout(120 * 1000);
const now = new Date();
const timestamp = now.toISOString().replace(/[:.]/g, '-');

Before(async function (scenario) {
  this.scenarioName = scenario.pickle.name.replace(/[^a-z0-9]/gi, '_');
  this.scenarioDir = path.join('C:\\Reports', `${this.scenarioName}_${timestamp}`);

  // ✅ Create local folders for screenshots only
  fs.mkdirSync(path.join(this.scenarioDir, 'screenshots'), { recursive: true });

  // ✅ Ensure Allure global results dir exists
  fs.mkdirSync(path.join('C:\\Reports', 'allure-results'), { recursive: true });

  // 🔐 Authenticate and get bearer token (Optional - only if needed)
  try {
    const authHandler = getAuthHandler();
    const token = await authHandler.getBearerToken(
    config.authURL,
    config.clientId,
    config.clientSecret
    );
    console.log(`🔐 Authentication successful. Token obtained.`);
  } catch (error) {
    // Only fail if auth is required
    console.warn(`⚠️  Authentication warning: ${error.message}`);
    // Uncomment below to make auth required:
    // throw error;
  }

  await this.init();
});

After(async function (scenario) {
  if (scenario.result.status === 'FAILED' && this.page) {
    const screenshotPath = path.join(this.scenarioDir, 'screenshots', `${this.scenarioName}.png`);
    const screenshot = await this.page.screenshot({ path: screenshotPath, fullPage: true });
    await this.attach(screenshot, 'image/png');
  }

  // Clear auth after scenario
  const authHandler = getAuthHandler();
authHandler.clearAll();

  await this.closeBrowser();
});