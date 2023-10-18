import React from 'react';
import { Paper, Container, Stack, Typography, Snackbar, Alert } from '@mui/material';
import RecommendationForm from '../components/RecommendationForm';
import StockResults from '../components/StockResults';
import ChartStocks from '../components/Chart';
import useStockForm from '../hooks/useStockForm';
import useStockService from '../hooks/useStockService';
import CustomSnackbar from '../components/CustomSnackbar';


export default function StockRecommendation() {
  const { result, onSubmit, snackbar, ...form } = useStockForm();
  const { stockData } = useStockService();

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
          <RecommendationForm form={form} onSubmit={onSubmit} />
        </Paper>
        <StockResults result={result} />
      </Stack>
      <ChartStocks data={stockData} />
      <CustomSnackbar sx={{ width: { xs: '80vw', md: '60vw', lg: '35vw' } }}
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        autoHideDuration={4000}
        handleClose={snackbar.handleClose} />
    </Container>
  );
};

