import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';
import MedicationAPI from '../../../src/API/MedicationAPI';
import OrdersAPI from '../../../src/API/OrdersAPI';
import OrdersTable from '../../../src/components/data-display/OrdersTable';
import * as appContext from '../../../src/HOC/AppContext';
import mockMedicationsList from '../../__mocks__/mockMedicationsList';
import mockOrdersList from '../../__mocks__/mockOrdersList';

jest.mock('../../../src/API/OrdersAPI');
jest.mock('../../../src/API/MedicationAPI');

const mockContextValues = {
  ordersList: [],
  medicationsList: [],
  updateMedications: jest.fn(),
  updateOrders: jest.fn(),
};

describe('Test OrdersTable Component Data Display', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest
      .spyOn(appContext, 'useAppContext')
      .mockImplementation(() => mockContextValues);

    OrdersAPI.getAllOrders.mockResolvedValue({
      status: 200,
      body: mockOrdersList,
    });

    MedicationAPI.getAllMedications.mockResolvedValue({
      status: 200,
      body: mockMedicationsList,
    });
  });

  afterEach(() => {
    cleanup();
    appContext.useAppContext.mockReset();
  });

  afterAll(() => {
    appContext.useAppContext.mockRestore();
  });

  // TEST TABLE RENDERING
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

  // TEST BUTTON CLICKS
  it('should call handleClickMarkReceived when Mark Received button is clicked', async () => {
    OrdersAPI.markOrderReceived.mockResolvedValue({ status: 201 });

    render(<OrdersTable ordersList={mockOrdersList} />);

    const orderRow = screen.getByText('Ordered').closest('.MuiDataGrid-row');

    const { getByText } = within(orderRow);
    const markReceivedButton = getByText('Mark Received');
    await userEvent.click(markReceivedButton);

    const mockOrder = {
      id: mockOrdersList[0].id,
      inventoryId: mockOrdersList[0].inventory.id,
      quantity: mockOrdersList[0].quantity,
      deliveryDate: dayjs(mockOrdersList[0].deliveryDate),
      status: mockOrdersList[0].status,
    };

    expect(OrdersAPI.markOrderReceived).toHaveBeenCalledTimes(1); // ? called with order id or order object?
    expect(OrdersAPI.markOrderReceived).toHaveBeenCalledWith(mockOrder);
  });

  it('should call handleClickMarkReceived and refresh the state when return status is 200', async () => {
    OrdersAPI.markOrderReceived.mockResolvedValue({ status: 200 });
    render(<OrdersTable ordersList={mockOrdersList} />);

    const orderRow = screen.getByText('Ordered').closest('.MuiDataGrid-row');

    const { getByText } = within(orderRow);
    const markReceivedButton = getByText('Mark Received');
    await userEvent.click(markReceivedButton);

    expect(OrdersAPI.markOrderReceived).toHaveBeenCalledTimes(1); // ? called with order id or order object?
    expect(OrdersAPI.getAllOrders).toHaveBeenCalledTimes(1);
  });

  it('should call handleClickMarkReceived and throw an error when return status is NOT 200', async () => {
    const consoleErrorMock = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    OrdersAPI.markOrderReceived.mockResolvedValue({
      status: 400,
      body: { message: 'Test Error' },
    });

    render(<OrdersTable ordersList={mockOrdersList} />);

    const orderRow = screen.getByText('Ordered').closest('.MuiDataGrid-row');

    const { getByText } = within(orderRow);
    const markReceivedButton = getByText('Mark Received');
    await userEvent.click(markReceivedButton);

    expect(OrdersAPI.markOrderReceived).toHaveBeenCalledTimes(1); // ? called with order id or order object?
    expect(OrdersAPI.getAllOrders).toHaveBeenCalledTimes(0);
    expect(consoleErrorMock).toHaveBeenCalledWith(
      'Error in marking order received:',
      'Test Error'
    );
    consoleErrorMock.mockRestore();
  });

  it('should call handleClickMarkReceived and throw an error when return status is NOT 200', async () => {
    jest.clearAllMocks();

    OrdersAPI.getAllOrders.mockResolvedValue({
      status: 400,
      body: { message: 'Test Error getAllOrders' },
    });

    OrdersAPI.markOrderReceived.mockResolvedValue({
      status: 200,
    });

    const consoleErrorMock = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(<OrdersTable ordersList={mockOrdersList} />);

    const orderRow = screen.getByText('Ordered').closest('.MuiDataGrid-row');

    const { getByText } = within(orderRow);
    const markReceivedButton = getByText('Mark Received');
    await userEvent.click(markReceivedButton);

    expect(OrdersAPI.markOrderReceived).toHaveBeenCalledTimes(1); // ? called with order id or order object?
    expect(OrdersAPI.getAllOrders).toHaveBeenCalledTimes(1);
    expect(consoleErrorMock).toHaveBeenCalledWith(
      'Error in getting orders list:',
      'Test Error getAllOrders'
    );
    consoleErrorMock.mockRestore();
  });
});
