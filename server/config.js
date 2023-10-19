const fs = require('fs');

const FILE_PATH = 'server/data/stockData.json';
let stockData;

try {
  const data = fs.readFileSync(FILE_PATH, 'utf8');
  stockData = JSON.parse(data);

  if (!Array.isArray(stockData)) {
    throw new Error('Invalid data format. Expected an array.');
  }

} catch (error) {
  console.error(`Error reading or parsing data: ${error.message}`);
  process.exit(1); // Exit the process if data is not valid
}

module.exports = {
  stockData,
};
