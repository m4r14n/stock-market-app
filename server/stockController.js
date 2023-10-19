const { stockData } = require('./config');
const { findBestTrade } = require('./lib/findBestTrade');


function getStockRecommendation(req, res) {
  try {
    // Parse start_time and end_time as Dates
    const startTime = new Date(req.query.start_time);
    const endTime = new Date(req.query.end_time);

    // Check if either of the dates are not valid or if end time is before start time
    if (isNaN(startTime) || isNaN(endTime) || endTime <= startTime) {
      return res.status(400).json({ error: "Invalid time range." });
    }

    // Call the findBestTrade function to get the recommendation
    const recommendation = findBestTrade(stockData, startTime, endTime);

    // Check if a profitable time range is found
    if (recommendation.bestBuy?.timestamp && recommendation.bestSell?.timestamp) {
      
      // Format timestamps for response
      const buyTime = recommendation.bestBuy.timestamp;
      const sellTime = recommendation.bestSell.timestamp;

      // Respond with the recommendation
      return res.status(200).json({
        buy_time: buyTime,
        buy_price: recommendation.bestBuy.price,
        sell_time: sellTime,
        sell_price: recommendation.bestSell.price,
      });
    } else {
      // Respond with an error if no profitable time range is found
      return res.status(404).json({ error: "No profitable time range found." });
    }
  } catch (error) {
    // Handle any unexpected errors and respond with a 500 status code
    return res.status(500).json({ error: error.message });
  }
}


function getStockData(req, res) {
  res.status(200).json(stockData);
}

module.exports = {
  getStockRecommendation,
  getStockData
};
