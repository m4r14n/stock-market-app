import React from 'react';

const StockResults = ({ result }) => {
  if (!result) return null;

  const { buy_price, sell_price, buy_date, sell_date, stocks_bought, profit } = result;

  return (
    <div>
      <h2>Recommendation Results</h2>
      <p>Buy Price: ${buy_price}</p>
      <p>Sell Price: ${sell_price}</p>
      <p>Buy Date: {buy_date}</p>
      <p>Sell Date: {sell_date}</p>
      <p>Stocks Bought: {stocks_bought.toFixed(2)}</p>
      <p>Profit: ${profit.toFixed(2)}</p>
    </div>
  );
};

export default StockResults;
