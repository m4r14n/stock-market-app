const { findBestTrade } = require("../lib/findBestTrade");

test('returns null when there are no profitable trades', () => {
  const data = [
    { timestamp: '2022-01-01T00:00:00.000Z', price: 10 },
    { timestamp: '2022-01-01T00:00:01.000Z', price: 9 },
    { timestamp: '2022-01-01T00:00:02.000Z', price: 8 },
    { timestamp: '2022-01-01T00:00:03.000Z', price: 7 },
    { timestamp: '2022-01-01T00:00:04.000Z', price: 6 },
    { timestamp: '2022-01-01T00:00:05.000Z', price: 5 },
    { timestamp: '2022-01-01T00:00:06.000Z', price: 4 },
    { timestamp: '2022-01-01T00:00:07.000Z', price: 3 },
    { timestamp: '2022-01-01T00:00:08.000Z', price: 2 },
  ];
  const startTimestamp = new Date('2022-01-01T00:00:00.000Z');
  const endTimestamp = new Date('2022-01-01T00:00:08.000Z');

  const result = findBestTrade(data, startTimestamp, endTimestamp);

  expect(result).toEqual({ bestBuy: null, bestSell: null });
});

test('returns the correct result when there is only one profitable trade', () => {
  const data = [
    { timestamp: '2022-01-01T00:00:00.000Z', price: 10 },
    { timestamp: '2022-01-01T00:00:01.000Z', price: 20 },
    { timestamp: '2022-01-01T00:00:02.000Z', price: 30 },
    { timestamp: '2022-01-01T00:00:03.000Z', price: 25 },
    { timestamp: '2022-01-01T00:00:04.000Z', price: 15 },
    { timestamp: '2022-01-01T00:00:05.000Z', price: 20 },
    { timestamp: '2022-01-01T00:00:06.000Z', price: 35 },
    { timestamp: '2022-01-01T00:00:07.000Z', price: 40 },
    { timestamp: '2022-01-01T00:00:08.000Z', price: 5 },
  ];
  const startTimestamp = new Date('2022-01-01T00:00:00.000Z');
  const endTimestamp = new Date('2022-01-01T00:00:08.000Z');

  const result = findBestTrade(data, startTimestamp, endTimestamp);

  expect(result).toEqual({
    bestBuy: { timestamp: '2022-01-01T00:00:00.000Z', price: 10 },
    bestSell: { timestamp: '2022-01-01T00:00:07.000Z', price: 40 },
  });
});

test('returns the correct result when there are multiple profitable trades', () => {
  const data = [
    { timestamp: '2022-01-01T00:00:00.000Z', price: 10 },
    { timestamp: '2022-01-01T00:00:01.000Z', price: 20 },
    { timestamp: '2022-01-01T00:00:02.000Z', price: 30 },
    { timestamp: '2022-01-01T00:00:03.000Z', price: 40 },
    { timestamp: '2022-01-01T00:00:04.000Z', price: 10 },
    { timestamp: '2022-01-01T00:00:05.000Z', price: 20 },
    { timestamp: '2022-01-01T00:00:06.000Z', price: 35 },
    { timestamp: '2022-01-01T00:00:07.000Z', price: 40 },
    { timestamp: '2022-01-01T00:00:08.000Z', price: 5 },
  ];
  const startTimestamp = new Date('2022-01-01T00:00:00.000Z');
  const endTimestamp = new Date('2022-01-01T00:00:08.000Z');

  const result = findBestTrade(data, startTimestamp, endTimestamp);

  expect(result).toEqual({
    bestBuy: { timestamp: '2022-01-01T00:00:00.000Z', price: 10 },
    bestSell: { timestamp: '2022-01-01T00:00:03.000Z', price: 40 },
  });
});

test('returns the correct result inside a specific interval', () => {
  const data = [
    { timestamp: '2022-01-01T00:00:00.000Z', price: 10 },
    { timestamp: '2022-01-01T00:00:01.000Z', price: 20 },
    { timestamp: '2022-01-01T00:00:02.000Z', price: 30 },
    { timestamp: '2022-01-01T00:00:03.000Z', price: 40 },
    { timestamp: '2022-01-01T00:00:04.000Z', price: 10 },
    { timestamp: '2022-01-01T00:00:05.000Z', price: 20 },
    { timestamp: '2022-01-01T00:00:06.000Z', price: 35 },
    { timestamp: '2022-01-01T00:00:07.000Z', price: 40 },
    { timestamp: '2022-01-01T00:00:08.000Z', price: 5 },
  ];
  const startTimestamp = new Date('2022-01-01T00:00:02.000Z');
  const endTimestamp = new Date('2022-01-01T00:00:05.000Z');

  const result = findBestTrade(data, startTimestamp, endTimestamp);

  expect(result).toEqual({
    bestBuy: { timestamp: '2022-01-01T00:00:02.000Z', price: 30 },
    bestSell: { timestamp: '2022-01-01T00:00:03.000Z', price: 40 },
  });
});
