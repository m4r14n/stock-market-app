import React from 'react';
import { Box, Container,  Paper, Typography } from '@mui/material';
import RecommendationForm from '../components/RecommendationForm';
import StockResults from '../components/StockResults';
import ChartStocks from '../components/Chart';
import useStockForm from '../hooks/useStockForm';
import useStockService from '../hooks/useStockService';
import { getStockRecommendation } from '../services/stockService';


export default function StockRecommendation() {
  const [result, setResult] = React.useState(null);
  const recomentationForm = useStockForm();
  const { stockData } = useStockService();
  

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
        <Typography variant="h2" gutterBottom>
          Stock Market
        </Typography>
        <Typography variant="body" gutterBottom>
          This is a simple stock market recommendation system. It will recommend the best time to buy and sell stocks.
        </Typography>
        <Box component={Paper}>
          <RecommendationForm form={recomentationForm} onSubmit={handleSubmit} />
        </Box>
        <StockResults result={result} />
        <ChartStocks data={stockData}/>
      </Box>
    </Container>
  );
};

