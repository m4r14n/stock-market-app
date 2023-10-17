const generateStockData = require("./data/stockData");

// Generate stock data for the previous 2 mins
const now = new Date();
const twoMinutesAgo = new Date(now.getTime() - (2 * 60 * 1000)); // Resta 2 minutos a la fecha actual
const stockData = generateStockData(twoMinutesAgo, now);

const findMostProfitableTimes = (data, startTimestamp, endTimestamp, maxFunds) => {
  let minPrice = Infinity;
  let maxProfit = 0;
  let bestPriceToBuy = null;
  let bestPriceToSell = null;
  let buyDate = null;
  let sellDate = null;
  let stocksBought = 0;
  let profit = 0;

  for (let i = 0; i < data.length; i++) {
    const currentTimestamp = new Date(data[i].timestamp);
    const currentPrice = data[i].price;

    if (currentTimestamp >= startTimestamp && currentTimestamp <= endTimestamp && currentPrice <= maxFunds) {
      if (currentPrice < minPrice) {
        minPrice = currentPrice;
        bestPriceToBuy = currentPrice;
        buyDate = new Date(data[i].timestamp);
        maxProfit = 0; // Reset maxProfit when finding a new buy opportunity
      } else if (currentPrice - minPrice > maxProfit) {
        maxProfit = currentPrice - minPrice;
        bestPriceToBuy = minPrice;
        bestPriceToSell = currentPrice;
        sellDate = new Date(data[i].timestamp);
        stocksBought = Math.floor(maxFunds / minPrice);
        profit = (maxProfit * stocksBought).toFixed(2);
      }
    }
  }

  return { bestPriceToBuy, bestPriceToSell, buyDate, sellDate, stocksBought, profit };
};


function getStockRecommendation(req, res) {
  const startTime = new Date(req.query.start_time) || '';
  const endTime = new Date(req.query.end_time) || '';
  const maxFunds = req.query.max_funds || '';

  const {
    bestPriceToBuy,
    bestPriceToSell,
    buyDate,
    sellDate,
    stocksBought,
    profit
  } = findMostProfitableTimes(stockData, startTime, endTime, maxFunds);

  if (bestPriceToBuy !== null && bestPriceToSell !== null && buyDate !== null && sellDate !== null) {
    res.json({
      buy_time: buyDate.toLocaleString('it-IT'),
      sell_time: sellDate.toLocaleString('it-IT'),
      buy_price: bestPriceToBuy,
      sell_price: bestPriceToSell,
      stocks_bought: stocksBought,
      profit: profit
    });
  } else {
    res.json({ error: "No profitable time range found." });
  }
}

function getStockData(req, res) {
  res.json(stockData);
}

module.exports = {
  getStockRecommendation,
  getStockData
};