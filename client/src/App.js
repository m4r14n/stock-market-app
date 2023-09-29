import React, { useState } from 'react';
import StockForm from './components/StockForm';
import StockResults from './components/StockResults';

function App() {
  const [result, setResult] = useState(null);

  const handleQuery = ({ startTime, endTime, maxFunds }) => {
    fetch(`http://localhost:5000/api/stock-recommendation?start_time=${startTime}&end_time=${endTime}&max_funds=${maxFunds}`)
      .then(response => response.json())
      .then(data => setResult(data))
      .catch(error => console.error('Error:', error));
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
