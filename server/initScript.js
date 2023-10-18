const { generateStockData } = require("./data/stockData");


const now = new Date();
const fifteenMinutesAgo = new Date(now.getTime() - (5 * 60 * 1000)); // 5 minutes in milliseconds

const formattedStartDate = fifteenMinutesAgo.toISOString(); // start date in ISO format
const formattedEndDate = now.toISOString(); // end date in ISO format

generateStockData(formattedStartDate, formattedEndDate);
