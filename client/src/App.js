import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Paper, Typography } from '@mui/material';
import { getStockRecommendation } from './services/stockService';
import useStockForm from './hooks/useStockForm';
import RecommendationForm from './components/RecommendationForm';
import StockResults from './components/StockResults';
import ChartStocks from './components/Chart';
import useStockService from './hooks/useStockService';

function App() {
  const [result, setResult] = useState(null);

  const recomentationForm = useStockForm();
  const {stockData} = useStockService();

  // Use the form handleSubmit to call the getStockRecommendation function

  const handleSubmit = async ({ startTime, endTime, maxFunds }) => {
    try {
      const recommendation = await getStockRecommendation(startTime, endTime, maxFunds);
      setResult(recommendation);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Stock Recommendation
        </Typography>
        <Box component={Paper}>
          <RecommendationForm form={recomentationForm} onSubmit={handleSubmit} />
        </Box>
        <StockResults result={result} />
        <ChartStocks data={stockData}/>
      </Box>
    </Container>
  );
}

export default App;
