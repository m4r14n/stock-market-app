import React from 'react';

const StockResults = ({ result }) => {
  if (!result) return null;

  const { buy_price, sell_price, buy_time, sell_time, stocks_bought, profit } = result;

  console.log(buy_time);
  
  return (
    <div>
      <h2>Recommendation Results</h2>
      <p>Buy Price: ${buy_price}</p>
      <p>Sell Price: ${sell_price}</p>
      <p>Buy Date: {buy_time}</p>
      <p>Sell Date: {sell_time}</p>
      <p>Stocks Bought: {stocks_bought}</p>
      <p>Profit: ${profit}</p>
    </div>
  );
};

export default StockResults;
