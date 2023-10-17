import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';

export default function StockResults({ result }) {
  return (
    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h6" gutterBottom>
        Recommendation Results
      </Typography>
      <Grid container spacing={2} sx={{ pt: 2 }}>
        <Grid item xs={6}>
          <Typography>Buy Price: ${result?.buy_price}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Sell Price: ${result?.sell_price}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Buy Date: {result?.buy_time}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Sell Date: {result?.sell_time}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Stocks Bought: {result?.stocks_bought}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Profit: ${result?.profit}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

