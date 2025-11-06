const { Given, When, Then,} = require('@cucumber/cucumber');
const { LoginPage } = require('../pages/LoginPage');
const { dev: config } = require('../../config/environment.json');
const { ConsentPage } = require('../pages/ConsentPage');
const { ResidencePage } = require('../pages/ResidencePage');
const { EmploymentPage } = require('../pages/EmploymentPage');
const { EducationPage } = require('../pages/EducationPage');
const { LicencePage } = require('../pages/LicencePage');
const {PersonalPage} = require('../pages/PersonalPage');

let loginPage;
let consentPage;
let residencePage;
let employmentPage;
let educationPage;
let licencePage;
let personalPage;

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
  personalPage = new PersonalPage(this.page);
  await this.page.waitForTimeout(3000);
  console.log('Filling personal details now');
  await personalPage.fillPersonalDetails("7571234567", "testtest99@gmail.com","123-45-6789");
  await personalPage.addNewName("Test","Test");
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

Then ('I should add the Eduction details', async function () {
  educationPage = new EducationPage(this.page);
  await this.page.waitForTimeout(3000);
  console.log('Adding Education details now');
  await educationPage.addNewEducation();
});

Then ('I should add the License details', async function () {
  licencePage = new LicencePage(this.page);
  await this.page.waitForTimeout(3000);
  console.log('Adding License details now');
  await licencePage.addNewLicense();
});

Then ('I should sign the Authorization page', async function () {
  await this.page.waitForTimeout(3000);
  consentPage = new ConsentPage(this.page, this.context);
  console.log('Signing Authorization page now');
  await consentPage.submitAuthorization();
  await consentPage.submitReviewAndSubmit();
});

