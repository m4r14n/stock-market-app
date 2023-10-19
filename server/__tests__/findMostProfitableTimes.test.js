const { findMostProfitableTimes } = require("../lib/findMostProfitableTimes");


describe('findMostProfitableTimes', () => {
  const data = [
    { timestamp: '2022-01-01T00:00:00.000Z', price: 10 },
    { timestamp: '2022-01-02T00:00:00.000Z', price: 20 },
    { timestamp: '2022-01-03T00:00:00.000Z', price: 30 },
    { timestamp: '2022-01-04T00:00:00.000Z', price: 25 },
    { timestamp: '2022-01-05T00:00:00.000Z', price: 15 },
    { timestamp: '2022-01-06T00:00:00.000Z', price: 5 },
  ];

  it('should return the most profitable times to buy and sell stocks', () => {
    const startTimestamp = new Date('2022-01-01T00:00:00.000Z');
    const endTimestamp = new Date('2022-01-06T00:00:00.000Z');
    const availableFunds = 100;

    const result = findMostProfitableTimes(data, startTimestamp, endTimestamp, availableFunds);

    expect(result).toEqual({
      bestPriceToBuy: 10,
      bestPriceToSell: 30,
      buyDate: new Date('2022-01-01T00:00:00.000Z'),
      sellDate: new Date('2022-01-03T00:00:00.000Z'),
      stocksBought: 10,
      profit: 200,
    });
  });

  it('should throw an error if available funds are insufficient', () => {
    const startTimestamp = new Date('2022-01-01T00:00:00.000Z');
    const endTimestamp = new Date('2022-01-06T00:00:00.000Z');
    const availableFunds = 1;

    expect(() => {
      findMostProfitableTimes(data, startTimestamp, endTimestamp, availableFunds);
    }).toThrow('Insufficient funds');
  });
});