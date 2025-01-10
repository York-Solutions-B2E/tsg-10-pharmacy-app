import { cleanup, render, screen, waitFor } from '@testing-library/react';
import PrescriptionAPI from '../../src/API/PrescriptionAPI';
import * as appContext from '../../src/HOC/AppContext';
import { usePoll } from '../../src/hooks/usePoll';
import PrescriptionsPage from '../../src/pages/PrescriptionsPage';
import mockPrescriptionsList from '../__mocks__/mockPrescriptionsList';

jest.mock('../../src/HOC/AppContext');
jest.mock('../../src/hooks/usePoll');
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

    appContext.useAppContext.mockReturnValue(mockContextValues);
    usePoll.mockReturnValue({ ok: true, body: mockPrescriptionsList });
  });

  afterEach(() => {
    cleanup();
    appContext.useAppContext.mockReset();
  });

  afterAll(() => {
    jest.restoreAllMocks();
    appContext.useAppContext.mockRestore();
  });

  it('should render PrescriptionsPage', () => {
    render(<PrescriptionsPage />);
    const prescriptionsPage = screen.getByTestId('prescriptions-page');

    expect(prescriptionsPage).toBeInTheDocument();
  });

  it('should call getAllActivePrescriptions and update AppContext state on mount', async () => {
    render(<PrescriptionsPage />);

    await waitFor(() => {
      expect(usePoll).toHaveBeenCalledTimes(1);
      expect(usePoll).toHaveBeenCalledWith(
        PrescriptionAPI.getAllActivePrescriptions
      );
      expect(mockContextValues.updatePrescriptions).toHaveBeenCalledWith(
        mockPrescriptionsList
      );
    });
  });

  it('should catch any errors if getAllActivePrescriptions fails', async () => {
    usePoll.mockReturnValue({
      ok: false,
      body: { message: 'Error fetching prescriptions' },
    });

    render(<PrescriptionsPage />);

    await waitFor(() => {
      expect(usePoll).toHaveBeenCalledWith(
        PrescriptionAPI.getAllActivePrescriptions
      );
      expect(mockContextValues.updatePrescriptions).toHaveBeenCalledTimes(0);
    });
  });
});
