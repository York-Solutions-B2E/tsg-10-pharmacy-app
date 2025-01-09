import {
  cleanup,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PrescriptionAPI from '../../../src/API/PrescriptionAPI';
import * as appContext from '../../../src/HOC/AppContext';
import PrescriptionsTable from '../../../src/components/data-display/PrescriptionsTable';
import mockPrescriptionsList from '../../__mocks__/mockPrescriptionsList';

jest.mock('../../../src/API/PrescriptionAPI');

const mockContextValues = {
  ordersList: [],
  medicationsList: [],
  prescriptionsList: [],
  updateMedications: jest.fn(),
  updateOrders: jest.fn(),
  updatePrescriptions: jest.fn(),
  navigate: jest.fn(),
};

describe('Test PrescriptionsTable Component Data Display', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest
      .spyOn(appContext, 'useAppContext')
      .mockImplementation(() => mockContextValues);

    PrescriptionAPI.getAllActivePrescriptions.mockResolvedValue({
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

  it('should render PrescriptionsTable Component', () => {
    render(<PrescriptionsTable prescriptionsList={mockPrescriptionsList} />);

    const dataGrid = screen.getByRole('grid');
    expect(dataGrid).toBeInTheDocument();
  });

  it('should render all prescriptions in the list', () => {
    render(<PrescriptionsTable prescriptionsList={mockPrescriptionsList} />);

    mockPrescriptionsList.forEach((prescription) => {
      const prescriptionRow = screen
        .getByText(prescription.prescriptionNumber)
        .closest('.MuiDataGrid-row');
      expect(prescriptionRow).toBeInTheDocument();

      const { getByText } = within(prescriptionRow);
      expect(getByText(prescription.patientId)).toBeInTheDocument();
      expect(getByText(prescription.medicine.code)).toBeInTheDocument();
    });
  });

  it('should render row with OUT_OF_STOCK status with correct background class', () => {
    render(<PrescriptionsTable prescriptionsList={mockPrescriptionsList} />);
    const outOfStockRow = screen
      .getByText('Out of Stock')
      .closest('.MuiDataGrid-row');
    expect(outOfStockRow).toHaveClass('row-out-of-stock');
  });

  // TEST BUTTON RENDERING
  it('should have an enabled Fill and Order More Button if the status is NEW', () => {
    render(<PrescriptionsTable prescriptionsList={mockPrescriptionsList} />);
    const newStatusRow = screen.getByText('New').closest('.MuiDataGrid-row');

    const { getByText } = within(newStatusRow);
    const fillButton = getByText('Fill');
    const orderMoreButton = getByText('Order More');

    expect(fillButton.disabled).toBe(false);
    expect(orderMoreButton.disabled).toBe(false);
  });

  it('should have a disabled Fill and enabled Order More Button if the status is OUT_OF_STOCK', () => {
    render(<PrescriptionsTable prescriptionsList={mockPrescriptionsList} />);
    const outOfStockStatusRow = screen
      .getByText('Out of Stock')
      .closest('.MuiDataGrid-row');

    const { getByText } = within(outOfStockStatusRow);
    const fillButton = getByText('Fill');
    const orderMoreButton = getByText('Order More');

    expect(fillButton.disabled).toBe(true);
    expect(orderMoreButton.disabled).toBe(false);
  });

  it('should have a disabled Fill and Order More Button if the status is AWAITING_SHIPMENT', () => {
    render(<PrescriptionsTable prescriptionsList={mockPrescriptionsList} />);
    const awaitingShipmentStatusRow = screen
      .getByText('Awaiting Shipment')
      .closest('.MuiDataGrid-row');

    const { getByText } = within(awaitingShipmentStatusRow);
    const fillButton = getByText('Fill');
    const orderMoreButton = getByText('Order More');

    expect(fillButton.disabled).toBe(true);
    expect(orderMoreButton.disabled).toBe(true);
  });

  it('should have an enabled Fill and Order More Button if the status is STOCK_RECEIVED', () => {
    render(<PrescriptionsTable prescriptionsList={mockPrescriptionsList} />);
    const stockReceivedStatusRow = screen
      .getByText('Stock Received')
      .closest('.MuiDataGrid-row');

    const { getByText } = within(stockReceivedStatusRow);
    const fillButton = getByText('Fill');
    const orderMoreButton = getByText('Order More');

    expect(fillButton.disabled).toBe(false);
    expect(orderMoreButton.disabled).toBe(false);
  });

  it('should have an enabled Mark Picked Up Button if the status is FILLED', () => {
    render(<PrescriptionsTable prescriptionsList={mockPrescriptionsList} />);
    const filledStatusRow = screen
      .getByText('Filled')
      .closest('.MuiDataGrid-row');

    const { getByText } = within(filledStatusRow);
    const pickUpButton = getByText('Mark Picked Up');

    expect(pickUpButton.disabled).toBe(false);
  });

  it('should have no buttons if the status is PICKED_UP', () => {
    render(<PrescriptionsTable prescriptionsList={mockPrescriptionsList} />);
    const pickedUpStatusRow = screen
      .getByText('Picked Up')
      .closest('.MuiDataGrid-row');

    const { queryByRole } = within(pickedUpStatusRow);
    const button = queryByRole('button');

    expect(button).toBeNull();
  });

  // TEST BUTTON CLICKS

  // Filling a prescription
  it('should call handleClickFillPrescription when Fill button is clicked', async () => {
    PrescriptionAPI.fillPrescription.mockResolvedValue({
      status: 200,
    });

    render(<PrescriptionsTable prescriptionsList={mockPrescriptionsList} />);

    // Select the first row with status NEW
    const newStatusRow = screen.getByText('New').closest('.MuiDataGrid-row');

    const { getByText } = within(newStatusRow);
    const fillButton = getByText('Fill');

    // Click the Fill button
    expect(fillButton.disabled).toBe(false);
    await userEvent.click(fillButton);

    await waitFor(() => {
      expect(PrescriptionAPI.fillPrescription).toHaveBeenCalledTimes(1);
      expect(PrescriptionAPI.fillPrescription).toHaveBeenCalledWith(
        mockPrescriptionsList[0]
      );
    });
  });

  it('should call handleClickFillPrescription and refresh the state if the status is 200', async () => {
    PrescriptionAPI.fillPrescription.mockResolvedValue({
      status: 200,
    });

    render(<PrescriptionsTable prescriptionsList={mockPrescriptionsList} />);

    // Select the first row with status NEW
    const newStatusRow = screen.getByText('New').closest('.MuiDataGrid-row');

    const { getByText } = within(newStatusRow);
    const fillButton = getByText('Fill');

    // Click the Fill button
    expect(fillButton.disabled).toBe(false);
    await userEvent.click(fillButton);

    await waitFor(() => {
      expect(PrescriptionAPI.fillPrescription).toHaveBeenCalledTimes(1);
      expect(PrescriptionAPI.getAllActivePrescriptions).toHaveBeenCalledTimes(
        1
      );
      expect(mockContextValues.updatePrescriptions).toHaveBeenCalledWith(
        mockPrescriptionsList
      );
    });
  });

  it('should call handleClickFillPrescription and call an ERROR if the status is NOT 200', async () => {
    PrescriptionAPI.fillPrescription.mockResolvedValue({
      status: 400,
      body: { message: 'Test fillPrescription Error' },
    });

    const consoleErrorMock = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(<PrescriptionsTable prescriptionsList={mockPrescriptionsList} />);

    // Select the first row with status NEW
    const newStatusRow = screen.getByText('New').closest('.MuiDataGrid-row');

    const { getByText } = within(newStatusRow);
    const fillButton = getByText('Fill');

    // Click the Fill button
    expect(fillButton.disabled).toBe(false);
    await userEvent.click(fillButton);

    await waitFor(() => {
      expect(PrescriptionAPI.fillPrescription).toHaveBeenCalledTimes(1);
      expect(mockContextValues.updatePrescriptions).toHaveBeenCalledTimes(0);
      expect(consoleErrorMock).toHaveBeenCalledWith(
        'Fill Prescription error:',
        'Test fillPrescription Error'
      );
    });

    consoleErrorMock.mockRestore();
  });

  it('should call an ERROR if refreshing the state fails after filling a prescription ', async () => {
    PrescriptionAPI.fillPrescription.mockResolvedValue({
      status: 200,
    });

    PrescriptionAPI.getAllActivePrescriptions.mockResolvedValue({
      status: 400,
      body: { message: 'Test prescriptionsList Error' },
    });

    const consoleErrorMock = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(<PrescriptionsTable prescriptionsList={mockPrescriptionsList} />);

    // Select the first row with status NEW
    const newStatusRow = screen.getByText('New').closest('.MuiDataGrid-row');

    const { getByText } = within(newStatusRow);
    const fillButton = getByText('Fill');

    // Click the Fill button
    expect(fillButton.disabled).toBe(false);
    await userEvent.click(fillButton);

    await waitFor(() => {
      expect(PrescriptionAPI.fillPrescription).toHaveBeenCalledTimes(1);
      expect(PrescriptionAPI.getAllActivePrescriptions).toHaveBeenCalledTimes(
        1
      );
      expect(mockContextValues.updatePrescriptions).toHaveBeenCalledTimes(0);
      expect(consoleErrorMock).toHaveBeenCalledWith(
        'Error refreshing prescriptions list:',
        'Test prescriptionsList Error'
      );
    });

    consoleErrorMock.mockRestore();
  });

  // Ordering more medicine
  it('should navigate to the OrdersPage with the selected medicine state when Order More button is clicked', async () => {
    render(<PrescriptionsTable prescriptionsList={mockPrescriptionsList} />);
    const outOfStockStatusRow = screen
      .getByText('Out of Stock')
      .closest('.MuiDataGrid-row');

    const { getByText } = within(outOfStockStatusRow);
    const orderMoreButton = getByText('Order More');

    expect(orderMoreButton.disabled).toBe(false);
    await userEvent.click(orderMoreButton);

    // TODO: replace with navigation function being called

    await waitFor(() => {
      expect(mockContextValues.navigate).toHaveBeenCalledWith('/orders', {
        state: mockPrescriptionsList[1].medicine,
      });
    });
  });

  // Marking a prescription as picked up
  it('should call handleClickMarkPickedUp when Mark Picked Up button is clicked', async () => {
    PrescriptionAPI.markPickedUp.mockResolvedValue({
      status: 200,
    });

    render(<PrescriptionsTable prescriptionsList={mockPrescriptionsList} />);
    const fillStatusRow = screen
      .getByText('Filled')
      .closest('.MuiDataGrid-row');

    const { getByText } = within(fillStatusRow);
    const markPickedUpButton = getByText('Mark Picked Up');

    expect(markPickedUpButton.disabled).toBe(false);
    await userEvent.click(markPickedUpButton);

    await waitFor(() => {
      expect(PrescriptionAPI.markPickedUp).toHaveBeenCalledTimes(1);
      expect(PrescriptionAPI.markPickedUp).toHaveBeenCalledWith(
        mockPrescriptionsList[4]
      );
    });
  });

  it('should call markPickedUp and refresh the state if the status is 200', async () => {
    PrescriptionAPI.markPickedUp.mockResolvedValue({
      status: 200,
    });

    render(<PrescriptionsTable prescriptionsList={mockPrescriptionsList} />);
    const fillStatusRow = screen
      .getByText('Filled')
      .closest('.MuiDataGrid-row');

    const { getByText } = within(fillStatusRow);
    const markPickedUpButton = getByText('Mark Picked Up');

    expect(markPickedUpButton.disabled).toBe(false);
    await userEvent.click(markPickedUpButton);

    await waitFor(() => {
      expect(PrescriptionAPI.markPickedUp).toHaveBeenCalledTimes(1);
      expect(PrescriptionAPI.getAllActivePrescriptions).toHaveBeenCalledTimes(
        1
      );
      expect(mockContextValues.updatePrescriptions).toHaveBeenCalledWith(
        mockPrescriptionsList
      );
    });
  });

  it('should call markPickedUp and throw an error if the status is NOT 200', async () => {
    PrescriptionAPI.markPickedUp.mockResolvedValue({
      status: 400,
      body: { message: 'Test prescriptionsList Error' },
    });

    const consoleErrorMock = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(<PrescriptionsTable prescriptionsList={mockPrescriptionsList} />);
    const fillStatusRow = screen
      .getByText('Filled')
      .closest('.MuiDataGrid-row');

    const { getByText } = within(fillStatusRow);
    const markPickedUpButton = getByText('Mark Picked Up');

    expect(markPickedUpButton.disabled).toBe(false);
    await userEvent.click(markPickedUpButton);

    await waitFor(() => {
      expect(PrescriptionAPI.markPickedUp).toHaveBeenCalledTimes(1);
      expect(PrescriptionAPI.getAllActivePrescriptions).toHaveBeenCalledTimes(
        0
      );
      expect(mockContextValues.updatePrescriptions).toHaveBeenCalledTimes(0);
      expect(consoleErrorMock).toHaveBeenCalledWith(
        'Marked Pickup failed!',
        'Test prescriptionsList Error'
      );
    });
    consoleErrorMock.mockRestore();
  });

  it('should call an ERROR if refreshing the state fails after marking pickedUp ', async () => {
    PrescriptionAPI.markPickedUp.mockResolvedValue({
      status: 200,
    });

    PrescriptionAPI.getAllActivePrescriptions.mockResolvedValue({
      status: 400,
      body: { message: 'Test prescriptionsList Error' },
    });

    const consoleErrorMock = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(<PrescriptionsTable prescriptionsList={mockPrescriptionsList} />);

    // Select the first row with status FILLED
    const fillStatusRow = screen
      .getByText('Filled')
      .closest('.MuiDataGrid-row');

    const { getByText } = within(fillStatusRow);
    const markPickedUpButton = getByText('Mark Picked Up');

    expect(markPickedUpButton.disabled).toBe(false);
    await userEvent.click(markPickedUpButton);

    await waitFor(() => {
      expect(PrescriptionAPI.markPickedUp).toHaveBeenCalledTimes(1);
      expect(PrescriptionAPI.getAllActivePrescriptions).toHaveBeenCalledTimes(
        1
      );
      expect(mockContextValues.updatePrescriptions).toHaveBeenCalledTimes(0);
      expect(consoleErrorMock).toHaveBeenCalledWith(
        'Error refreshing prescriptions list:',
        'Test prescriptionsList Error'
      );
    });
    consoleErrorMock.mockRestore();
  });
}); // END describe statement
