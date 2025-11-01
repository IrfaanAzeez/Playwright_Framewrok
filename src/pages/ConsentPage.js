const playwright = require("playwright");
class ConsentPage {
  constructor(page) {
    this.page = page;
    this.consentCheckBox = page.locator('label[for="ConsentCheckbox"]');
    this.consentSignatureInput = page.locator(
      'input[id="DisclosureSignature"]'
    );
    this.consentAgreeButton = page.locator('input[value="I Agree"]');
    this.personalPhoneInput = page.locator('input[id="Phone"]');
    this.personalconfirmEmailInput = page.locator('input[id="ConfirmEmail"]');
    this.personalDOBMonthDropDown = page.locator(
      '//span[@aria-owns="Month_listbox"]//span[@aria-label="select"]'
    );
    this.personalConfirmDOBMonthDropDown = page.locator(
      '//span[@aria-owns="ConfirmMonth_listbox"]//span[@aria-label="select"]'
    );
    this.personalDOBDayDropDown = page.locator(
      '//span[@aria-owns="Day_listbox"]//span[@aria-label="select"]'
    );
    this.personalConfirmDOBDayDropDown = page.locator(
      '//span[@aria-owns="ConfirmDay_listbox"]//span[@aria-label="select"]'
    );
    this.personalDOBYearDropDown = page.locator(
      'span[aria-controls = "Year_listbox"]'
    );
    this.personalConfirmDOBYearDropDown = page.locator(
      'span[aria-controls = "ConfirmYear_listbox"]'
    );
    this.personalDOBMonthList = page.locator('//ul[@id="Month_listbox"]//li');
    this.personalConfirmDOBMonthList = page.locator(
      '//ul[@id="ConfirmMonth_listbox"]//li'
    );
    this.personalDOBDayList = page.locator('//ul[@id="Day_listbox"]//li');
    this.personalConfirmDOBDayList = page.locator(
      '//ul[@id="ConfirmDay_listbox"]//li'
    );
    this.personalDOBYearList = page.locator('//ul[@id="Year_listbox"]//li');
    this.personalConfirmDOBYearList = page.locator(
      '//ul[@id="ConfirmYear_listbox"]//li'
    );
    this.personalSSNInput = page.locator('input[id="SocialNumber"]');
    this.personalConfirmSSNInput = page.locator('input[id="ConfirmSSN"]');
    this.personalNoSSNCheckBox = page.locator(
      '//label[@for="HasSSN" and @class="k-checkbox-label"]'
    );
    this.personalImmStID = page.locator('input[id="StudentID"]');
    this.personalImmStartYearDprDwn = page.locator(
      '//span[@title="Start Year"]//span[@aria-label="select"]'
    );
    this.personalImmStartYearList = page.locator(
      '//ul[@id="StartYear_listbox"]//li'
    );
    this.personalImmGradYearDprDwn = page.locator(
      '//span[@title="Graduation Year"]//span[@aria-label="select"]'
    );
    this.personalImmGradYearList = page.locator(
      '//ul[@id="GraduationYear_listbox"]//li'
    );
    this.personalNextBtn = page.locator('input[id="navNextBtn"]');
    this.personalPrevBtn = page.locator('a[id="navPrevBtn"]');
    this.nameAddNewNamefield = page.locator('//button[contains(text(),"Add Other Name Used")]');
    this.nameFirstName = page.locator('//input[@id="FirstName"]');
    this.nameLastName = page.locator('//input[@id="LastName"]');
    this.nameSaveBtn = page.locator('//a[normalize-space()="Save"]');
    this.AddNewResidencefield = page.locator('//button[contains(text(),"Add New Residence")]');
    this.ResidenceAddressInput = page.locator('//textarea[@id="Address"]');
    this.ResidenceCityInput = page.locator('//input[@id="City"]');
    this.ResidenceZipInput = page.locator('//input[@id="Zip"]');
    this.ResidenceStateDropDown = page.locator('//span[@aria-controls="State_listbox"]');
    this.ResidenceStateList = page.locator('//ul[@id="State_listbox"]//li');
    this.ResidenceCntryDrpDwn = page.locator('//span[@aria-controls="Country_listbox"]');
    this.ResidenceCntryList = page.locator('//ul[@id="Country_listbox"]//li');
    
    this.ResidenceDFMnthDrpDwn = page.locator('//label[text()="Date From"]//parent::div//span[contains(@aria-owns,"SelectedMonth_listbox")]//span[@aria-label="select"]');
    this.ResidenceDFMnthList = page.locator('//ul[contains(@id,"bcbadbca_SelectedMonth_listbox")]//li');
    this.ResidenceDFYearDrpSwn = page.locator('//label[text()="Date From"]//parent::div//span[contains(@class,"Yeardrdown")]//span[@aria-label="select"]');
    this.ResidenceDFYearList = page.locator('//ul[contains(@id,"bcbadbca_SelectedYear_listbox")]//li');

    this.ResidenceDTMnthDrpDwn = page.locator('//label[text()="Date To"]//parent::div//span[contains(@aria-owns,"SelectedMonth_listbox")]//span[@aria-label="select"]');
    this.ResidenceDTMnthList = page.locator('//ul[contains(@id,"ceedbbbc_SelectedMonth_listbox")]//li');
    this.ResidenceDTYearDrpDwn = page.locator('//label[text()="Date To"]//parent::div//span[contains(@class,"Yeardrdown")]//span[@aria-label="select"]');
    this.ResidenceDTYearList = page.locator('//ul[contains(@id,"ceedbbbc_SelectedYear_listbox")]//li');
    this.ResidenceMailAdrsCB = page.locator('//div[@id="IsMailingAddressDiv"]//label[contains(@class,"checkbox")]');
    this.ResidenceCrntAdrsCB = page.locator('//div[@id="IsCurrentDiv"]//label[contains(@class,"checkbox")]');
    this.ResidenceSaveBtn = page.locator('//a[normalize-space()="Save"]');
  }

