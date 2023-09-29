const generateStockData = require('./data/stockData');

function getStockRecommendation(req, res) {
  const stockData = generateStockData('2023-09-01T09:00:00Z', '2023-09-01T10:00:00Z');

  // Implement your recommendation logic based on stockData
  // For now, let's just set a mock result.
  const buyPrice = stockData[0].price;
  const sellPrice = stockData[stockData.length - 1].price;
  const stocksBought = 10;
  const profit = stocksBought * (sellPrice - buyPrice);

  const buyDate = stockData[0].timestamp;
  const sellDate = stockData[stockData.length - 1].timestamp;

  res.json({ buy_price: buyPrice, sell_price: sellPrice, buy_date: buyDate, sell_date: sellDate, stocks_bought: stocksBought, profit: profit });
}

function getStockData(req, res) {
  const stockData = generateStockData('2023-09-01T09:00:00Z', '2023-09-01T10:00:00Z');
  res.json(stockData);
}

module.exports = {
  getStockRecommendation,
  getStockData
};
