const playwright = require("playwright");
class ResidencePage {
  constructor(page) {
    this.page = page;
    this.AddNewResidencefield = page.locator('//button[contains(text(),"Add New Residence")]');
    this.ResidenceAddressInput = page.locator('//textarea[@id="Address"]');
    this.ResidenceCityInput = page.locator('//input[@id="City"]');
    this.ResidenceZipInput = page.locator('//input[@id="Zip"]');

    this.ResidenceStateDropDown = page.locator('//span[@aria-controls="State_listbox"]//span');
    this.ResidenceStateList = page.locator('//ul[@id="State_listbox"]//li');
    
    this.ResidenceCntryDrpDwn = page.locator('//span[@aria-controls="Country_listbox"]');
    this.ResidenceCntryList = page.locator('//ul[@id="Country_listbox"]//li');
    
    this.ResidenceDFMnthDrpDwn = page.locator('//label[text()="Date From"]//parent::div//span[contains(@aria-owns,"SelectedMonth_listbox")]//span[@aria-label="select"]');
    this.ResidenceDFMnthList = page.locator('//ul[contains(@id,"SelectedMonth_listbox")][1]//li');
    this.ResidenceDFYearDrpSwn = page.locator('//label[text()="Date From"]//parent::div//span[contains(@class,"Yeardrdown")]//span[@aria-label="select"]');
    this.ResidenceDFYearList = page.locator('//ul[contains(@id,"SelectedYear_listbox")][1]//li');

    // this.ResidenceDTMnthDrpDwn = page.locator('//label[text()="Date To"]//parent::div//span[contains(@aria-owns,"SelectedMonth_listbox")]//span[@aria-label="select"]//span');
    // this.ResidenceDTMnthList = page.locator('//ul[contains(@id,"ceedbbbc_SelectedMonth_listbox")]//li');
    // this.ResidenceDTYearDrpDwn = page.locator('//label[text()="Date To"]//parent::div//span[contains(@class,"Yeardrdown")]//span[@aria-label="select"]');
    // this.ResidenceDTYearList = page.locator('//ul[contains(@id,"ceedbbbc_SelectedYear_listbox")]//li');
    this.ResidenceMailAdrsCB = page.locator('//div[@id="IsMailingAddressDiv"]//label[contains(@class,"checkbox")]');
    this.ResidenceCrntAdrsCB = page.locator('//div[@id="IsCurrentDiv"]//label[contains(@class,"checkbox")]');
    this.ResidenceSaveBtn = page.locator('//a[normalize-space()="Save"]');
    this.ResidenceNextBtn = page.locator('input[id="navNextBtn"]');
    // Criminal Record Locators
    this.CriminalYesBTN = page.locator('input[value="Yes"]');
    this.CriminalNoBTN = page.locator('input[value="No"]');
    this.AddNewCrmRecordfield = page.locator('//button[contains(text(),"Add New Record")]');
    this.CrmRcrdOffenceDscrptn = page.locator('//input[@id="OffenseDescription"]');
    this.CrmRcrdOfncMonthDrpDwn = page.locator('//label[text()="Offense Date"]//parent::div//span[contains(@aria-owns,"SelectedMonth_listbox")]//span[@aria-label="select"]');
    this.CrmRcrdOfncMonthDrpDwnList = page.locator('//ul[contains(@id,"SelectedMonth_listbox")][1]//li');
    this.CrmRcrdOfncYearDrpDwn = page.locator('//label[text()="Offense Date"]//parent::div//span[contains(@class,"Yeardrdown")]//span[@aria-label="select"]');
    this.CrmRcrdOfncYearDrpDwnList = page.locator('//ul[contains(@id,"SelectedYear_listbox")][1]//li');
    this.CrmRcrdCountyInput = page.locator('//input[@id="County"]');
  }