  async submitConsent(fname) {
    console.log("Attempting to give consent on esign");
    try {
      await this.consentCheckBox.waitFor({ state: "visible", timeout: 10000 });
      await this.consentCheckBox.check();
      await this.consentSignatureInput.fill(fname);
      await this.consentAgreeButton.click();
      await this.page.waitForTimeout(3000);
    } catch (error) {
      console.error("Give consent on esign:", error);
      throw error;
    }
  }

  async fillPersonalDetails(phone, email, ssn) {
    console.log("Attempting to fill personal details");

    try {
      await this.personalPhoneInput.waitFor({
        state: "visible",
        timeout: 10000,
      });
      await this.personalPhoneInput.fill(phone);
      // Select DOB Month
      await this.personalDOBMonthDropDown.click();
      for (let i = 0; i < (await this.personalDOBMonthList.count()); i++) {
        const option = this.personalDOBMonthList.nth(i);
        const optionText = await option.textContent();
        if (optionText.trim() === "Jan") {
          await option.click();
          break;
        }
      }
      console.log("DOB Month selected");
      // Select DOB Day
      await this.page.waitForTimeout(2000);
      await this.personalDOBDayDropDown.click();
      for (let i = 0; i < (await this.personalDOBDayList.count()); i++) {
        const option = this.personalDOBDayList.nth(i);
        const optionText = await option.textContent();
        if (optionText.trim() == 5) {
          await option.click();
          break;
        }
      }
      console.log("DOB Day selected");
      // Select DOB Year
      await this.personalDOBYearDropDown.click();
      for (let i = 0; i < (await this.personalDOBYearList.count()); i++) {
        const option = this.personalDOBYearList.nth(i);
        const optionText = await option.textContent();
        if (optionText.trim() == "2000") {
          await option.click();
          break;
        }
      }
      console.log("DOB Year selected");

      // Select Confirm DOB Month
      await this.personalConfirmDOBMonthDropDown.click();
      for (
        let i = 0;
        i < (await this.personalConfirmDOBMonthList.count());
        i++
      ) {
        const option = this.personalConfirmDOBMonthList.nth(i);
        const optionText = await option.textContent();
        if (optionText.trim() === "Jan") {
          await option.click();
          break;
        }
      }
      console.log("Confirm DOB Month selected");
      // Select Confirm DOB Day
      await this.page.waitForTimeout(2000);
      await this.personalConfirmDOBDayDropDown.click();
      for (let i = 0; i < (await this.personalConfirmDOBDayList.count()); i++) {
        const option = this.personalConfirmDOBDayList.nth(i);
        const optionText = await option.textContent();
        if (optionText.trim() == 5) {
          await option.click();
          break;
        }
      }
      console.log("Confirm DOB Day selected");
      // Select Confirm DOB Year
      await this.personalConfirmDOBYearDropDown.click();
      for (
        let i = 0;
        i < (await this.personalConfirmDOBYearList.count());
        i++
      ) {
        const option = this.personalConfirmDOBYearList.nth(i);
        const optionText = await option.textContent();
        if (optionText.trim() == "2000") {
          await option.click();
          break;
        }
      }
      console.log("Confirm DOB Year selected");
      await this.personalconfirmEmailInput.fill(email);
      await this.personalSSNInput.fill(ssn);
      await this.personalConfirmSSNInput.fill(ssn);
      console.log("email, ssn filled");
      try {
        //if (this.personalImmStID.isVisible() === true) {
          await this.personalImmStID.waitFor({state: "visible", timeout: 10000,});
          //await this.page.waitForTimeout(2000);
          await this.personalImmStID.fill("123456");
          // Select Imm Start Year
          await this.personalImmStartYearDprDwn.click();
          for (
            let i = 0;
            i < (await this.personalImmStartYearList.count());
            i++
          ) {
            const option = this.personalImmStartYearList.nth(i);
            const optionText = await option.textContent();
            if (optionText.trim() == "2020") {
              await option.click();
              break;
            }
          }
          // Select Imm Grad Year
          await this.personalImmGradYearDprDwn.click();
          for (
            let i = 0;
            i < (await this.personalImmGradYearList.count());
            i++
          ) {
            const option = this.personalImmGradYearList.nth(i);
            const optionText = await option.textContent();
            if (optionText.trim() == "2024") {
              await option.click();
              break;
            }
          }
        //}
      } catch (e) {
        console.log("Student ID section not visible, skipping...", e);
      }
      await this.personalNextBtn.click();
      console.log("Fill personal details attempt complete");
    } catch (error) {
      console.error("Filling personal details failed:", error);
      throw error;
    }
    await this.page.waitForTimeout(10000);
  }

