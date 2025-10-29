const playwright = require('playwright');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="UserName"]');
    this.passwordInput = page.locator('(//input[@name="Password"])[1]');
    this.FirstNameInput = page.locator('input[id="FirstName"]');
    this.MiddleNameInput = page.locator('input[id="MiddleName"]');
    this.LastNameInput = page.locator('input[id="LastName"]');
    this.EmailInput = page.locator('input[id="Email"]');
    this.ConfirmEmailInput = page.locator('input[id="ConfirmEmail"]');
    this.createPasswordInput = page.locator('(//input[@name="Password"])[2]');
    this.confirmPasswordInput = page.locator('input[name="ConfirmPassword"]');
    this.healthEnrollmentCheckbox = page.locator('(//label[@for="HealthcareEnrollmentCheckBox"])');
    this.middleNameCheckbox = page.locator('input[id="MiddleChxBox"]');
    this.loginButton = page.locator('input[id="SubmitSignInBtn"]');
    this.createButton = page.locator('input[id="CreateBtn"]');
  }

  async navigate(url) {
    console.log(`Navigating to ${url}`);
    try {
      await this.page.goto(url, { 
        waitUntil: 'networkidle',
        timeout: 30000 
      });
      console.log('Navigation complete');
    } catch (error) {
      console.error('Navigation failed:', error);
      throw error;
    }
  }

  async login(username, password) {
    console.log('Attempting to login');
    try {
      await this.usernameInput.waitFor({ state: 'visible', timeout: 10000 });
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      await this.loginButton.click();
      console.log('Login attempt complete');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  async createNewStudentrecord(fname,mname,lname,email,password)
  {
    console.log('Attempting to create new student record');
    const randomNum = Math.floor(Math.random() * 10000);
    try {
      await this.FirstNameInput.waitFor({ state: 'visible', timeout: 10000 });
      await this.FirstNameInput.fill(fname);
      //await this.middleNameCheckbox.check();
      await this.MiddleNameInput.fill(mname);
      await this.LastNameInput.fill(lname)
      await this.EmailInput.fill(`Test${randomNum}@gmail.com`);
      await this.ConfirmEmailInput.fill(`Test${randomNum}@gmail.com`);
      await this.createPasswordInput.fill(password);
      await this.confirmPasswordInput.fill(password);
      await this.healthEnrollmentCheckbox.uncheck();
      await this.createButton.click();
      console.log('Create new student record attempt complete');
      await this.page.waitForTimeout(10000); // Wait for 10 seconds to observe the result
    } catch (error) {
      console.error('Creating new student record failed:', error);
      throw error;
    }
  }

}

module.exports = { LoginPage };