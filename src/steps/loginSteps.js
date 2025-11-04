const { Given, When, Then } = require('@cucumber/cucumber');
const { LoginPage } = require('../pages/LoginPage');
const { dev: config } = require('../../config/environment.json');
const { ConsentPage } = require('../pages/ConsentPage');
const { ResidencePage } = require('../pages/ResidencePage');
const { EmploymentPage } = require('../pages/EmploymentPage');

let loginPage;
let consentPage;
let residencePage;
let employmentPage;

Given('I launch the browser', async function () {
  loginPage = new LoginPage(this.page);
});

When('I navigate to the login page', async function () {
  await loginPage.navigate(config.baseUrl);
});

When('I login with valid credentials from config', async function () {
  await loginPage.login(config.username, config.password);
  await loginPage.addSchoolDetails('Zee');
});

// When('I Create new Student account with needed details', async function () {
//   await loginPage.createNewStudentrecord(
//     config.FirstName,
//     config.MiddleName,
//     config.LastName,
//     config.Email,
//     config.Password
//   );
//   await loginPage.addSchoolDetails('Zee');
// });

Then('I should provide consent signature', async function () {
  //let fname = test;
  consentPage = new ConsentPage(this.page);
  await this.page.waitForTimeout(3000);
  console.log('Providing consent signature now');
  await consentPage.submitConsent("test");
  await consentPage.submitConsent("test");
  await consentPage.submitConsent("test");
  await consentPage.submitConsent("test");
});

Then('I should fill the personal details', async function () {
  await this.page.waitForTimeout(3000);
  console.log('Filling personal details now');
  await consentPage.fillPersonalDetails("7571234567", "testtest99@gmail.com","123-45-6789");
  await consentPage.addNewName("Test","Test");
});

Then('I shoud fill the Residence details', async function () {
  residencePage = new ResidencePage(this.page);
  await this.page.waitForTimeout(3000);
  console.log('Adding Residence details now');
  await residencePage.addNewResidence("123 Main St Apt 4B","New York","NY","10001","USA");
});

When('I should add the criminal records', async function () {
  await this.page.waitForTimeout(3000);
  console.log('Adding Criminal Record details now');
  await residencePage.addCriminalRecord("Theft","New York","NY","Bufor");
});

Then('I should add the Employment details', async function () {
  employmentPage = new EmploymentPage(this.page);
  await this.page.waitForTimeout(3000);
  console.log('Adding Employment details now');
  await employmentPage.addNewEmployment();
});

