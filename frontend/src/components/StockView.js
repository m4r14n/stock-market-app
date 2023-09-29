import React, { useState } from 'react';
import StockController from '../controllers/StockController';

const StockView = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const stockController = new StockController();

  const handleQuery = (e) => {
    e.preventDefault();

    const queryResult = stockController.handleQuery(
      parseInt(startTime),
      parseInt(endTime),
      parseFloat(budget)
    );

    if (queryResult.error) {
      setError(queryResult.error);
      setResult(null);
    } else {
      setError('');
      setResult(queryResult);
    }
  };

  return (
    <div className="App">
      <h1>Stock Trading Inquiry</h1>
      <form onSubmit={handleQuery}>
        <div>
          <label>Start Time (seconds)</label>
          <input type="number" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
        </div>
        <div>
          <label>End Time (seconds)</label>
          <input type="number" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
        </div>
        <div>
          <label>Available Budget</label>
          <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} required />
        </div>
        <button type="submit">Inquire</button>
      </form>

      {error && <p className="error">{error}</p>}

      {result && (
        <div>
          <h2>Result:</h2>
          <p>Buy at second {result.buyTime}, Sell at second {result.sellTime}</p>
          <p>Number of stocks bought: {result.stocksBought}</p>
          <p>Number of stocks sold: {result.stocksSold}</p>
          <p>Profit: {result.profit}</p>
        </div>
      )}
    </div>
  );
};

export default StockView;
