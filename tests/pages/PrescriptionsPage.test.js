import { cleanup, render, screen, waitFor } from '@testing-library/react';
import PrescriptionAPI from '../../src/API/PrescriptionAPI';
import * as appContext from '../../src/HOC/AppContext';
import PrescriptionsPage from '../../src/pages/PrescriptionsPage';
import mockPrescriptionsList from '../__mocks__/mockPrescriptionsList';

jest.mock('../../src/API/PrescriptionAPI');

const mockContextValues = {
  ordersList: [],
  medicationsList: [],
  prescriptionsList: [],
  updateMedications: jest.fn(),
  updateOrders: jest.fn(),
  updatePrescriptions: jest.fn(),
};

describe('PrescriptionsPage Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest
      .spyOn(appContext, 'useAppContext')
      .mockImplementation(() => mockContextValues);

    PrescriptionAPI.getAllPrescriptions.mockResolvedValue({
      status: 200,
      body: mockPrescriptionsList,
    });
  });

  afterEach(() => {
    cleanup();
    appContext.useAppContext.mockReset();
  });

  afterAll(() => {
    appContext.useAppContext.mockRestore();
  });

  it('should render PrescriptionsPage', () => {
    render(<PrescriptionsPage />);
    const prescriptionsPage = screen.getByTestId('prescriptions-page');

    expect(prescriptionsPage).toBeInTheDocument();
  });

  it('should call getAllPrescriptions on mount', async () => {
    render(<PrescriptionsPage />);

    await waitFor(() => {
      expect(PrescriptionAPI.getAllPrescriptions).toHaveBeenCalledTimes(1);
    });
  });

  it('should update the App context state with fetched data', async () => {
    render(<PrescriptionsPage />);

    await waitFor(() => {
      expect(mockContextValues.updatePrescriptions).toHaveBeenCalledWith(
        mockPrescriptionsList
      );
    });
  });
});
