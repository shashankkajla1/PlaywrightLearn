const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

test.describe('Accessibility tests', () => {
  test('home page has no critical accessibility issues', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
