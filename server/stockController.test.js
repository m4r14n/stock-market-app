describe('Find most profitable time', () => {
  const data = [
    { "timestamp": "2023-10-16T00:00:00.000Z", "price": 82.56 },
    { "timestamp": "2023-10-16T00:00:01.000Z", "price": 61.93 },
    { "timestamp": "2023-10-16T00:00:02.000Z", "price": 74.25 },
    { "timestamp": "2023-10-16T00:00:03.000Z", "price": 59.32 },
    { "timestamp": "2023-10-16T00:00:04.000Z", "price": 66.14 },
    { "timestamp": "2023-10-16T00:00:05.000Z", "price": 72.01 },
    { "timestamp": "2023-10-16T00:00:06.000Z", "price": 56.78 },
    { "timestamp": "2023-10-16T00:00:07.000Z", "price": 98.45 },
    { "timestamp": "2023-10-16T00:00:08.000Z", "price": 63.29 },
    { "timestamp": "2023-10-16T00:00:09.000Z", "price": 88.72 },
    { "timestamp": "2023-10-16T00:00:10.000Z", "price": 75.81 }
  ];

  it('should return the correct result for a profitable time range', () => {
    const startTimestamp = new Date("2023-10-16T00:00:00.000Z").getTime();
    const endTimestamp = new Date("2023-10-16T00:00:07.000Z").getTime();
    const maxFunds = 100;
    const expected = {
      bestPriceToBuy: 56.78,
      bestPriceToSell: 98.45,
      buyDate: new Date("2023-10-16T00:00:06.000Z"),
      sellDate: new Date("2023-10-16T00:00:07.000Z"),
      stocksBought: 1.758893280632411,
      profit: 70.15513274336211,
    };
    const result = findMostProfitableTimes(data, startTimestamp, endTimestamp, maxFunds);
    expect(result).toEqual(expected);
  });

  it('should return null when there is no profitable time range', () => {
    const startTimestamp = new Date("2023-10-16T00:00:01.000Z").getTime();
    const endTimestamp = new Date("2023-10-16T00:00:02.000Z").getTime();
    const maxFunds = 100;
    const expected = {
      bestPriceToBuy: null,
      bestPriceToSell: null,
      buyDate: null,
      sellDate: null,
      stocksBought: 0,
      profit: 0,
    };
    const result = findMostProfitableTimes(data, startTimestamp, endTimestamp, maxFunds);
    expect(result).toEqual(expected);
  });

  it('should return null when the max funds are not enough to buy any stock', () => {
    const startTimestamp = new Date("2023-10-16T00:00:01.000Z").getTime();
    const endTimestamp = new Date("2023-10-16T00:00:10.000Z").getTime();
    const maxFunds = 1;
    const expected = {
      bestPriceToBuy: null,
      bestPriceToSell: null,
      buyDate: null,
      sellDate: null,
      stocksBought: 0,
      profit: 0,
    };
    const result = findMostProfitableTimes(data, startTimestamp, endTimestamp, maxFunds);
    expect(result).toEqual(expected);
  });

  it('should return null when the start time is after the end time', () => {
    const startTimestamp = new Date("2023-10-16T00:00:02.000Z").getTime();
    const endTimestamp = new Date("2023-10-16T00:00:01.000Z").getTime();
    const maxFunds = 100;
    const expected = {
      bestPriceToBuy: null,
      bestPriceToSell: null,
      buyDate: null,
      sellDate: null,
      stocksBought: 0,
      profit: 0,
    };
    const result = findMostProfitableTimes(data, startTimestamp, endTimestamp, maxFunds);
    expect(result).toEqual(expected);
  });

});
