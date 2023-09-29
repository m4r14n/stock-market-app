import React, { useState } from 'react';
import StockForm from './components/StockForm';
import StockResults from './components/StockResults';
import { getStockRecommendation } from './services/stockService';

function App() {
  const [result, setResult] = useState(null);

  const handleQuery = async ({ startTime, endTime, maxFunds }) => {
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
      <StockForm onQuery={handleQuery} />
      <StockResults result={result} />
    </div>
  );
}

export default App;
