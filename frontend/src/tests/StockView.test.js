import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import StockView from '../components/StockView';


describe('StockView', () => {
  it('renders the form correctly', () => {
    const { getByLabelText, getByText } = render(<StockView />);
    expect(getByLabelText('Start Time (seconds)')).toBeInTheDocument();
    expect(getByLabelText('End Time (seconds)')).toBeInTheDocument();
    expect(getByLabelText('Available Budget')).toBeInTheDocument();
    expect(getByText('Inquire')).toBeInTheDocument();
  });

  it('displays an error message when the query fails', () => {
    const stockControllerMock = {
      handleQuery: jest.fn().mockReturnValue({ error: 'Invalid input' }),
    };
    const { getByText } = render(<StockView stockController={stockControllerMock} />);
    fireEvent.click(getByText('Inquire'));
    expect(getByText('Invalid input')).toBeInTheDocument();
  });

  it('displays the query result when the query succeeds', () => {
    const stockControllerMock = {
      handleQuery: jest.fn().mockReturnValue({
        buyTime: 10,
        sellTime: 20,
        stocksBought: 100,
        stocksSold: 50,
        profit: 500,
      }),
    };
    const { getByText } = render(<StockView stockController={stockControllerMock} />);
    fireEvent.click(getByText('Inquire'));
    expect(getByText('Buy at second 10, Sell at second 20')).toBeInTheDocument();
    expect(getByText('Number of stocks bought: 100')).toBeInTheDocument();
    expect(getByText('Number of stocks sold: 50')).toBeInTheDocument();
    expect(getByText('Profit: 500')).toBeInTheDocument();
  });
});