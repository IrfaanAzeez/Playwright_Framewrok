class DashboardPage {
  constructor(page) {
    this.page = page;
    this.header = page.locator('h1');
  }

  async getHeaderText() {
    return await this.header.textContent();
  }
}

module.exports = { DashboardPage };