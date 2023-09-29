const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const getPriceData = () => {
  const priceData = [
    { timestamp: 1, price: 10 },
    { timestamp: 2, price: 12 },
    { timestamp: 3, price: 15 },
    { timestamp: 4, price: 8 },
    { timestamp: 5, price: 10 },
    { timestamp: 6, price: 7 }
  ];
  return priceData;
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

app.post('/query', (req, res) => {
  const { startTime, endTime, budget } = req.body;

  if (isNaN(startTime) || isNaN(endTime) || isNaN(budget)) {
    return res.status(400).json({ error: 'The input data is not valid.' });
  }

  const result = calculateBestBuySell(startTime, endTime, budget);
  res.json(result);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
