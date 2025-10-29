const { setWorldConstructor } = require('@cucumber/cucumber');
const { launchBrowser } = require('../utils/browserUtils');

class CustomWorld {
  constructor({ attach, parameters }) {
    this.attach = attach;       // ✅ now available in hooks
    this.parameters = parameters;

    this.browser = null;
    this.context = null;
    this.page = null;
    this.scenarioName = null;
    this.scenarioDir = null;
  }

  async init() {
    const { browser, context, page } = await launchBrowser(true);
    this.browser = browser;
    this.context = context;
    this.page = page;
  }

  async closeBrowser() {
    if (this.browser) await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);
