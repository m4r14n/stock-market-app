import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StockView from '../components/StockView';

describe('StockView', () => {
  it('renders the form correctly', () => {
    render(<StockView />);
    expect(screen.getByLabelText('Start Time (seconds)')).toBeInTheDocument();
    expect(screen.getByLabelText('End Time (seconds)')).toBeInTheDocument();
    expect(screen.getByLabelText('Available Budget')).toBeInTheDocument();
    expect(screen.getByText('Inquire')).toBeInTheDocument();
  });

  it('displays an error message when the query fails', () => {
    const stockControllerMock = {
      handleQuery: jest.fn().mockReturnValue({ error: 'Invalid input' }),
    };
    render(<StockView stockController={stockControllerMock} />);
    fireEvent.click(screen.getByText('Inquire'));
    expect(screen.getByText('Invalid input')).toBeInTheDocument();
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
    render(<StockView stockController={stockControllerMock} />);
    fireEvent.click(screen.getByText('Inquire'));
    expect(screen.getByText('Buy at second 10, Sell at second 20')).toBeInTheDocument();
    expect(screen.getByText('Number of stocks bought: 100')).toBeInTheDocument();
    expect(screen.getByText('Number of stocks sold: 50')).toBeInTheDocument();
    expect(screen.getByText('Profit: 500')).toBeInTheDocument();
  });
});