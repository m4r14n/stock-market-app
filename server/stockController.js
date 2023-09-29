const generateStockData = require('./data/stockData');

const findMostProfitableTimes = (data, startTimestamp, endTimestamp, maxFunds) => {
  let minPrice = Infinity;
  let maxProfit = 0;
  let bestPriceToBuy = null; //store the price at which a stock is bought during the most profitable trading scenario.
  let bestPriceToSell = null; //store the price at which a stock is sold during the most profitable trading scenario.
  let buyDate = null; //store the date at which a stock is bought during the most profitable trading scenario.
  let sellDate = null; //store the date at which a stock is sold during the most profitable trading scenario.
  let stocksBought = 0;
  let profit = 0;

  for (let i = 0; i < data.length; i++) {
    const currentTimestamp = data[i].timestamp;
    const currentPrice = data[i].price;

    if (currentTimestamp >= startTimestamp && currentTimestamp <= endTimestamp) {
      if (currentPrice < minPrice) {
        minPrice = currentPrice;
      } else if (currentPrice - minPrice > maxProfit && currentPrice <= maxFunds) {
        maxProfit = currentPrice - minPrice;
        bestPriceToBuy = minPrice;
        bestPriceToSell = currentPrice;
        buyDate = new Date(data[i - 1].timestamp);
        sellDate = new Date(currentTimestamp);
        stocksBought = maxFunds / minPrice;
        profit = maxProfit * stocksBought;
      } else if (currentPrice > bestPriceToSell && currentPrice <= maxFunds) {
        bestPriceToSell = currentPrice;
        minPrice = currentPrice - maxProfit;
      }
    }
  }

  return { bestPriceToBuy, bestPriceToSell, buyDate, sellDate, stocksBought, profit };
};

const stockData = generateStockData('2023-09-01T09:00:00Z', '2023-09-01T10:00:00Z');

function getStockRecommendation(req, res) {
  const startTime = req.query.start_time || '';
  const endTime = req.query.end_time || '';
  const maxFunds = req.query.max_funds || '';

  const {
    bestPriceToBuy,
    bestPriceToSell,
    buyDate,
    sellDate,
    stocksBought,
    profit
  } = findMostProfitableTimes(stockData, startTime, endTime, maxFunds);

  res.json({
    buy_price: bestPriceToBuy,
    sell_price: bestPriceToSell,
    buy_date: buyDate, sell_date: sellDate,
    stocks_bought: stocksBought,
    profit: profit
  });
}

function getStockData(req, res) {
  res.json(stockData);
}

module.exports = {
  getStockRecommendation,
  getStockData
};
