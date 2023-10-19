const findBestTrade = (data, startTimestamp, endTimestamp) => {
  let maxPriceDiff = -Infinity;
  let bestBuy = null;
  let bestSell = null;

  data = data.filter(({ timestamp }) => {
    const currentTime = new Date(timestamp);
    return currentTime >= startTimestamp && currentTime <= endTimestamp;
  });

  for (let i = 0; i < data.length; i++) {
    const { timestamp: buyTime, price: buyPrice } = data[i];

    for (let j = i + 1; j < data.length; j++) {
      const { timestamp: sellTime, price: sellPrice } = data[j];

      if (sellPrice > buyPrice) {
        const priceDiff = sellPrice - buyPrice;
        const currentTradeLength = new Date(sellTime) - new Date(buyTime);

        if (
          priceDiff > maxPriceDiff ||
          (priceDiff === maxPriceDiff && currentTradeLength < bestSell.timestamp - bestBuy.timestamp) ||
          (priceDiff === maxPriceDiff && currentTradeLength === bestSell.timestamp - bestBuy.timestamp && buyTime < bestBuy.timestamp)
        ) {
          maxPriceDiff = priceDiff;
          bestBuy = { timestamp: buyTime, price: buyPrice };
          bestSell = { timestamp: sellTime, price: sellPrice };
        }
      }
    }
  }

  return { bestBuy, bestSell };
};


module.exports = { findBestTrade };
