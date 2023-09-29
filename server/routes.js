const express = require('express');
const router = express.Router();
const stockController = require('./stockController');

router.get('/stock-recommendation', stockController.getStockRecommendation);
router.get('/stock-data', stockController.getStockData);

module.exports = router;
