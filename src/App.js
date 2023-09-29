import React, { useState } from 'react';

function App() {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [maxFunds, setMaxFunds] = useState('');
  const [result, setResult] = useState(null);

  const handleQuery = async () => {
    try {
      const response = await fetch(`/api/bestTime?start=${start}&end=${end}&maxFunds=${maxFunds}`);
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div>
      <h1>Stock Market App</h1>
      <div>
        <label>Start Time:</label>
        <input type="text" value={start} onChange={e => setStart(e.target.value)} />
      </div>
      <div>
        <label>End Time:</label>
        <input type="text" value={end} onChange={e => setEnd(e.target.value)} />
      </div>
      <div>
        <label>Max Funds:</label>
        <input type="text" value={maxFunds} onChange={e => setMaxFunds(e.target.value)} />
      </div>
      <button onClick={handleQuery}>Query</button>

      {result && (
        <div>
          <h2>Result</h2>
          <p>Buy Time: {result.buyTime}</p>
          <p>Sell Time: {result.sellTime}</p>
          <p>Buy Price: {result.buyPrice}</p>
          <p>Sell Price: {result.sellPrice}</p>
          <p>Stocks Bought: {result.stocksBought}</p>
          <p>Profit: {result.profit}</p>
        </div>
      )}
    </div>
  );
}

export default App;
