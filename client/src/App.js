import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import StockResults from './components/StockResults';
import { getStockRecommendation } from './services/stockService';
import useStockForm from './hooks/useStockForm';
import RecommendationForm from './components/RecommendationForm';
import { Typography } from '@mui/material';

function App() {
  const [result, setResult] = useState(null);

  const recomentationForm = useStockForm();

  // Use the form onSubmit to call the getStockRecommendation function
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
        <RecommendationForm form={recomentationForm} onSubmit={handleSubmit}  />
        <StockResults result={result} />
      </Box>
    </Container>
  );
}

export default App;
