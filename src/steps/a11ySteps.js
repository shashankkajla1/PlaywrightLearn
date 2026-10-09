const { Given, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

Given('I open the homepage for accessibility testing', async function () {
  await this.page.goto('https://www.saucedemo.com/');
});

Then('the page should have no critical accessibility violations', async function () {
  const axeBuilder = new AxeBuilder({ page: this.page });
  const results = await axeBuilder.analyze();
  expect(results.violations.length).toBe(0);
});
