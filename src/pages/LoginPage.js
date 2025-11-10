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
    this.schoolInput = page.locator('input[name="SchoolId_input"]');
    this.selectProgramDropDown = page.locator('//span[@role="listbox"]//span[@class="k-dropdown-wrap k-state-default"]');
    this.selectProgramDropDownList = page.locator('//ul[@id="SchoolProgramId_listbox"]//li[@role="option"]');
    this.backgroundCheckBox = page.locator('input[title="Background Check"]');
    this.drugTestCheckBox = page.locator('input[title="Drug Test"]');
    this.ImmunizationCheckBox = page.locator('input[title="Immunization"]');
    this.startApplicationButton = page.locator('input[value="Start Application"]');


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
      await this.EmailInput.fill(`${fname}${randomNum}@gmail.com`);
      await this.ConfirmEmailInput.fill(`${fname}${randomNum}@gmail.com`);
      await this.createPasswordInput.fill(password);
      await this.confirmPasswordInput.fill(password);
      await this.healthEnrollmentCheckbox.uncheck();
      await this.createButton.click();
      console.log('Create new student record attempt complete');
      await this.page.waitForTimeout(5000); // Wait for 10 seconds to observe the result
    } catch (error) {
      console.error('Creating new student record failed:', error);
      throw error;
    }
  }
  
  async addSchoolDetails(schoolName){
    console.log('Attempting to add school details');
    try {
      await this.schoolInput.waitFor({ state: 'visible', timeout: 10000 });
      await this.schoolInput.fill(schoolName);
      await this.page.waitForTimeout(1000); // Wait for suggestions to load
      await this.page.keyboard.press('Enter');
      await this.selectProgramDropDown.click();
      await this.page.waitForTimeout(3000);
      for (let i = 0; i < await this.selectProgramDropDownList.count(); i++) {
        const option = this.selectProgramDropDownList.nth(i);
        const optionText = await option.textContent();
        if (optionText.trim() === 'LVN') {    
          await option.click();
          break;
        }
      }

      //await this.backgroundCheckBox.check();
      await this.drugTestCheckBox.check();
      //await this.ImmunizationCheckBox.check();
      await this.startApplicationButton.click();
      await this.page.waitForTimeout(3000);
      console.log('Add school details attempt complete');
    } catch (error) {
      console.error('Adding school details failed:', error);
      throw error;
    }
  }

}

module.exports = { LoginPage };