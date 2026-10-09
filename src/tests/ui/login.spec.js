const { test, expect } = require('../fixtures');
const { readJson } = require('../../utils/jsonReader');

const locators = {
  login: readJson('locators/login.json'),
  home: readJson('locators/home.json'),
};

test.describe('SauceDemo login tests', () => {
  test('valid login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator(locators.login.username).fill('standard_user');
    await page.locator(locators.login.password).fill('secret_sauce');
    await page.locator(locators.login.loginButton).click();

    await expect(page.locator(locators.home.inventoryList)).toBeVisible();
  });

  test('invalid login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator(locators.login.username).fill('locked_out_user');
    await page.locator(locators.login.password).fill('wrong_password');
    await page.locator(locators.login.loginButton).click();

    await expect(page.locator(locators.login.errorMessage)).toBeVisible();
  });
});
