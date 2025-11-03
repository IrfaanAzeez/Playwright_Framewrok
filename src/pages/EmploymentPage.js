const playwright = require("playwright");
class EmploymentPage {
  constructor(page) {
    this.page = page;
    this.consentCheckBox = page.locator('label[for="ConsentCheckbox"]');
  }
}
exports = { EmploymentPage };