const playwright = require("playwright");
class EducationPage {
  constructor(page) {
    this.page = page;
    this.AddNewEdufield = page.locator('//button[contains(text(),"Add New Education")]');
    this.Edu_EduLevelDrpDwn = page.locator('//div[@id="EducationLevelIdDivId"]//span[@aria-label="select"]');
    this.Edu_EduLevelDrpDwnList = page.locator('//ul[@id="EducationLevelId_listbox"]//li');
    this.Edu_SchlNameDrpDwn = page.locator('//div[@id="SchoolNameIdDivId"]//span[@aria-label="select"]');
    this.Edu_SchlNameDrpDwnList = page.locator('//ul[@id="SchoolNameId_listbox"]//li');
    this.Edu_MajorDrpDwn = page.locator('//div[@id="MajorIdDivId"]//span[@aria-label="select"]');
    this.Edu_MajorDrpDwnList = page.locator('//ul[@id="MajorId_listbox"]//li');
    this.Edu_DegreeName = page.locator('//input[@id="NameOnDegree"]');
    this.Edu_CampusName = page.locator('//input[@id="CampusName"]');
    this.Edu_CampusCity = page.locator('//input[@id="City"]');
    this.Edu_StateDrpDwn = page.locator('//span[@aria-owns="State_listbox"]//span[@aria-label="select"]');
    this.Edu_StateDrpDwnList = page.locator('//ul[@id="State_listbox"]//li');
    this.Edu_CountryDrpDwn = page.locator('//span[@aria-controls="Country_listbox"]//span');
    this.Edu_CountryDrpDwnList = page.locator('//ul[@id="Country_listbox"]//li');
    // Graduation Select
    this.Edu_graduationSelect = page.locator('select[id="IsGraduated"]');
    this.Edu_graduationMonthSelect = page.locator('select[id="GraduationMonth"]');
    this.Edu_graduationYear = page.locator('input[id="GraduationYear"]');
    // Save and Next Buttons
    this.Edu_SaveBtn = page.locator('//a[normalize-space()="Save"]');
    this.Edu_NextBtn = page.locator('input[id="navNextBtn"]');
  }

  async addNewEducation() {
    console.log("Attempting to add new education");
    try {
      await this.AddNewEdufield.waitFor({ state: "visible", timeout: 10000 });
      await this.AddNewEdufield.click();
        // Select Education Level
        await this.Edu_EduLevelDrpDwn.click();
        await this.page.waitForTimeout(2000);
        for (let i = 0; i < (await this.Edu_EduLevelDrpDwnList.count()); i++) {
          const option = this.Edu_EduLevelDrpDwnList.nth(i);
          const optionText = await option.textContent();
          if (optionText.trim() === "Bachelors Degree") {
            await option.click();
            break;
          }
        }
        // Select School Name
        await this.page.waitForTimeout(2000);
        await this.Edu_SchlNameDrpDwn.click();
        await this.page.waitForTimeout(2000);  
        for (let i = 0; i < (await this.Edu_SchlNameDrpDwnList.count()); i++) {
          const option = this.Edu_SchlNameDrpDwnList.nth(i);
          const optionText = await option.textContent();
            if (optionText.trim() === "Aaniiih Nakoda College") {
                await option.click();
                break;
            }
        }
        // Select Major
        await this.page.waitForTimeout(2000);
        await this.Edu_MajorDrpDwn.click();
        await this.page.waitForTimeout(2000); 
        for (let i = 0; i < (await this.Edu_MajorDrpDwnList.count()); i++) {
          const option = this.Edu_MajorDrpDwnList.nth(i);
          const optionText = await option.textContent();
            if (optionText.trim() === "Applied Science") {
                await option.click();
                break;
            }
        }
        await this.page.waitForTimeout(2000);
        await this.Edu_DegreeName.fill("Bachelor of Science in Applied Science");
        await this.Edu_CampusName.fill("ANC Main Campus");
        await this.Edu_CampusCity.fill("New York");
        // Select State
        await this.Edu_StateDrpDwn.click();
        await this.page.waitForTimeout(2000);
        for (let i = 0; i < (await this.Edu_StateDrpDwnList.count()); i++) {
          const option = this.Edu_StateDrpDwnList.nth(i);
          const optionText = await option.textContent();
            if (optionText.trim() === "NY") {
                await option.click();
                break;
            }
        }
        await this.page.waitForTimeout(2000);
        // Select Country as USA
        await this.Edu_CountryDrpDwn.click();
        await this.page.waitForTimeout(2000);
        for (let i = 0; i < (await this.Edu_CountryDrpDwnList.count()); i++) {
          const option = this.Edu_CountryDrpDwnList.nth(i);
            const optionText = await option.textContent(); 
            if (optionText.trim() === "USA") {
                await option.click();
                break;
            }      
        }
        await this.page.waitForTimeout(2000);
        // Select Graduated Yes/No
        await this.Edu_graduationSelect.selectOption("true");
        await this.page.waitForTimeout(2000);
        // Select Graduation Month
        await this.Edu_graduationMonthSelect.selectOption("5");
        await this.page.waitForTimeout(2000);
        await this.Edu_graduationYear.fill("2022");
        await this.page.waitForTimeout(2000);
        // Click Save Button
        await this.Edu_SaveBtn.click();
        await this.page.waitForTimeout(3000);
        // Click Next Button
        await this.Edu_NextBtn.click();
        await this.page.waitForTimeout(3000);
        console.log("New education added successfully");
    } catch (error) {
      console.error("Adding new education failed:", error);
      throw error;
    }   
}
}

module.exports = { EducationPage };