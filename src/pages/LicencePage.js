const playwright = require("playwright");
class LicencePage {
  constructor(page) {
    this.page = page;
    this.AddNewLicensefield = page.locator('//button[contains(text(),"Add New License")]');
    this.LC_LicenceTypeDrpDwn = page.locator('//span[@aria-owns="LicenseType_listbox"]//span[@aria-label="select"]');
    this.LC_LicenceTypeDrpDwnList = page.locator('//ul[@id="LicenseType_listbox"]//li');
    this.LC_LicenceNumber = page.locator('input[id="LicenseNumber"]');
    this.LC_IssueMonthDrpDwn = page.locator('//label[text()="Issue Date"]//parent::div//span[contains(@aria-owns,"SelectedMonth_listbox")]//span[@aria-label="select"]');
    this.LC_IssueMonthDrpDwnList = page.locator('ul[id*="SelectedMonth_listbox"]').nth(0).locator('li');
    this.LC_IssueDayDrpDwn = page.locator('//label[text()="Issue Date"]//parent::div//span[contains(@aria-owns,"SelectedDay_listbox")]//span[@aria-label="select"]');
    this.LC_IssueDayDrpDwnList = page.locator('ul[id*="SelectedDay_listbox"]').nth(0).locator('li');
    this.LC_IssueYearDrpDwn = page.locator('//label[text()="Issue Date"]//parent::div//span[contains(@class,"Yeardrdown")]//span[@aria-label="select"]');
    this.LC_IssueYearDrpDwnList = page.locator('ul[id*="SelectedYear_listbox"]').nth(0).locator('li');
    this.LC_ExpiryMonthDrpDwn = page.locator('//label[text()="Expiration Date"]//parent::div//span[contains(@aria-owns,"SelectedMonth_listbox")]//span[@aria-label="select"]');
    this.LC_ExpiryMonthDrpDwnList = page.locator('ul[id*="SelectedMonth_listbox"]').nth(1).locator('li');
    this.LC_ExpiryDayDrpDwn = page.locator('//label[text()="Expiration Date"]//parent::div//span[contains(@aria-owns,"SelectedDay_listbox")]//span[@aria-label="select"]');
    this.LC_ExpiryDayDrpDwnList = page.locator('ul[id*="SelectedDay_listbox"]').nth(1).locator('li');
    this.LC_ExpiryYearDrpDwn = page.locator('//label[text()="Expiration Date"]//parent::div//span[contains(@class,"Yeardrdown")]//span[@aria-label="select"]');
    this.LC_ExpiryYearDrpDwnList = page.locator('ul[id*="SelectedYear_listbox"]').nth(1).locator('li');
    this.LC_NotExpiredCB = page.locator('//label[@for="IsLifetimeExpiration" and contains(@class,"checkbox")]');
    this.LC_stateDrpDwn = page.locator('//span[@aria-controls="State_listbox"]//span');
    this.LC_stateDrpDwnList = page.locator('//ul[@id="State_listbox"]//li');
    this.LC_NameonLicense = page.locator('input[id="NameOnLicense"]');
    this.LC_SaveBtn = page.locator('//a[normalize-space()="Save"]');
    this.LC_NextBtn = page.locator('input[id="navNextBtn"]');
  }
    