  async addNewName(fname, lname) {
    console.log("Attempting to add new name");
    try {
      await this.nameAddNewNamefield.waitFor({ state: "visible", timeout: 10000 });
      await this.nameAddNewNamefield.click();
      await this.nameFirstName.fill(fname);
      await this.nameLastName.fill(lname);
      await this.nameSaveBtn.click();
      await this.personalNextBtn.click();
      await this.page.waitForTimeout(3000);
    } catch (error) {
      console.error("Adding new name failed:", error);
      throw error;
    }
  } 

  async addNewResidence(address, city, state, zip, country) {  //"123 Main St Apt 4B","New York","NY","10001","USA"
    console.log("Attempting to add new residence");
    try {
      await this.AddNewResidencefield.waitFor({ state: "visible", timeout: 10000 });
      await this.AddNewResidencefield.click();
      await this.ResidenceAddressInput.fill(address);
      await this.ResidenceCityInput.fill(city);
      // Select State
      await this.ResidenceStateDropDown.click();
      for (let i = 0; i < (await this.ResidenceStateList.count()); i++) {
        const option = this.ResidenceStateList.nth(i);
        const optionText = await option.textContent();
        if (optionText.trim() === state) {
          await option.click();
          break;
        }
      }
      await this.ResidenceZipInput.fill(zip);
      // Select Country as USA
      await this.ResidenceCntryDrpDwn.click();
      for (let i = 0; i < (await this.ResidenceCntryList.count()); i++) {
        const option = this.ResidenceCntryList.nth(i);
        const optionText = await option.textContent();
        if (optionText.trim() === country) {
          await option.click();
          break;
        }
      }
      // Select Date From Month      
      await this.page.ResidenceDFMnthDrpDwn.click();
      for (let i = 0; i < (await this.ResidenceDFMnthList.count()); i++) {
        const option = this.ResidenceDFMnthList.nth(i);
        const optionText = await option.textContent();
        if (optionText.trim() === "Mar") {
          await option.click();
          break;
        }
      }
      await this.ResidenceDFYearDrpSwn.click();
      for (let i = 0; i < (await this.ResidenceDFYearList.count()); i++) {
        const option = this.ResidenceDFYearList.nth(i);
        const optionText = await option.textContent();
        if (optionText.trim() == 2020) {
          await option.click();
          break;
        }
      }
      await this.ResidenceDTMnthDrpDwn.click();
      for (let i = 0; i < (await this.ResidenceDTMnthList.count()); i++) {
        const option = this.ResidenceDTMnthList.nth(i);
        const optionText = await option.textContent();
        if (optionText.trim() === "Jun") {
          await option.click();
          break;
        }
      }
      await this.ResidenceDTYearDrpDwn.click();
      for (let i = 0; i < (await this.ResidenceDTYearList.count()); i++) {
        const option = this.ResidenceDTYearList.nth(i);
        const optionText = await option.textContent();
        if (optionText.trim() == 2023) {
          await option.click();
          break;
        }
      }
      await this.ResidenceMailAdrsCB.click();
      await this.ResidenceCrntAdrsCB.click(); 
      await this.ResidenceSaveBtn.click();
      await this.page.waitForTimeout(3000);
    } catch (error) {
      console.error("Adding new residence failed:", error);
      throw error;
    }
  }
}

module.exports = { ConsentPage };
