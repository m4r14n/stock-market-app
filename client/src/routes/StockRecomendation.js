import React from 'react';
import { Paper, Container, Stack, Typography } from '@mui/material';
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
    <Container maxWidth="lg" sx={{ p: 2 }}>
      <Typography variant="h2" gutterBottom>
        Stock Market
      </Typography>
      <Typography variant="body" gutterBottom>
        This is a simple stock market recommendation system. It will recommend the best time to buy and sell stocks.
      </Typography>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-evenly">
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <RecommendationForm form={recomentationForm} onSubmit={handleSubmit} />
        </Paper>
        <StockResults result={result} />
      </Stack>
      <ChartStocks data={stockData} />
    </Container>
  );
};

