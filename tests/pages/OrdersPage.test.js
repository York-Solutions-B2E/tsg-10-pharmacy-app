import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import OrdersPage from '../../src/pages/OrdersPage';

describe('OrdersPage', () => {
  afterEach(() => {
    cleanup();
  });

  test('renders OrdersTable', () => {
    render(<OrdersPage />);
    const ordersPage = screen.getByTestId('orders-page');

    expect(ordersPage).toBeInTheDocument();
  });
});
