const { LoginPage } = require('../pages/LoginPage');
const { ConsentPage  } = require('../pages/ConsentPage');
const { ResidencePage  } = require('../pages/ResidencePage');
const { EmploymentPage } = require('../pages/EmploymentPage');
const {EducationPage} = require('../pages/EducationPage');

class PageManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.consentPage = new ConsentPage(page);
    this.residencePage = new ResidencePage(page);
    this.employementPage = new EmploymentPage(page);
    this.educationPage = new EducationPage(page);
  }
}

module.exports = { PageManager };