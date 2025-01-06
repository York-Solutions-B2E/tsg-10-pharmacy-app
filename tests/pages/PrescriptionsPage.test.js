import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import PrescriptionsPage from '../../src/pages/PrescriptionsPage';

describe('PrescriptionsPage Tests', () => {
  afterEach(() => {
    cleanup();
  });

  test('renders PrescriptionsPage', () => {
    render(<PrescriptionsPage />);
    const prescriptionsPage = screen.getByTestId('prescriptions-page');

    expect(prescriptionsPage).toBeInTheDocument();
  });
});