    async addNewLicense() {
        console.log("Attempting to add new license");
        try {
            await this.AddNewLicensefield.waitFor({ state: "visible", timeout: 10000 });            
            await this.AddNewLicensefield.click();
             await this.page.waitForTimeout(2000);
            // Select License Type
            await this.LC_LicenceTypeDrpDwn.click();
            await this.page.waitForTimeout(2000);
            for (let i = 0; i < (await this.LC_LicenceTypeDrpDwnList.count()); i++) {
                const option = this.LC_LicenceTypeDrpDwnList.nth(i);
                const optionText = await option.textContent();
                if (optionText.trim() === "12345 - QA  testing") {
                    await option.click();
                    break;
                }
            }
            await this.LC_LicenceNumber.fill("D1234567");
            // Select Issue Date Month
            await this.page.waitForTimeout(2000);
            await this.LC_IssueMonthDrpDwn.click();
            await this.page.waitForTimeout(2000);
            for (let i = 0; i < (await this.LC_IssueMonthDrpDwnList.count()); i++) {
                const option = this.LC_IssueMonthDrpDwnList.nth(i);
                const optionText = await option.textContent();  
                if (optionText.trim() === "Jan") {
                    await option.click();
                    break;
                }
            }
            // Select Issue Date Day
            await this.page.waitForTimeout(2000);
            await this.LC_IssueDayDrpDwn.click();
            await this.page.waitForTimeout(2000);
            for (let i = 0; i < (await this.LC_IssueDayDrpDwnList.count()); i++) {
                const option = this.LC_IssueDayDrpDwnList.nth(i);
                const optionText = await option.textContent();
                if (optionText.trim() == 15) {
                    await option.click();
                    break;
                }
            }
            // Select Issue Date Year
            await this.page.waitForTimeout(2000);
            await this.LC_IssueYearDrpDwn.click();
            await this.page.waitForTimeout(2000);
            for (let i = 0; i < (await this.LC_IssueYearDrpDwnList.count()); i++) {
                const option = this.LC_IssueYearDrpDwnList.nth(i);
                const optionText = await option.textContent();
                if (optionText.trim() == 2018) {
                    await option.click();
                    break;
                }
            }
            // Select Expiry Date Month
            await this.page.waitForTimeout(2000);
            await this.LC_ExpiryMonthDrpDwn.click();
            await this.page.waitForTimeout(2000);
            for (let i = 0; i < (await this.LC_ExpiryMonthDrpDwnList.count()); i++) {
                const option = this.LC_ExpiryMonthDrpDwnList.nth(i);
                const optionText = await option.textContent();
                if (optionText.trim() === "Jan") {
                    await option.click();
                    break;
                }   
            }
            // Select Expiry Date Day
            await this.page.waitForTimeout(2000);
            await this.LC_ExpiryDayDrpDwn.click();
            await this.page.waitForTimeout(2000);
            for (let i = 0; i < (await this.LC_ExpiryDayDrpDwnList.count()); i++) {
                const option = this.LC_ExpiryDayDrpDwnList.nth(i);
                const optionText = await option.textContent();
                if (optionText.trim() == 15) {
                    await option.click();
                    break;
                }
            }
            // Select Expiry Date Year
            await this.page.waitForTimeout(2000);
            await this.LC_ExpiryYearDrpDwn.click();
            await this.page.waitForTimeout(2000);
            for (let i = 0; i < (await this.LC_ExpiryYearDrpDwnList.count()); i++) {
                const option = this.LC_ExpiryYearDrpDwnList.nth(i);
                const optionText = await option.textContent();
                if (optionText.trim() == 2024) {
                    await option.click();
                    break;
                }
            }
            // Select State
            await this.page.waitForTimeout(2000);
            await this.LC_stateDrpDwn.click();
            await this.page.waitForTimeout(2000);
            for (let i = 0; i < (await this.LC_stateDrpDwnList.count()); i++) {
                const option = this.LC_stateDrpDwnList.nth(i);
                const optionText = await option.textContent();
                if (optionText.trim() === "NY") {
                    await option.click();
                    break;
                }
            }
            await this.page.waitForTimeout(1000);
            await this.LC_NameonLicense.fill("Test User");
            await this.LC_SaveBtn.click();
            await this.page.waitForTimeout(3000);
            await this.LC_NextBtn.click();
            await this.page.waitForTimeout(2000);
            console.log("New license added successfully");
        } catch (error) {
            console.error("Error while adding new license: ", error);
        }
    }
}


module.exports = { LicencePage };