import StockModel from '../models/StockModel';

const StockController = () => {
  const stockModel = new StockModel();

  const handleQuery = (startTime, endTime, budget) => {
    if (isNaN(startTime) || isNaN(endTime) || isNaN(budget)) {
      return { error: 'The input data is wrong.' };
    }

    return stockModel.calculateBestBuySell(startTime, endTime, budget);
  };

  return {
    handleQuery
  };
};

export default StockController();
