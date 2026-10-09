const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('I have a valid api endpoint {string}', function (endpoint) {
  this.endpoint = endpoint;
});

When('I send a GET request to the endpoint', async function () {
  const response = await this.request.get(this.endpoint);
  this.response = response;
});

Then('the response status should be {int}', async function (statusCode) {
  expect(this.response.status()).toBe(statusCode);
});

Then('the response should contain a valid body', async function () {
  const body = await this.response.json();
  expect(body).toBeTruthy();
});
