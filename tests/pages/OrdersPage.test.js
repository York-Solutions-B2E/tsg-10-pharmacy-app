import { cleanup, render, screen, waitFor } from '@testing-library/react';
import MedicationAPI from '../../src/API/MedicationAPI';
import OrdersAPI from '../../src/API/OrdersAPI';
import * as appContext from '../../src/HOC/AppContext';
import OrdersPage from '../../src/pages/OrdersPage';
import mockMedicationsList from '../__mocks__/mockMedicationsList';
import mockOrdersList from '../__mocks__/mockOrdersList';

jest.mock('../../src/API/OrdersAPI');
jest.mock('../../src/API/MedicationAPI');

const mockContextValues = {
  ordersList: [],
  medicationsList: [],
  updateMedications: jest.fn(),
  updateOrders: jest.fn(),
};

describe('OrdersPage', () => {
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

  it('should render OrdersPage', async () => {
    render(<OrdersPage />);

    expect(screen.getByTestId('orders-page')).toBeInTheDocument();
  });

  it('should fetch orders and update orders and medication state on mount mount', async () => {
    render(<OrdersPage />);

    waitFor(() => {
      expect(OrdersAPI.getAllOrders).toHaveBeenCalledTimes(1);
      expect(MedicationAPI.getAllMedications).toHaveBeenCalledTimes(1);
      expect(mockContextValues.updateOrders).toHaveBeenCalledWith(
        mockOrdersList
      );
      expect(mockContextValues.updateMedications).toHaveBeenCalledWith(
        mockMedicationsList
      );
    });
  });

  it('should catch an error if getAllOrders or getAllMedications fails', async () => {
    jest.clearAllMocks();

    // uses the mockResolvedValueOnce method to simulate a RETURNED failed API call
    OrdersAPI.getAllOrders.mockResolvedValue({
      status: 400,
      body: { message: 'Test orders list Error' },
    });

    MedicationAPI.getAllMedications.mockResolvedValue({
      status: 400,
      body: { message: 'Test medications list Error' },
    });

    render(<OrdersPage />);

    await waitFor(() => {
      expect(OrdersAPI.getAllOrders).toHaveBeenCalledTimes(1);
      expect(mockContextValues.updateOrders).toHaveBeenCalledTimes(0);

      expect(MedicationAPI.getAllMedications).toHaveBeenCalledTimes(1);
      expect(mockContextValues.updateMedications).toHaveBeenCalledTimes(0);
    });
  });
});
