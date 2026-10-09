# Copilot instructions

## Project architecture

This is a CommonJS JavaScript test framework with two separate execution paths:

- Native Playwright tests live in `src/tests/` and use `playwright.config.js`.
- Cucumber/Gherkin features live in `src/features/`; step definitions are in `src/steps/`. `cucumber.js` loads those steps and `src/hooks/hooks.js` manages browser and scenario lifecycle.

Both paths cover UI, API, or accessibility behavior. Shared helpers live in `src/utils/`, selectors are stored in `src/locators/` JSON files, and runtime defaults are configured in `src/config/` and `.env.example`. Use `package.json` as the source of truth for commands; `Readme.md` contains older Yarn examples.

## Commands

```bash
npm install
npm run install:browser
npm run test:all
npm run test:ui
npm run test:api
npm run test:a11y
npm run test:bdd
npm run test:headed
npm run test:report
```

Run one native Playwright file or test by title:

```bash
npx playwright test src/tests/ui/login.spec.js --reporter=line
npx playwright test src/tests/ui/login.spec.js --grep "valid login" --reporter=line
```

Run one Cucumber feature or named scenario:

```bash
npx cucumber-js src/features/login/login.feature --config cucumber.js
npx cucumber-js src/features/login/login.feature --config cucumber.js --name "User logs in with valid credentials"
```

There is no build or lint script in `package.json`.

## Code conventions

- Use CommonJS (`require` / `module.exports`) and follow the surrounding file's formatting. The prevailing JavaScript style is two-space indentation, single-quoted strings, semicolons, and trailing commas in multiline structures.
- Native Playwright specs use `@playwright/test`'s `test` and `expect` fixtures. Keep native specs and Cucumber steps separate unless the requested change affects both paths.
- Keep selectors in `src/locators/*.json` and load them with `src/utils/jsonReader.js`; keep feature files expressed as Gherkin behavior, without selectors or implementation details.
- Store Cucumber scenario state on the World object, such as `this.page`, `this.endpoint`, `this.response`, or `this.memory`. The hooks initialize `this.memory` only for `@memory` and `@memory_tidyup` scenarios.
- Reuse helpers in `src/utils/` and preserve their CommonJS exports and public APIs unless the task requires an API change.
- Check URL behavior in the affected test path. Playwright config reads `BASE_URL`, `BROWSER`, and `HEADLESS`; API defaults include `API_BASE_URL` in `src/config/env.js`. Some current tests use hardcoded service URLs.
- Cucumber API steps access `this.request`, but the current Cucumber hooks do not initialize it. Set up that boundary before adding or relying on API BDD scenarios.
- UI and API tests use external SauceDemo and JSONPlaceholder services, so network access is required for those runs.
- Keep generated output in ignored directories such as `playwright-report/`, `test-results/`, and `reports/`. Do not commit `.env` or generated reports.
