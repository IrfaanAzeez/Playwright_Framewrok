const { Given, When, Then } = require('@cucumber/cucumber');
const { LoginPage } = require('../pages/LoginPage');
const { dev: config } = require('../../config/environment.json');

let loginPage;

Given('I launch the browser', async function () {
  loginPage = new LoginPage(this.page);
});

When('I navigate to the login page', async function () {
  await loginPage.navigate(config.baseUrl);
});

// When('I login with valid credentials from config', async function () {
//   await loginPage.login(config.username, config.password);
// });

When('I Create new Student account with needed details', async function () {
  await loginPage.createNewStudentrecord(
    config.FirstName,
    config.MiddleName,
    config.LastName,
    config.Email,
    config.Password
  );
  await loginPage.addSchoolDetails('Zee');
});

// Then('I should see the dashboard', async function () {
//   await loginPage.verifyLogin();
// });
