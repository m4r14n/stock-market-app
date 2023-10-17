// ChartComponent.js

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Paper, Typography } from '@mui/material';

export default function Chart({
  data = []
}) {

  // cast timestamp to local date
  data = data.map((item) => {
    const date = new Date(item.timestamp);
    return {
      ...item,
      timestamp: date.toLocaleString('it-IT'), // dd/mm/yyyy HH:mm:ss
    };
  });

  return (
    <Paper elevation={3} sx={{ mt: 4, p: 2 }}>
      <Typography variant="h6" sx={{ pl: 2 }} >
        Stock Chart
      </Typography>
      <Box sx={{ height: 300, pr: 3, pt: 1 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid  />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="price" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};


