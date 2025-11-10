const playwright = require("playwright");

class DrugTestPage {
  constructor(page, context) {
    this.page = page;
    this.context = context;

    // Define locators as functions
    this.locators = (page) => ({
      DrugTestLink: page.locator('//a[normalize-space()="Please click here to schedule your Drug Test."]'),
      Drug_SSNInput: page.locator('input[type="password"]'),
      Drug_DOBInput: page.locator('input[type="text"]'),
      Drug_Submit: page.locator('input[value="Submit"]'),
      Drug_ScheduleTest: page.locator('//a[@class="action action-open" and contains(text(),"Schedule Drug Test")]'),
      Drug_locationBtn: page.locator('//button[contains(@id,"btnlocation")]'),
      Drug_ConfirmApptBtn: page.locator('//input[@value="Confirm"]'),
      Drug_DownloadBtn: page.locator('//a[@id="download"]')
    });
  }

  async scheduleDrugTest(ssn) {
    console.log("Attempting to schedule drug test");

    try {
      const loc = this.locators(this.page);
      await loc.DrugTestLink.waitFor({ state: "visible", timeout: 10000 });

      // Open the new page
      const [drugPage] = await Promise.all([
        this.context.waitForEvent("page"),
        loc.DrugTestLink.click()
      ]);

      await drugPage.waitForLoadState("domcontentloaded");
      const drug = this.locators(drugPage);

      // Interact on the new page
      await drug.Drug_SSNInput.fill(ssn);
      await drug.Drug_DOBInput.fill("01/10/1993");
      await drug.Drug_Submit.click();

      await drug.Drug_ScheduleTest.waitFor({ state: "visible", timeout: 10000 });
      await drug.Drug_ScheduleTest.click();
      await drug.Drug_locationBtn.click();

      await drug.Drug_ConfirmApptBtn.waitFor({ state: "visible", timeout: 10000 });

      const [confirmpopup] = await Promise.all([
        this.context.waitForEvent("page"),
        drug.Drug_ConfirmApptBtn.click()
      ]);

      await confirmpopup.waitForLoadState("domcontentloaded");

      // Take Screenshot
      await drugPage.screenshot({ path: "drugTestConfirmation.png", fullPage: true });
      await drug.Drug_DownloadBtn.click();

      await drugPage.close();

    } catch (error) {
      console.error("Scheduling drug test failed:", error);
      throw error;
    }
  }
}

module.exports = { DrugTestPage };
