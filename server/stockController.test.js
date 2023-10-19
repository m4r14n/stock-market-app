const { findBestTrade } = require('./lib/findBestTrade');
const { getStockRecommendation } = require('./stockController');

jest.mock('./config', () => ({
  stockData: [
    { timestamp: '2022-01-01T00:00:01.000Z', price: 20 },
    { timestamp: '2022-01-01T00:00:02.000Z', price: 30 },
    { timestamp: '2022-01-01T00:00:03.000Z', price: 40 },
    { timestamp: '2022-01-01T00:00:04.000Z', price: 10 },
    { timestamp: '2022-01-01T00:00:05.000Z', price: 20 },
    { timestamp: '2022-01-01T00:00:06.000Z', price: 35 },
  ]
}));

jest.mock('./lib/findBestTrade');

describe('getStockRecommendation', () => {
  const mockRequest = (startTime, endTime) => ({
    query: { start_time: startTime, end_time: endTime },
  });
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  it('should return a recommendation when a profitable time range is found', () => {
    const req = mockRequest('2022-01-01T00:00:01.000Z', '2022-01-01T00:00:04.000Z');
    const res = mockResponse();
    const recommendation = {
      bestBuy: { timestamp: '2022-01-01T00:00:01.000Z', price: 20 },
      bestSell: { timestamp: '2022-01-01T00:00:03.000Z', price: 40 }
    };
    findBestTrade.mockReturnValue(recommendation);

    getStockRecommendation(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      buy_time: '2022-01-01T00:00:01.000Z',
      buy_price: 20,
      sell_time: '2022-01-01T00:00:03.000Z',
      sell_price: 40,
    });
  });

  it('should return an error when no profitable time range is found', () => {
    const req = mockRequest('2022-01-01T00:00:00.000Z', '2022-01-01T00:00:01.000Z');
    const res = mockResponse();
    findBestTrade.mockReturnValue({ bestBuy: {}, bestSell: {} });

    getStockRecommendation(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'No profitable time range found.' });
  });

  it('should return an error when start_time or end_time are invalid', () => {
    const req = mockRequest('invalid', '2021-01-02T00:00:00Z');
    const res = mockResponse();

    getStockRecommendation(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid time range.' });
  });

  it('should return an error when end_time is before start_time', () => {
    const req = mockRequest('2022-01-02T00:00:00Z', '2022-01-01T00:00:00Z');
    const res = mockResponse();

    getStockRecommendation(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid time range.' });
  });

  it('should return an error when an unexpected error occurs', () => {
    const req = mockRequest('2022-01-01T00:00:00Z', '2022-01-04T00:00:00Z');
    const res = mockResponse();
    findBestTrade.mockImplementation(() => {
      throw new Error('Unexpected error');
    });

    getStockRecommendation(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Unexpected error' });
  });
});