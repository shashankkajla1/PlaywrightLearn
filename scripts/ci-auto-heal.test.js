const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');
const {
  findUiSpec,
  parseModelJson,
  validatePrivateEndpoint,
  validateRepair,
} = require('./ci-auto-heal');

test('identifies one failed UI test and escapes its title for Playwright grep', () => {
  const result = findUiSpec(
    '  1) [chromium] › src/tests/ui/login.spec.js:10:3 › SauceDemo login tests › valid (login)\n',
  );

  assert.deepEqual(result, {
    specPath: 'src/tests/ui/login.spec.js',
    grep: 'SauceDemo login tests valid \\(login\\)',
  });
});

test('declines to identify a target when logs contain multiple failed tests', () => {
  const result = findUiSpec([
    '  1) [chromium] › src/tests/ui/login.spec.js:10:3 › SauceDemo login tests › valid login',
    '  2) [chromium] › src/tests/ui/login.spec.js:20:3 › SauceDemo login tests › invalid login',
  ].join('\n'));

  assert.equal(result, null);
});

test('accepts a selector update only when it matches the existing locator exactly', () => {
  const originalContent = fs.readFileSync('src/locators/login.json', 'utf8');
  const validProposal = {
    decision: 'repair',
    file: 'src/locators/login.json',
    key: 'loginButton',
    oldValue: '#login-button',
    newValue: '[data-test="login-button"]',
  };

  assert.doesNotThrow(() => validateRepair(validProposal, ['src/locators/login.json']));
  assert.equal(fs.readFileSync('src/locators/login.json', 'utf8'), originalContent);
});

test('rejects stale values, unrelated files, and non-stable selectors', () => {
  const baseProposal = {
    decision: 'repair',
    file: 'src/locators/login.json',
    key: 'loginButton',
    oldValue: '#stale-value',
    newValue: '[data-test="login-button"]',
  };

  assert.throws(
    () => validateRepair(baseProposal, ['src/locators/login.json']),
    /does not match/,
  );
  assert.throws(
    () => validateRepair({ ...baseProposal, file: 'src/locators/home.json' }, ['src/locators/login.json']),
    /not used/,
  );
  assert.throws(
    () => validateRepair({ ...baseProposal, oldValue: '#login-button', newValue: 'button:nth-child(2)' }, ['src/locators/login.json']),
    /stable identifying attribute/,
  );
});

test('rejects public, non-HTTPS, and non-v1 model endpoints without making requests', async () => {
  await assert.rejects(
    validatePrivateEndpoint('https://8.8.8.8/v1'),
    /private network/,
  );
  await assert.rejects(
    validatePrivateEndpoint('http://10.0.0.5/v1'),
    /HTTPS private endpoint/,
  );
  await assert.rejects(
    validatePrivateEndpoint('https://10.0.0.5/api'),
    /ending in \/v1/,
  );
});

test('parses strict JSON responses and rejects malformed model output', () => {
  assert.deepEqual(parseModelJson('```json\n{"decision":"abstain","reason":"unclear"}\n```'), {
    decision: 'abstain',
    reason: 'unclear',
  });
  assert.throws(() => parseModelJson('not valid JSON'), /did not contain a JSON diagnosis/);
});