  async addNewResidence(address, city, state, zip, country) {  //"123 Main St Apt 4B","New York","NY","10001","USA"
    console.log("Attempting to add new residence");
    try {
      await this.AddNewResidencefield.waitFor({ state: "visible", timeout: 10000 });
      await this.AddNewResidencefield.click();
      await this.page.waitForTimeout(2000);
      await this.ResidenceAddressInput.fill(address);
      await this.ResidenceCityInput.fill(city);
      // Select State
      await this.ResidenceStateDropDown.click();
      await this.page.waitForTimeout(2000);
      for (let i = 0; i < (await this.ResidenceStateList.count()); i++) {
        const option = this.ResidenceStateList.nth(i);
        const optionText = await option.textContent();
        if (optionText.trim() === state) {
          await option.click();
          break;
        }
      }
      await this.page.waitForTimeout(2000);
      await this.ResidenceZipInput.fill(zip);
      // Select Country as USA
      await this.ResidenceCntryDrpDwn.click();
      await this.page.waitForTimeout(2000);
      for (let i = 0; i < (await this.ResidenceCntryList.count()); i++) {
        const option = this.ResidenceCntryList.nth(i);
        const optionText = await option.textContent();
        if (optionText.trim() === country) {
          await option.click();
          break;
        }
      }
      await this.page.waitForTimeout(2000);
      // Select Date From Month      
      await this.ResidenceDFMnthDrpDwn.click();
      await this.page.waitForTimeout(2000);
      for (let i = 0; i < (await this.ResidenceDFMnthList.count()); i++) {
        const option = this.ResidenceDFMnthList.nth(i);
        const optionText = await option.textContent();
        if (optionText.trim() === "Mar") {
          await option.click();
          break;
        }
      }
      await this.page.waitForTimeout(2000);
      await this.ResidenceDFYearDrpSwn.click();
      await this.page.waitForTimeout(2000);
      for (let i = 0; i < (await this.ResidenceDFYearList.count()); i++) {
        const option = this.ResidenceDFYearList.nth(i);
        const optionText = await option.textContent();
        if (optionText.trim() == 2018) {
          await option.click();
          break;
        }
      }
      await this.page.waitForTimeout(5000);
    //   await this.ResidenceDTMnthDrpDwn.click();
    //   for (let i = 0; i < (await this.ResidenceDTMnthList.count()); i++) {
    //     const option = this.ResidenceDTMnthList.nth(i);
    //     const optionText = await option.textContent();
    //     if (optionText.trim() === "Jun") {
    //       await option.click();
    //       break;
    //     }
    //   }
    //   await this.ResidenceDTYearDrpDwn.click();
    //   for (let i = 0; i < (await this.ResidenceDTYearList.count()); i++) {
    //     const option = this.ResidenceDTYearList.nth(i);
    //     const optionText = await option.textContent();
    //     if (optionText.trim() == 2023) {
    //       await option.click();
    //       break;
    //     }
    //   }
      await this.ResidenceMailAdrsCB.click();
      await this.ResidenceCrntAdrsCB.click(); 
      await this.ResidenceSaveBtn.click();
      await this.page.waitForTimeout(2000);
      await this.ResidenceNextBtn.waitFor({ state: "visible", timeout: 10000 });
      await this.ResidenceNextBtn.click();

    } catch (error) {
      console.error("Adding new residence failed:", error);
      throw error;
    }
  }

  async addCriminalRecord(offenseDescription,city, state,county) { //"Theft","New York","NY","Bufor"
    console.log("Attempting to add criminal record");
    try {
      await this.CriminalYesBTN.waitFor({ state: "visible", timeout: 10000 }); 
        await this.CriminalYesBTN.click();
        await this.page.waitForTimeout(2000);
        await this.AddNewCrmRecordfield.waitFor({ state: "visible", timeout: 10000 });
        await this.AddNewCrmRecordfield.click();
         await this.CrmRcrdOffenceDscrptn.waitFor({ state: "visible", timeout: 10000 });
        await this.CrmRcrdOffenceDscrptn.fill(offenseDescription); 
        // Select Offense Month
        await this.CrmRcrdOfncMonthDrpDwn.click();
        await this.page.waitForTimeout(2000);   
        for (let i = 0; i < (await this.CrmRcrdOfncMonthDrpDwnList.count()); i++) {
          const option = this.CrmRcrdOfncMonthDrpDwnList.nth(i);
          const optionText = await option.textContent();
            if (optionText.trim() === "May") {
                await option.click();
                break;
            }
        }
        await this.page.waitForTimeout(2000);
        await this.CrmRcrdOfncYearDrpDwn.click();
        await this.page.waitForTimeout(2000);
        for (let i = 0; i < (await this.CrmRcrdOfncYearDrpDwnList.count()); i++) {
            const option = this.CrmRcrdOfncYearDrpDwnList.nth(i);
            const optionText = await option.textContent();
            if (optionText.trim() == 2020) {
                await option.click();
                break;
            }
        }
        await this.page.waitForTimeout(2000);
        await this.ResidenceCityInput.fill(city); 
        // Select State
        await this.ResidenceStateDropDown.click();
        await this.page.waitForTimeout(2000);
        for (let i = 0; i < (await this.ResidenceStateList.count()); i++) {
          const option = this.ResidenceStateList.nth(i);    
            const optionText = await option.textContent();
            if (optionText.trim() === state) {
                await option.click();
                break;
            }
        }
        await this.page.waitForTimeout(2000);
        // Select Country as USA
        // await this.ResidenceCntryDrpDwn.click();
        // await this.page.waitForTimeout(2000);
        // for (let i = 0; i < (await this.ResidenceCntryList.count()); i++) {
        //   const option = this.ResidenceCntryList.nth(i);
        //     const optionText = await option.textContent();
        //     if (optionText.trim() === country) {
        //         await option.click();
        //         break;
        //     }
        // }
        await this.CrmRcrdCountyInput.fill(county); 
        await this.page.waitForTimeout(2000);
        await this.ResidenceSaveBtn.click();
        await this.page.waitForTimeout(2000);
        await this.ResidenceNextBtn.waitFor({ state: "visible", timeout: 10000 });
        await this.ResidenceNextBtn.click();

    } catch (error) {
      console.error("Adding criminal record failed:", error);
      throw error;
    }   
}
}
module.exports = { ResidencePage };