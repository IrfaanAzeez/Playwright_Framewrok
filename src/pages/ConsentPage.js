const playwright = require("playwright");
class ConsentPage {
  constructor(page,context) {
    this.page = page;
    this.context = context;
    this.consentCheckBox = page.locator('label[for="ConsentCheckbox"]');
    this.consentSignatureInput = page.locator('input[id="DisclosureSignature"]');
    this.consentAgreeButton = page.locator('input[value="I Agree"]');
    // Authurization locators
    this.AuthCB = page.locator('label[for="DisclosureReceipt"]');
    this.AuthSignature = page.locator('canvas[id="SignatureCanvas"]');
    //Review Submit locator
    this.ReviewSubmitBtn = page.locator('a[id="navBottomNextBtn"]');
    this.NextButton = page.locator('input[id="navNextBtn"]');
    
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

  async submitAuthorization() {
    console.log("Attempting to give authorization on esign");
    try {
      await this.AuthCB.waitFor({ state: "visible", timeout: 10000 });
      const [Authpage] = await Promise.all([
        this.context.waitForEvent('page'),
        this.AuthCB.click()
      ])
      await Authpage.waitForLoadState();
      await Authpage.close();
      await this.page.waitForTimeout(3000);
      await this.AuthSignature.waitFor({ state: "visible", timeout: 10000 });
      // Simulate drawing on the canvas for signature
      const box = await this.AuthSignature.boundingBox();
      if (box) {
        await this.page.mouse.move(box.x + 10, box.y + 10);
        await this.page.mouse.down();
        await this.page.mouse.move(box.x + 50, box.y + 50);
        await this.page.mouse.up();
      }
      await this.page.waitForTimeout(2000);
      await this.AuthSignature.click();
      await this.page.waitForTimeout(2000);
      await this.consentAgreeButton.click();
      await this.page.waitForTimeout(3000);
    } catch (error) {
      console.error("Give authorization on esign:", error);
      throw error;
    }
  }

  async submitReviewAndSubmit() {
    console.log("Attempting to submit review and submit");
    try {
      await this.ReviewSubmitBtn.waitFor({ state: "visible", timeout: 10000 });
      await this.ReviewSubmitBtn.click();
      await this.page.waitForTimeout(3000);
    } catch (error) {
      console.error("Submit review and submit failed:", error);
      throw error;
    }
  }

  async confirmOrder() {  
    console.log("Attempting to confirm order");
    try {
      // Assuming there's a confirmation button after review and submit
      await this.NextButton.waitFor({ state: "visible", timeout: 60000 });
      await NextButton.click();
      await this.page.screenshot({ path: "OrderConfirmation.png", fullPage: true });
      await this.page.waitForTimeout(5000);
      
    } catch (error) {
      console.error("Confirming order failed:", error);
      throw error;
    }
  }
  
}

module.exports = { ConsentPage };
