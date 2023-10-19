import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';

export default function StockResults({ result }) {
  const buyTime = result?.buy_time ? new Date(result?.buy_time).toLocaleString('it-IT') : '';
  const sellTime = result?.sell_time ? new Date(result?.sell_time).toLocaleString('it-IT') : '';

  return (
    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Recommendation Results
      </Typography>
      <Grid container spacing={2} sx={{ pt: 2 }} data-testid='results-grid'>
        <Grid item xs={12} sm={6}>
          <Typography>Buy Price: ${result?.buy_price}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>Sell Price: ${result?.sell_price}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>Buy Time: {buyTime}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>Sell Time: {sellTime}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>Stocks Bought: {result?.stocks_bought}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>Profit: ${result?.profit?.toFixed(2)}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

