const { LoginPage } = require('../pages/LoginPage');
const { ConsentPage  } = require('../pages/ConsentPage');
class PageManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.consentPage = new ConsentPage(page);
  }
}

module.exports = { PageManager };