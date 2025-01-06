import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OrdersTable from '../../../src/components/data-display/OrdersTable';

const mockOrdersList = [
  {
    id: 1,
    inventory: {
      id: 1,
      medicine: {
        id: 1,
        name: 'ChocoRelief',
        code: 'CRX-001',
        createdAt: '2025-01-06T16:39:13.726428Z',
        updatedAt: '2025-01-06T16:39:13.726428Z',
      },
      stockQuantity: 100,
      sufficientStock: true,
    },
    quantity: 100,
    deliveryDate: '2025-01-11',
    status: 'ORDERED',
    createdAt: '2025-01-06T16:39:13.918578Z',
    updatedAt: '2025-01-06T16:39:13.918578Z',
  },
  {
    id: 2,
    inventory: {
      id: 2,
      medicine: {
        id: 2,
        name: 'MintyCure',
        code: 'MCX-002',
        createdAt: '2025-01-06T16:39:13.793217Z',
        updatedAt: '2025-01-06T16:39:13.793217Z',
      },
      stockQuantity: 200,
      sufficientStock: true,
    },
    quantity: 200,
    deliveryDate: '2025-01-16',
    status: 'RECEIVED',
    createdAt: '2025-01-06T16:39:13.925269Z',
    updatedAt: '2025-01-06T16:39:13.925269Z',
  },
];

describe('Test OrdersTable Component Data Display', () => {
  it('should render OrdersTable Component', () => {
    render(<OrdersTable ordersList={mockOrdersList} />);

    const dataGrid = screen.getByRole('grid');
    expect(dataGrid).toBeInTheDocument();
  });

  it('should render all orders in the list', () => {
    render(<OrdersTable ordersList={mockOrdersList} />);

    mockOrdersList.forEach((order) => {
      const orderRow = screen
        .getByText(order.inventory.medicine.name)
        .closest('.MuiDataGrid-row');
      expect(orderRow).toBeInTheDocument();

      const { getByText } = within(orderRow);
      expect(getByText(order.inventory.medicine.name)).toBeInTheDocument();
      expect(getByText(order.inventory.medicine.code)).toBeInTheDocument();
    });
  });

  // TEST BUTTON CLICKS

  it('should call handleClickMarkReceived when Mark Received button is clicked', async () => {
    render(<OrdersTable ordersList={mockOrdersList} />);
    const orderRow = screen.getByText('Ordered').closest('.MuiDataGrid-row');

    const { getByText } = within(orderRow);
    const markReceivedButton = getByText('Mark Received');

    // TODO: replace with api function being called
    const consoleSpy = jest.spyOn(console, 'log');

    expect(markReceivedButton.disabled).toBe(false);
    await userEvent.click(markReceivedButton);
    expect(consoleSpy).toHaveBeenCalledWith('Order Received, id is:', 1);

    consoleSpy.mockRestore();
  });

  // TEST BUTTON RENDERING
  it('should have an enabled Mark Picked Up Button if the status is ORDERED', () => {
    render(<OrdersTable ordersList={mockOrdersList} />);
    const orderedStatusRow = screen
      .getByText('Ordered')
      .closest('.MuiDataGrid-row');

    const { getByText } = within(orderedStatusRow);
    const markReceivedButton = getByText('Mark Received');

    expect(markReceivedButton).toBeInTheDocument();
    expect(markReceivedButton.disabled).toBe(false);
  });

  it('should have no buttons if the status is RECEIVED', () => {
    render(<OrdersTable ordersList={mockOrdersList} />);
    const receivedStatusRow = screen
      .getByText('Received')
      .closest('.MuiDataGrid-row');

    const { queryByRole } = within(receivedStatusRow);
    const button = queryByRole('button');

    expect(button).toBeNull();
  });
});
