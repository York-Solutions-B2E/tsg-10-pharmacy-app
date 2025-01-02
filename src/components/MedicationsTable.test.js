import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MedicationsTable from './MedicationsTable';

const mockMedications = [
  {
    id: 1,
    name: 'Medication 1',
    code: '12345',
    count: 30,
    nextDelivery: '2022-12-31',
    sufficiency: 'In Stock',
  },
  {
    id: 2,
    name: 'Medication 2',
    code: '67890',
    count: 0,
    nextDelivery: '2022-12-31',
    sufficiency: 'Insufficient Stock',
  },
  {
    id: 3,
    name: 'Medication 3',
    code: '54321',
    count: 0,
    nextDelivery: '2022-12-31',
    sufficiency: 'On Order',
  },
  {
    id: 4,
    name: 'Medication 4',
    code: '54324',
    count: 0,
    nextDelivery: '2022-12-31',
    sufficiency: 'Invalid',
  },
];

const mockOnRemove = jest.fn();

describe('MedicationsTable', () => {
  test('renders the table with medications', () => {
    render(<MedicationsTable medications={mockMedications} orderMore={mockOnRemove} editMedicine={mockOnRemove} />);

    // Check if the medication names are rendered
    expect(screen.getByText('Medication 1')).toBeInTheDocument();
    expect(screen.getByText('Medication 2')).toBeInTheDocument();
    expect(screen.getByText('Medication 3')).toBeInTheDocument();

    // Check if the sufficiency pills are rendered with correct colors
    expect(screen.getByText('In Stock')).toHaveStyle('background-color: lightgreen');
    expect(screen.getByText('Insufficient Stock')).toHaveStyle('background-color: #ffcccb');
    expect(screen.getByText('On Order')).toHaveStyle('background-color: #ffdab9');
    expect(screen.getByText('Invalid')).toHaveStyle('background-color: grey');
  });

  test('calls onRemove when the "Order More" button is clicked', () => {
    render(<MedicationsTable medications={mockMedications} orderMore={mockOnRemove} editMedicine={ () => {} } />);

    // Click the "Order More" button for the first medication
    fireEvent.click(screen.getAllByText('Order More')[0]);

    // Check if the onRemove function was called with the correct id
    expect(mockOnRemove).toHaveBeenCalledWith(1);
  });
});
