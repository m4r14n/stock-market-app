import React, { useState } from 'react';

const StockForm = ({
  form,
  handleSubmit
}) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [maxFunds, setMaxFunds] = useState('');

  const onSubmit = () => {
    if (startTime && endTime && maxFunds) {
      handleSubmit({ startTime, endTime, maxFunds });
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div>
      <label>
        Start Time:
        <input type="datetime-local" value={startTime} onChange={e => setStartTime(e.target.value)} />
      </label>
      <br />
      <label>
        End Time:
        <input type="datetime-local" value={endTime} onChange={e => setEndTime(e.target.value)} />
      </label>
      <br />
      <label>
        Max Funds (USD):
        <input type="number" value={maxFunds} onChange={e => setMaxFunds(e.target.value)} />
      </label>
      <br />
      <button onClick={onSubmit}>Get Recommendations</button>
    </div>
  );
};

export default StockForm;
