const StockModel = () => {
  const getPriceData = () => {
    return [
      { timestamp: 1, price: 10 },
      { timestamp: 2, price: 12 },
      { timestamp: 3, price: 15 },
      { timestamp: 4, price: 8 },
      { timestamp: 5, price: 10 },
      { timestamp: 6, price: 7 }
    ];
  };

  const calculateBestBuySell = (startTime, endTime, budget) => {
    const priceData = getPriceData();

    let bestProfit = 0;
    let buyTime = 0;
    let sellTime = 0;
    let stocksBought = 0;
    let stocksSold = 0;

    for (let i = 0; i < priceData.length; i++) {
      for (let j = i + 1; j < priceData.length; j++) {
        if (priceData[j].timestamp - priceData[i].timestamp >= startTime &&
          priceData[j].timestamp - priceData[i].timestamp <= endTime) {
          const profit = (priceData[j].price - priceData[i].price) * budget;
          if (profit > bestProfit) {
            bestProfit = profit;
            buyTime = priceData[i].timestamp;
            sellTime = priceData[j].timestamp;
            stocksBought = budget / priceData[i].price;
            stocksSold = stocksBought;
          }
        }
      }
    }

    return {
      buyTime,
      sellTime,
      stocksBought,
      stocksSold,
      profit: bestProfit
    };
  };

  return {
    calculateBestBuySell
  };
};

export default StockModel();
