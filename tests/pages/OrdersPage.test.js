import { cleanup, render, screen } from '@testing-library/react';
import MedicationAPI from '../../src/API/MedicationAPI';
import OrdersAPI from '../../src/API/OrdersAPI';
import { AppContext } from '../../src/HOC/AppContext';
import OrdersPage from '../../src/pages/OrdersPage';
import mockMedicationsList from '../__mocks__/mockMedicationsList';
import mockOrdersList from '../__mocks__/mockOrdersList';
console.log('AppContext in test:', AppContext);

jest.mock('../../src/API/OrdersAPI');
jest.mock('../../src/API/MedicationAPI');

describe('OrdersPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();

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
  });

  it('renders OrdersPage with initial state', async () => {
    render(
      <AppContext.Provider
        value={{
          ordersList: [],
          updateOrders: jest.fn(),
          medicationsList: [],
          updateMedications: jest.fn(),
          prescriptionsList: [],
          updatePrescriptions: jest.fn(),
          navigate: jest.fn(),
        }}
      >
        <OrdersPage />
      </AppContext.Provider>
    );

    expect(screen.getByTestId('orders-page')).toBeInTheDocument();
  });

  // test('renders OrdersTable', () => {
  //   renderWithProviders(<OrdersPage />);

  //   const ordersPage = screen.getByTestId('orders-page');

  //   expect(ordersPage).toBeInTheDocument();
  // });

  // it('fetches orders and medications on mount', async () => {
  //   renderWithProviders(<OrdersPage />);

  //   await waitFor(() => {
  //     expect(ordersApi.getAllOrders).toHaveBeenCalledTimes(1);
  //     expect(medicationsApi.getAllMedications).toHaveBeenCalledTimes(1);
  //   });
  // });

  // it('updates context with fetched data', async () => {
  //   renderWithProviders(<OrdersPage />);

  //   await waitFor(() => {
  //     expect(mockContextValues.updateOrders).toHaveBeenCalledWith(
  //       mockOrdersList
  //     );
  //     expect(mockContextValues.updateMedications).toHaveBeenCalledWith(
  //       mockMedicationsList
  //     );
  //   });
  // });
});
