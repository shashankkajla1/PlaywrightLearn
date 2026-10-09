const fs = require('fs');
const path = require('path');

function loadJsonData(fileName) {
  const filePath = path.resolve(__dirname, '../../data', fileName);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

module.exports = { loadJsonData };
