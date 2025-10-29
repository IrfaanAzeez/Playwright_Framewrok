const xlsx = require('xlsx');
const path = require('path');

function getDataFromExcel(sheetName, key) {
  const wb = xlsx.readFile(path.join(__dirname, '../../data/testData.xlsx'));
  const sheet = wb.Sheets[sheetName];
  if (!sheet) throw new Error('Sheet not found: ' + sheetName);
  const arr = xlsx.utils.sheet_to_json(sheet);
  return arr.find(r => r.Key === key);
}

module.exports = { getDataFromExcel };