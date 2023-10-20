const fs = require('fs');

const generateStockData = (from, to) => {
  const startTimestamp = new Date(from).getTime();
  const endTimestamp = new Date(to).getTime();
  const interval = 1000; // One second interval

  const stockData = [];

  for (let timestamp = startTimestamp; timestamp <= endTimestamp; timestamp += interval) {
    const price = Math.random() * (100 - 50) + 50; // Generate a random price between 50 and 100
    stockData.push({ timestamp: new Date(timestamp).toISOString(), price: parseFloat(price.toFixed(2)) });
  }

  // Store the result in a json file and overwrites the file if it already exists
  const jsonStockData = JSON.stringify(stockData);
  // set the path and filename
  const filePath = './data/stockData.json';

  fs.writeFileSync(filePath, jsonStockData);
};

module.exports = { generateStockData };
