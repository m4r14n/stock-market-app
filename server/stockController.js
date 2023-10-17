const generateStockData = require("./data/stockData");

// Generate stock data for the next 2 mins
const today = new Date();
const stockData = generateStockData(today.toISOString(), new Date(today.setMinutes(today.getMinutes() + 2)).toISOString());


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

    if (currentTimestamp >= startTimestamp && currentTimestamp <= endTimestamp) {
      if (currentPrice < minPrice && currentPrice <= maxFunds) {
        minPrice = currentPrice;
        bestPriceToBuy = currentPrice;
        buyDate = new Date(data[i].timestamp);
      } else if (currentPrice - minPrice > maxProfit && currentPrice <= maxFunds) {
        maxProfit = currentPrice - minPrice;
        bestPriceToBuy = minPrice;
        bestPriceToSell = currentPrice;
        buyDate = new Date(data[i - 1].timestamp);
        sellDate = new Date(data[i].timestamp);
        stocksBought = maxFunds / minPrice;
        profit = maxProfit * stocksBought;
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
      buy_time: buyDate.toISOString(),
      sell_time: sellDate.toISOString(),
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