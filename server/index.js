const express = require('express');
const cors = require('cors');
const routes = require('./routes');

// Initialize the stock data
require('./initScript');

const app = express();

app.use(cors());

app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
