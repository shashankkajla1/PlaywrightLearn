const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

const { readJson } = require('../utils/jsonReader');
const valueParser = require('../utils/valueParser');
const env = require('../config/env');
const testData = require('../../data/testData.json');
const HomePage = require('../pages/homePage');

/**
 * @typedef {Object} PlaywrightWorld
 * @property {import('@playwright/test').Page} page
 */

const locatorData = {
  login: readJson('locators/login.json'),
  home: readJson('locators/home.json'),
};

When(
  /^[Tt]he "([^"]*)" is logged in with valid credentials$/,
  async function (user) {
    if (!user || String(!user).includes(testData.data.standard_user)) {
      throw new Error(`Invalid user, ${user}`);
    }

    await this.page.goto(env.baseUrl);
    await this.page.locator(locatorData.login.username).fill(user);
    await this.page.locator(locatorData.login.password).fill('secret_sauce');
    await this.page.locator(locatorData.login.loginButton).click();
    await expect(this.page).toHaveTitle(testData.data.title)
  }
);

When(/^[T[t]he product "([^"]*)" is added to cart$/, async function (product) {
  const productValue = valueParser.parse(product, this.memory, testData);
  console.log(`Resolved product: ${productValue}`);
  const homePage = new HomePage(this.page);
  const flagCheck = await homePage.addProductToCart(productValue)
  expect(flagCheck).toBeTruthy
  await homePage.click_checkoutBtn();
})
