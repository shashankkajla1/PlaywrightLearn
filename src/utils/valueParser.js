function parse(value, memory, data) {
  if (typeof value !== 'string') return value;

  let parsedValue = value.replace(/\$\$([A-Za-z_][A-Za-z0-9_.]*)/g, (placeholder, path) => {
    const resolvedValue = getPath(data, path);

    if (resolvedValue === undefined) {
      throw new Error(`No test data value found for path "${path}"`);
    }

    return String(resolvedValue);
  });

  if (!memory) return parsedValue;

  return parsedValue.replace(/\$([A-Za-z_][A-Za-z0-9_]*)/g, (placeholder, key) => {
    if (!memory.has(key)) {
      throw new Error(`No value stored for memory key "${key}"`);
    }

    return String(memory.get(key));
  });
}

function getPath(source, path) {
  return path.split('.').reduce((current, key) => current?.[key], source);
}

module.exports = { parse };
