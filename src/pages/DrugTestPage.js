const playwright = require("playwright");
const { takeScreenshot } = require('../utils/screenhotUtils');

class DrugTestPage {
   constructor(world) {
    this.world = world;          // keep the full world object
    this.page = world.page;      // extract page
    this.context = world.context; // extract context

    // Define locators as functions
    this.locators = (page) => ({
      DrugTestLink: page.locator('//a[normalize-space()="Please click here to schedule your Drug Test."]'),
      Drug_SSNInput: page.locator('input[type="password"]'),
      Drug_DOBInput: page.locator('input[type="text"]'),
      Drug_Submit: page.locator('input[value="Submit"]'),
      Drug_ScheduleTest: page.locator('//a[@class="action action-open" and contains(text(),"Schedule Drug Test")]'),
      Drug_locationBtn: page.locator('//button[contains(@id,"btnlocation")]'),
      Drug_ConfirmApptBtn: page.locator('//input[@id="confirmButton"]'),
      Drug_DownloadBtn: page.locator('//a[@id="download"]'),
      Drug_languagePopup: page.locator('//button[@id="GenericModalFooterClose"]'),
      NextButton : page.locator('input[id="navNextBtn"]')
    });
  }

  async scheduleDrugTest(ssn) {
    console.log("Attempting to schedule drug test");

    try {
      const loc = this.locators(this.page);
      //  const parentPage = this.page;
      await loc.DrugTestLink.waitFor({ state: "visible", timeout: 20000 });

      // Open the new page
      const [drugPage] = await Promise.all([
        this.context.waitForEvent("page"),
        loc.DrugTestLink.click()
      ]);

      await drugPage.waitForLoadState("domcontentloaded");
      const drug = this.locators(drugPage);

      // Interact on the new page
      await drug.Drug_SSNInput.waitFor({ state: "visible", timeout: 50000 });
      await drug.Drug_SSNInput.fill(ssn);
      await drug.Drug_DOBInput.fill("01/10/1993");
      await drug.Drug_Submit.waitFor({ state: "visible", timeout: 50000 });
      await drug.Drug_Submit.click();
        // Handle language selection popup if it appears
        try {
            await drug.Drug_languagePopup.waitFor({ state: "visible", timeout: 30000 });
            if (await drug.Drug_languagePopup.isVisible()) {
            await drug.Drug_languagePopup.click();
            //await drug.Drug_languagePopup.waitFor({ state: "hidden", timeout: 10000 });
            }
        } 
        catch (e) {
            // Popup did not appear, continue
            console.log("Language selection popup did not appear, continuing...",e);
        }   
      await drug.Drug_ScheduleTest.waitFor({ state: "visible", timeout: 120000 });
      await drug.Drug_ScheduleTest.click();
      await drug.Drug_locationBtn.nth(0).waitFor({ state: "visible", timeout: 30000 });
      await drug.Drug_locationBtn.nth(0).click();
      await drug.Drug_ConfirmApptBtn.waitFor({ state: "visible", timeout: 240000 });
      await drug.Drug_ConfirmApptBtn.click();
      await this.page.waitForTimeout(5000);
      await drug.Drug_DownloadBtn.waitFor({ state: "visible", timeout: 240000 });
      console.log("Download Button is visible now");
      // Take Screenshot
      await drugPage.screenshot({ path: "drugTestConfirmation.png", fullPage: true });
      //await takeScreenshot(this.world, 'drugTestConfirmation', drugPage);
      console.log("Screenshot for drug test confirmation taken");
      await drug.Drug_DownloadBtn.click();
      console.log("Drug test scheduled successfully and downloaded.");
      // --- CLOSE THE DRUG TEST TAB ---
      console.log("Closing Drugpage");
      await drugPage.close();
       console.log("DrugPage closed");
       await this.page.bringToFront();
       console.log("Attempting to click Next button on parent page");
       await this.page.locator('input[id="navNextBtn"]').waitFor({ state: 'visible', timeout: 20000 });
      await this.page.locator('input[id="navNextBtn"]').click();   
      console.log("Next Button clicked on parent page");

    } catch (error) {
      console.error("Scheduling drug test failed:", error);
      throw error;
    }
  }
}

module.exports = { DrugTestPage };
