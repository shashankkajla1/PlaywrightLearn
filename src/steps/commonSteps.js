const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { readJson } = require('../utils/jsonReader');
const valueParser = require('../utils/valueParser');

const locatorData = {
  login: readJson('locators/login.json'),
  home: readJson('locators/home.json'),
  dashboard: readJson('locators/dashboard.json'),
};

Given('I open the login page', async function () {
  await this.page.goto('https://www.saucedemo.com/');
});

When('I enter username {string}', async function (username) {
  await this.page.locator(locatorData.login.username).fill(username);
});

When('I enter password {string}', async function (password) {
  await this.page.locator(locatorData.login.password).fill(password);
});

When('I store {string} as {string}', async function (value, key) {
  this.memory.set(key, value);
});

When('I store {string} as feature memory {string}', async function (value, key) {
  this.memory.featureSet(key, value);
});

Then('the stored value {string} should equal {string}', async function (actual, expected) {
  expect(this.memory.resolve(actual)).toBe(this.memory.resolve(expected));
});

Then('memory key {string} should not exist', async function (key) {
  expect(this.memory.has(key)).toBe(false);
});

When('I parse value {string}', async function (value) {
  this.parsedValue = valueParser.parse(value, this.memory);
});

Then('the parsed value should equal {string}', async function (expected) {
  expect(this.parsedValue).toBe(expected);
});

Then('parsing value {string} should fail for missing key {string}', async function (value, key) {
  expect(() => valueParser.parse(value, this.memory)).toThrow(`No value stored for memory key "${key}"`);
});

When('I click login', async function () {
  await this.page.locator(locatorData.login.loginButton).click();
});

Then('I should see the inventory page', async function () {
  await expect(this.page.locator(locatorData.home.inventoryList)).toBeVisible();
});

Then('I should see login error', async function () {
  await expect(this.page.locator(locatorData.login.errorMessage)).toBeVisible();
});
