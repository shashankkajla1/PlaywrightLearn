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

The GitHub Actions **BDD** option runs only Cucumber scenarios tagged `@bdd`.
Add `@bdd` to BDD features that should run in that selection; the **All** option
continues to run every configured Cucumber feature.

### Run headed mode

```bash
yarn test:headed
```

### Generate HTML report

```bash
yarn test:report
```

Each suite writes its Allure results into its own folder under `reports/`: `ui`,
`api`, `accessibility`, or `bdd`. GitHub Actions generates a separate Allure HTML
report in each suite folder. Playwright suites also produce a Playwright HTML report
and retain traces, screenshots, and videos for failed tests; browser-based UI and
accessibility failures include screenshots in Allure. BDD runs produce `cucumber.html`,
and failed Cucumber scenarios include a screenshot attachment in both reports.

Generate local Allure HTML reports after a test run with:

```bash
npx allure generate reports/api/allure-results --output reports/api/allure-report
```

Replace `api` with `ui`, `accessibility`, or `bdd` as appropriate. In GitHub Actions,
the default-branch workflow run publishes the selected report to GitHub Pages and adds
a clickable report link to the run summary. The downloadable
`e2e-<suite>-reports` artifact remains available for every run. Configure the
repository's **Settings → Pages → Build and deployment → Source** as **GitHub Actions**
to enable deployment. Runs from non-default branches do not deploy Pages.

## CI Playwright UI Auto-Healer

For the architecture, setup walkthrough, safeguards, and troubleshooting, see
[heal.md](./heal.md).

When the **Swag App Tests** workflow fails on the default branch, the
**Playwright UI Auto-Heal** workflow can diagnose a single failed native UI test.
It will only propose replacing one existing selector string in a locator JSON file
used by that spec. The workflow reruns that exact test once without retries and
opens a **draft PR only if that rerun passes**. It never merges a PR, edits test
assertions, or changes application code. If the failure is ambiguous, is not a
native UI test, or does not appear to be a safely repairable selector issue, it
abstains. The normal E2E workflow runs again on the generated PR for independent
CI review.

Run the local guardrail tests for the auto-healer with:

```bash
node --test scripts/ci-auto-heal.test.js
```

This workflow sends the failed test source, its locator JSON, and a bounded,
redacted section of the failure logs to NVIDIA NIM. To keep that data private, it
requires a self-hosted Linux x64 GitHub Actions runner that can reach your private
NIM deployment. Do not use a shared or persistent workstation as the runner; use
an isolated, ephemeral runner and clean it after each job.

### One-time GitHub setup

1. Register an isolated self-hosted runner for this repository with the labels
   `self-hosted`, `linux`, `x64`, and `nvidia-nim`. Install the runner's required
   Playwright Chromium system dependencies and tools, and ensure it can access
   your private HTTPS NIM service and npm registry.
2. In **Settings → Environments**, create the `ci-auto-heal` environment. Add:
   - Variable `NVIDIA_NIM_BASE_URL`: the private OpenAI-compatible API base URL,
     ending in `/v1` (for example, `https://nim.internal.example/v1`).
   - Variable `NVIDIA_MODEL`: the model name served by that NIM deployment.
   - Secret `NVIDIA_API_KEY`: the private endpoint's authentication key.
   - Secret `AUTO_HEAL_APP_ID` and secret `AUTO_HEAL_APP_PRIVATE_KEY`: credentials
     for a GitHub App installed only on this repository.
3. Give that GitHub App only **Contents: read and write** and **Pull requests: read
   and write** permissions, then install it on this repository. Its token is used
   to create the draft PR and ensure the PR-triggered E2E checks run. Never use a
   broad personal access token for this workflow.
4. In **Settings → Actions → General**, allow GitHub Actions to create pull
   requests if required by repository policy. Do not enable automatic merging.
5. Keep the repository default branch protected with required reviews and the
   normal E2E checks. The auto-healer only runs for failed E2E runs whose source
   is the default branch in this same repository; it does not process fork PRs or
   feature-branch failures.

Configure `ci-auto-heal` without required reviewers if the diagnosis should run
without manual approval. Keep any `github-pages` deployment protection you want:
only the default-branch deployment job receives Pages write permissions, and
pull-request test jobs never receive those permissions or deploy reports.

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


Create a GitHub Actions workflow that lets me manually run an E2E test suite from the GitHub Actions Run workflow dropdown.

First inspect package.json, playwright.config.js, cucumber.js, and the project instructions. Use the existing npm scripts as the source of truth; do not change test code or add new dependencies.

Add a workflow_dispatch workflow under .github/workflows/ with a required choice input named suite, offering the available suites: UI, API, Accessibility, BDD, and All. Map each choice to its existing script: test:ui, test:api, test:a11y, test:bdd, and test:all.

Run on ubuntu-latest, set up a compatible Node.js version, install dependencies from the lockfile, install the Chromium browser and required system dependencies, then run only the selected suite. Upload generated test reports and results as workflow artifacts even if tests fail. Keep the workflow focused, use clear step names, and don’t expose secrets or commit credentials.

After implementing it, validate the workflow structure and explain how to trigger it from GitHub Actions.

The dropdown will let you pick the suite each time you manually start the workflow.