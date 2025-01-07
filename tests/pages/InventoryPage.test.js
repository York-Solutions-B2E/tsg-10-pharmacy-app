import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import InventoryPage from '../../src/pages/InventoryPage';
import Modal from 'react-modal';
import { cleanup } from '@testing-library/react';

describe('InventoryPage', () => {
  beforeEach(() => {
    Modal.setAppElement(document.body);
  });

  afterEach(() => {
    cleanup();
  });

  test('renders MedicationsTable', () => {
    render(<InventoryPage />);
    const tableElement = screen.getByRole('grid');

    expect(tableElement).toBeInTheDocument();
  });

  describe('Edit Medication Modal', () => {
    test('clicking add stock brings up the modal', async () => {
      render(<InventoryPage />);

      const clickResult = fireEvent.click(
        screen.getAllByText(/Edit Stock/i)[0]
      );
      expect(clickResult).toBe(true);

      await waitFor(() => {
        expect(screen.getByText('Edit Inventory')).toBeInTheDocument();
      });
    });

    test('count field is present when modal opens', async () => {
      render(<InventoryPage />);
      fireEvent.click(screen.getAllByText(/Edit Stock/i)[0]);
      let inputComponent;
      await waitFor(() => {
        expect(screen.getByTestId('totalStockInput')).toBeInTheDocument();
        inputComponent = screen.getByTestId('totalStockInput');
      });

      const clickResult = fireEvent.click(screen.getByText('Close'));
      expect(clickResult).toBe(true);

      await waitFor(() => {
        expect(inputComponent).not.toBeInTheDocument();
      });
    });

    test('clicking edit stock button and inputting data into the text field', async () => {
      render(<InventoryPage />);
      fireEvent.click(screen.getAllByText(/Edit Stock/i)[0]);

      await waitFor(() => {
        expect(screen.getByText('Edit Inventory')).toBeInTheDocument();
      });

      const inputComponent = screen.getByTestId('totalStockInput');
      fireEvent.change(inputComponent, { target: { value: '50' } });

      expect(inputComponent.value).toBe('50');
    });
  });
});
