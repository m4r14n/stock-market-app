import React, { useState } from 'react';
import StockForm from './components/StockForm';
import StockResults from './components/StockResults';
import { getStockRecommendation } from './services/stockService';

function App() {
  const [result, setResult] = useState(null);

  const handleSubmit = async ({ startTime, endTime, maxFunds }) => {
    try {
      const recommendation = await getStockRecommendation(startTime, endTime, maxFunds);
      setResult(recommendation);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Stock Recommendation App</h1>
      <StockForm handleSubmit={handleSubmit} />
      <StockResults result={result} />
    </div>
  );
}

export default App;
