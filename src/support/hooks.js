const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const fs = require('fs');
const path = require('path');

setDefaultTimeout(60 * 1000);
const now = new Date();
const timestamp = now.toISOString().replace(/[:.]/g, '-');

Before(async function (scenario) {
  this.scenarioName = scenario.pickle.name.replace(/[^a-z0-9]/gi, '_');
  this.scenarioDir = path.join('C:\\Reports', `${this.scenarioName}_${timestamp}`);

  // ✅ Create local folders for screenshots only
  fs.mkdirSync(path.join(this.scenarioDir, 'screenshots'), { recursive: true });

  // ✅ Ensure Allure global results dir exists
  fs.mkdirSync(path.join('C:\\Reports', 'allure-results'), { recursive: true });

  await this.init();
});

After(async function (scenario) {
  if (scenario.result.status === 'FAILED' && this.page) {
    const screenshotPath = path.join(this.scenarioDir, 'screenshots', `${this.scenarioName}.png`);
    const screenshot = await this.page.screenshot({ path: screenshotPath, fullPage: true });
    await this.attach(screenshot, 'image/png');
  }

  await this.closeBrowser();
});
