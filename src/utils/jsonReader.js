const fs = require('fs');
const path = require('path');

function readJson(filePath) {
  const absolutePath = path.resolve(__dirname, '../', filePath);
  const raw = fs.readFileSync(absolutePath, 'utf8');
  return resolveLocatorReferences(JSON.parse(raw), path.dirname(absolutePath));
}

function resolveLocatorReferences(value, directory) {
  if (Array.isArray(value)) {
    return value.map((item) => resolveLocatorReferences(item, directory));
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, resolveLocatorReferences(item, directory)]),
    );
  }

  if (typeof value !== 'string' || !value.startsWith('$common.')) {
    return value;
  }

  const commonKey = value.slice('$common.'.length);
  const commonPath = path.join(directory, 'common.json');
  const commonLocators = JSON.parse(fs.readFileSync(commonPath, 'utf8'));

  if (!(commonKey in commonLocators)) {
    throw new Error(`Common locator "${commonKey}" was not found in ${commonPath}`);
  }

  return commonLocators[commonKey];
}

module.exports = { readJson };
