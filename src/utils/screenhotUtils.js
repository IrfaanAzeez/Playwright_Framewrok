const fs = require('fs');
const path = require('path');

/**
 * Takes a screenshot and saves it to C:\Reports\<scenarioDir>\screenshots\<name>_<timestamp>.png
 * @param {Object} world - The current Cucumber world (must include this.page and this.scenarioDir)
 * @param {string} name - A short label for the screenshot (e.g., "AfterLogin", "ErrorState")
 */
async function takeScreenshot(world, name = 'screenshot', pageOverride = null) {
  const page = pageOverride || world.page;

  if (!page) {
    console.warn('⚠️ Cannot take screenshot: page is not defined.');
    return;
  }

  try {
    // Ensure screenshot directory exists
    const screenshotDir = path.join(world.scenarioDir, 'screenshots');
    fs.mkdirSync(screenshotDir, { recursive: true });

    // Generate timestamped file name
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `${name}_${timestamp}.png`;
    const filePath = path.join(screenshotDir, fileName);

    // Capture screenshot
    //await world.page.screenshot({ path: filePath, fullPage: true });
    await page.screenshot({ path: filePath, fullPage: true });

    // Attach screenshot to report (if supported)
    if (world.attach) {
      const screenshotBuffer = fs.readFileSync(filePath);
      await world.attach(screenshotBuffer, 'image/png');
    }

    console.log(`📸 Screenshot saved: ${filePath}`);
    return filePath;

  } catch (error) {
    console.error('❌ Failed to take screenshot:', error);
  }
}

module.exports = { takeScreenshot };
