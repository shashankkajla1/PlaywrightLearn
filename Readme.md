# Playwright BDD Framework

This project is a scalable Playwright automation framework built in JavaScript with the following capabilities:

- UI automation
- BDD / Gherkin style tests
- API testing
- Accessibility validation
- JSON-based locator storage
- Reusable utility modules

## Project Structure

```text
project-root/
  package.json
  .gitignore
  .env.example
  README.md
  playwright.config.js
  cucumber.js
  src/
    config/
      config.js
      env.js
    utils/
      browserManager.js
      apiUtils.js
      logger.js
      reportUtils.js
      dataUtils.js
      assertionUtils.js
      a11yUtils.js
      jsonReader.js
    pages/
      basePage.js
    locators/
      login.json
      home.json
      dashboard.json
    steps/
      commonSteps.js
      loginSteps.js
      apiSteps.js
      a11ySteps.js
    features/
      login.feature
      api.feature
      accessibility.feature
    tests/
      ui/
        login.spec.js
      api/
        userApi.spec.js
      accessibility/
        dashboard.a11y.spec.js
    hooks/
      hooks.js
  data/
    testData.json
    users.json
```

## Features

- Playwright JavaScript bindings
- Cucumber/Gherkin for BDD
- JSON-based selectors for maintainability
- API utilities with request handling
- axe-core accessibility assertions
- Clean modular utilities and config setup

## Installation

```bash
yarn install
npx playwright install --with-deps chromium
```

## Environment Setup

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

## Run Tests

### Run all tests

```bash
yarn test
```

### Run UI tests only

```bash
yarn test:ui
```

### Run API tests only

```bash
yarn test:api
```

### Run accessibility tests only

```bash
yarn test:a11y
```

### Run BDD tests

```bash
yarn test:bdd
```

### Run headed mode

```bash
yarn test:headed
```

### Generate HTML report

```bash
yarn test:report
```

## Example BDD Feature

```gherkin
Feature: Login functionality

  Scenario: User logs in with valid credentials
    Given I am on the SauceDemo login page
    When I login with valid credentials
    Then I should be logged in successfully
```

## Example JSON Locator

```json
{
  "username": "#user-name",
  "password": "#password",
  "loginButton": "#login-button"
}
```

## Notes

- Selectors are stored in JSON files and loaded dynamically.
- Feature files are independent from raw selectors, improving maintainability.
- The architecture is designed for adding more pages, APIs, and accessibility checks with minimal code duplication.

## Prompt - It does not execute automatically before every chat, and it does not run after the task is completed.


## Your project instructions can recommend that agent automatically, but they cannot guarantee that every Copilot surface will switch to it.