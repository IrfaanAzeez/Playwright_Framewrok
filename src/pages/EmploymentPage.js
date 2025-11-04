const playwright = require("playwright");
class EmploymentPage {
  constructor(page) {
    this.page = page;
    this.AddNewEmplymntfield = page.locator('//button[contains(text(),"Add New Employment")]');
    this.Emp_EmployerName = page.locator('input[id="EmployerName"]');
    this.Emp_JobTitle = page.locator('input[id="StartDesignation"]');
    this.Emp_Address = page.locator('input[id="Address"]');
    this.Emp_City = page.locator('input[id="City"]');
    this.Emp_Zip = page.locator('input[id="Zip"]');
    this.Emp_SupervisorName = page.locator('input[id="SupervisorName"]');
    this.Emp_SupervisorPhone = page.locator('input[id="SupervisorPhone"]');
    this.Emp_SupervisorMail = page.locator('input[id="SupervisorEmail"]');
    this.Emp_ReasonforLeaving = page.locator('input[id="ReasonForLeaving"]');
    //Employement From Date Dropdowns
    this.Emp_MonthFromDrpDwn = page.locator('//label[text()="Employment From"]//parent::div//span[contains(@aria-owns,"SelectedMonth_listbox")]//span[@aria-label="select"]');
    this.Emp_MonthFromDrpDwnList = page.locator('ul[id*="SelectedMonth_listbox"]').nth(0).locator('li');
    this.Emp_YearFromDrpDwn = page.locator('//label[text()="Employment From"]//parent::div//span[contains(@class,"Yeardrdown")]//span[@aria-label="select"]');
    this.Emp_YearFromDrpDwnList = page.locator('ul[id*="SelectedYear_listbox"]').nth(0).locator('li');
    //Employement To Date Dropdowns
    this.Emp_MonthToDrpDwn = page.locator('//label[text()="Employment To"]//parent::div//span[contains(@aria-owns,"SelectedMonth_listbox")]//span[@aria-label="select"]');
    this.Emp_MonthToDrpDwnList = page.locator('ul[id*="SelectedMonth_listbox"]').nth(1).locator('li');
    this.Emp_YearToDrpDwn = page.locator('//label[text()="Employment To"]//parent::div//span[contains(@class,"Yeardrdown")]//span[@aria-label="select"]');
    this.Emp_YearToDrpDwnList = page.locator('ul[id*="SelectedYear_listbox"]').nth(1).locator('li');
    this.Emp_SaveBtn = page.locator('//a[normalize-space()="Save"]');
    this.Emp_NextBtn = page.locator('input[id="navNextBtn"]');
    // State Dropdown
    this.Emp_StateDrpDwn = page.locator('//span[@aria-controls="State_listbox"]//span');
    this.Emp_StateDrpDwnList = page.locator('//ul[@id="State_listbox"]//li');
    this.Emp_PresentEmplyr_CB = page.locator('//label[@for="IsPresentEmployer" and contains(@class,"checkbox")]');
  }

  async addNewEmployment() {
    console.log("Attempting to add new employment"); 
    try {
      await this.AddNewEmplymntfield.waitFor({ state: "visible", timeout: 10000 });
      await this.AddNewEmplymntfield.click();
      await this.Emp_EmployerName.fill("ABC Corp");
      await this.Emp_JobTitle.fill("Software Engineer");
      await this.Emp_Address.fill("456 Corporate Blvd");
      await this.Emp_City.fill("Metropolis");
      // Select Date From Month
      await this.page.waitForTimeout(2000);
      await this.Emp_MonthFromDrpDwn.click();
      await this.page.waitForTimeout(2000); 
      for (let i = 0; i < (await this.Emp_MonthFromDrpDwnList.count()); i++) {
        const option = this.Emp_MonthFromDrpDwnList.nth(i);
        const optionText = await option.textContent(); 
        if (optionText.trim() === "Feb") {
          await option.click();
          break;
        }
      }
      // Select Date From Year
      await this.page.waitForTimeout(2000);
      await this.Emp_YearFromDrpDwn.click();
      await this.page.waitForTimeout(2000);
      for (let i = 0; i < (await this.Emp_YearFromDrpDwnList.count()); i++) {
        const option = this.Emp_YearFromDrpDwnList.nth(i);
        const optionText = await option.textContent();
        if (optionText.trim() == 2020) {
          await option.click();
          break;
        }
      }
      // Select Date To Month
      await this.page.waitForTimeout(2000);
      await this.Emp_MonthToDrpDwn.click();
      await this.page.waitForTimeout(2000);
      for (let i = 0; i < (await this.Emp_MonthToDrpDwnList.count()); i++) {
        const option = this.Emp_MonthToDrpDwnList.nth(i);
        const optionText = await option.textContent();
        if (optionText.trim() === "Dec") {
          await option.click();
          break;
        }
      }
      // Select Date To Year
      await this.page.waitForTimeout(2000);
      await this.Emp_YearToDrpDwn.click();
      await this.page.waitForTimeout(2000);
      for (let i = 0; i < (await this.Emp_YearToDrpDwnList.count()); i++) {
        const option = this.Emp_YearToDrpDwnList.nth(i);
        const optionText = await option.textContent();
        if (optionText.trim() == 2023) {
          await option.click();
          break;
        }
      }

      // Select State
      await this.page.waitForTimeout(2000);
      await this.Emp_StateDrpDwn.click();
      await this.page.waitForTimeout(2000);
      for (let i = 0; i < (await this.Emp_StateDrpDwnList.count()); i++) {
        const option = this.Emp_StateDrpDwnList.nth(i);
        const optionText = await option.textContent();
        if (optionText.trim() === "NY") {
          await option.click();
          break;
        }
      }
      await this.page.waitForTimeout(2000);
      await this.Emp_Zip.fill("10001");
      await this.Emp_SupervisorName.fill("John Doe");
      await this.Emp_SupervisorPhone.fill("555-123-4567");
      await this.Emp_SupervisorMail.fill("john@gmail.com");
      await this.Emp_ReasonforLeaving.fill("Career Advancement");
      await this.page.waitForTimeout(2000);
      await this.Emp_PresentEmplyr_CB.click();
      await this.page.waitForTimeout(2000);
      await this.Emp_SaveBtn.click();
      await this.page.waitForTimeout(5000);
      await this.Emp_NextBtn.click();
      await this.page.waitForTimeout(5000);
    } catch (error) {
      console.error("Adding new employment failed:", error);
      throw error;
    }
}
}

module.exports = { EmploymentPage };