const { injectAxe, checkA11y } = require('@axe-core/playwright');

class A11yUtils {
  static async runA11yCheck(page, options = {}) {
    await injectAxe(page);
    const results = await checkA11y(page, null, options, null, { iframes: false });
    return results;
  }
}

module.exports = A11yUtils;
