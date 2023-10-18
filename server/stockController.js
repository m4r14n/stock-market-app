const fs = require('fs');
// Define the file path
const filePath = 'server/data/stockData.json';
// Read the file
let stockData;
try {
  const data = fs.readFileSync(filePath, 'utf8');
  stockData = JSON.parse(data);
  console.log('JSON data:', stockData);
} catch (error) {
  console.error('Error reading or parsing JSON:', error);
}


const findMostProfitableTimes = (data, startTimestamp, endTimestamp, maxFunds) => {
  let minPrice = Infinity;
  let maxProfit = 0;
  let bestPriceToBuy = null;
  let bestPriceToSell = null;
  let buyDate = null;
  let sellDate = null;
  let stocksBought = 0;
  let profit = 0;

  data.forEach(item => {
    const { timestamp, price } = item;
    const currentTimestamp = new Date(timestamp);

    if (currentTimestamp >= startTimestamp && currentTimestamp <= endTimestamp) {
      if (price < minPrice) {
        minPrice = price;
        bestPriceToBuy = price;
        buyDate = new Date(timestamp);
        maxProfit = 0; // Reset maxProfit when finding a new buy opportunity
      } else if (price - minPrice > maxProfit) {
        maxProfit = price - minPrice;
        bestPriceToBuy = minPrice;
        bestPriceToSell = price;
        sellDate = new Date(timestamp);
        stocksBought = Math.floor(maxFunds / minPrice);
        profit = (maxProfit * stocksBought).toFixed(2);
      }
    }
  });

  if (bestPriceToBuy > maxFunds) {
    throw new Error('Insufficient funds');
  }

  return { bestPriceToBuy, bestPriceToSell, buyDate, sellDate, stocksBought, profit };
};


function getStockRecommendation(req, res) {
  try {
    const startTime = new Date(req.query.start_time) || '';
    const endTime = new Date(req.query.end_time) || '';
    const maxFunds = req.query.max_funds || '';

    let recommendation;
    try {
      recommendation = findMostProfitableTimes(stockData, startTime, endTime, maxFunds);
    } catch (error) {
      return res.status(400).json({ error: error.message }); // Use status 400 for bad request
    }

    const {
      bestPriceToBuy,
      bestPriceToSell,
      buyDate,
      sellDate,
      stocksBought,
      profit
    } = recommendation;

    if (bestPriceToBuy !== null && bestPriceToSell !== null && buyDate !== null && sellDate !== null) {
      res.status(200).json({
        buy_time: buyDate.toLocaleString('it-IT'),
        sell_time: sellDate.toLocaleString('it-IT'),
        buy_price: bestPriceToBuy,
        sell_price: bestPriceToSell,
        stocks_bought: stocksBought,
        profit: profit
      });
    } else {
      res.status(404).json({ error: "No profitable time range found." }); // Use status 404 for not found
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


function getStockData(req, res) {
  res.json(stockData);
}

module.exports = {
  getStockRecommendation,
  getStockData
};