const findMostProfitableTimes = (data, startTimestamp, endTimestamp, availableFunds) => {
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

        // Calculate the number of stocks that can be bought with maxFunds 
        const potentialStocksBought = Math.floor(availableFunds / minPrice);

        // Check if the potential profit is greater than maxFunds
        if (potentialStocksBought * price > availableFunds) {
          stocksBought = potentialStocksBought;
          profit = potentialStocksBought * price - potentialStocksBought * minPrice;
        }
      }
    }
  });

  if (bestPriceToBuy > availableFunds) {
    throw new Error('Insufficient funds');
  }

  return { bestPriceToBuy, bestPriceToSell, buyDate, sellDate, stocksBought, profit: profit };
};

module.exports = { findMostProfitableTimes };