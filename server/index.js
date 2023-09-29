const express = require('express');
const bodyParser = require('body-parser');
const data = require('./data');

const app = express();
app.use(bodyParser.json());

app.get('/api/bestTime', (req, res) => {
  const { start, end, maxFunds } = req.query;

  // Lógica para determinar los puntos de compra y venta aquí

  res.json({
    buyTime,
    sellTime,
    buyPrice,
    sellPrice,
    stocksBought,
    profit
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
