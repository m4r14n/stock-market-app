const fs = require('fs');
const { findMostProfitableTimes } = require('./lib/findMostProfitableTimes');
// Define the file path
const FILE_PATH = 'server/data/stockData.json';

// Read the file and parse the data
const data = fs.readFileSync(FILE_PATH, 'utf8');
const stockData = JSON.parse(data);


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
  res.status(200).json(stockData);

}

module.exports = {
  getStockRecommendation,
  getStockData
};