import { useState, useEffect } from 'react';
import { getStockData } from '../services/stockService';

export default function useStockService() {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStockData();
        setStockData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    stockData,
    loading,
    error,
  };
}
