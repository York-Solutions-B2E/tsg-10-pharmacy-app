import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PrescriptionsDataGrid from '../../../src/components/data-display/PrescriptionsDataGrid';

const mockPrescriptionsList = [
  {
    id: '1',
    prescriptionNumber: 123456,
    patientId: 32567548,
    medicine: {
      id: '2',
      name: 'ChocoRelief',
      code: 'CRX-001',
      createdAt: '2025-01-06T16:39:13.726428Z',
      updatedAt: '2025-01-06T16:39:13.726428Z',
    },
    quantity: '60',
    instructions: 'Take 1 tablet every 4 hours',
    status: 'NEW',
  },
  {
    id: '2',
    prescriptionNumber: 123457,
    patientId: 32567549,
    medicine: {
      id: '1',
      name: 'MintyCure',
      code: 'MCX-002',
      createdAt: '2025-01-06T16:39:13.726428Z',
      updatedAt: '2025-01-06T16:39:13.726428Z',
    },
    quantity: '30',
    instructions: 'Take 1 tablet every 6 hours',
    status: 'OUT_OF_STOCK',
  },
  {
    id: '3',
    prescriptionNumber: 123458,
    patientId: 32567550,
    medicine: {
      id: '3',
      name: 'Caramelex',
      code: 'CEX-003',
      createdAt: '2025-01-06T16:39:13.726428Z',
      updatedAt: '2025-01-06T16:39:13.726428Z',
    },
    quantity: '90',
    instructions: 'Take 1 tablet every 8 hours',
    status: 'AWAITING_SHIPMENT',
  },
  {
    id: '4',
    prescriptionNumber: 123459,
    patientId: 32567551,
    medicine: {
      id: '4',
      name: 'GummyVita',
      code: 'GVX-004',
      createdAt: '2025-01-06T16:39:13.726428Z',
      updatedAt: '2025-01-06T16:39:13.726428Z',
    },
    quantity: '120',
    instructions: 'Take 1 tablet every 12 hours',
    status: 'STOCK_RECEIVED',
  },
  {
    id: '5',
    prescriptionNumber: 123460,
    patientId: 32567552,
    medicine: {
      id: '5',
      name: 'Lollipoprin',
      code: 'LPX-005',
      createdAt: '2025-01-06T16:39:13.726428Z',
      updatedAt: '2025-01-06T16:39:13.726428Z',
    },
    quantity: '150',
    instructions: 'Take 1 tablet every 24 hours',
    status: 'FILLED',
  },
  {
    id: '6',
    prescriptionNumber: 123461,
    patientId: 32567553,
    medicine: {
      id: '6',
      name: 'CandyCaps',
      code: 'CCX-006',
      createdAt: '2025-01-06T16:39:13.726428Z',
      updatedAt: '2025-01-06T16:39:13.726428Z',
    },
    quantity: '180',
    instructions: 'Take 1 tablet every 48 hours',
    status: 'PICKED_UP',
  },
];

// const renderWithContext = (component) => {
//   return render(
//     <PrescriptionContext.Provider
//       value={{ prescriptionsList: mockPrescriptionsList }}
//     >
//       {component}
//     </PrescriptionContext.Provider>
//   );
// };

describe('Test PrescriptionsDataGrid Component Data Display', () => {
  it('should render PrescriptionsDataGrid Component', () => {
    render(<PrescriptionsDataGrid prescriptionsList={mockPrescriptionsList} />);

    const dataGrid = screen.getByRole('grid');
    expect(dataGrid).toBeInTheDocument();
  });

  it('should render all prescriptions in the list', () => {
    render(<PrescriptionsDataGrid prescriptionsList={mockPrescriptionsList} />);

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
    render(<PrescriptionsDataGrid prescriptionsList={mockPrescriptionsList} />);
    const outOfStockRow = screen
      .getByText('Out of Stock')
      .closest('.MuiDataGrid-row');
    expect(outOfStockRow).toHaveClass('row-out-of-stock');
  });

  // TEST BUTTON CLICKS
  it('should call handleClickFillPrescription when Fill button is clicked', async () => {
    render(<PrescriptionsDataGrid prescriptionsList={mockPrescriptionsList} />);
    const newStatusRow = screen.getByText('New').closest('.MuiDataGrid-row');

    const { getByText } = within(newStatusRow);
    const fillButton = getByText('Fill');

    // TODO: replace with api function being called
    const consoleSpy = jest.spyOn(console, 'log');

    expect(fillButton.disabled).toBe(false);
    await userEvent.click(fillButton);
    expect(consoleSpy).toHaveBeenCalledWith('Fill Prescription, id is:', '1');

    consoleSpy.mockRestore();
  });

  it('should call handleClickOrderMore when Order More button is clicked', async () => {
    render(<PrescriptionsDataGrid prescriptionsList={mockPrescriptionsList} />);
    const outOfStockStatusRow = screen
      .getByText('Out of Stock')
      .closest('.MuiDataGrid-row');

    const { getByText } = within(outOfStockStatusRow);
    const orderMoreButton = getByText('Order More');

    // TODO: replace with navigation function being called
    const consoleSpy = jest.spyOn(console, 'log');

    expect(orderMoreButton.disabled).toBe(false);
    await userEvent.click(orderMoreButton);
    expect(consoleSpy).toHaveBeenCalledWith(
      'Order More Medicine, medicine id is:',
      '1'
    );

    consoleSpy.mockRestore();
  });

  it('should call handleClickMarkPickedUp when Mark Picked Up button is clicked', async () => {
    render(<PrescriptionsDataGrid prescriptionsList={mockPrescriptionsList} />);
    const fillStatusRow = screen
      .getByText('Filled')
      .closest('.MuiDataGrid-row');

    const { getByText } = within(fillStatusRow);
    const markPickedUpButton = getByText('Mark Picked Up');

    // TODO: replace with api function being called
    const consoleSpy = jest.spyOn(console, 'log');

    expect(markPickedUpButton.disabled).toBe(false);
    await userEvent.click(markPickedUpButton);
    expect(consoleSpy).toHaveBeenCalledWith(
      'Prescription Picked up, id is:',
      '5'
    );

    consoleSpy.mockRestore();
  });

  // TEST BUTTON RENDERING
  it('should have an enabled Fill and Order More Button if the status is NEW', () => {
    render(<PrescriptionsDataGrid prescriptionsList={mockPrescriptionsList} />);
    const newStatusRow = screen.getByText('New').closest('.MuiDataGrid-row');

    const { getByText } = within(newStatusRow);
    const fillButton = getByText('Fill');
    const orderMoreButton = getByText('Order More');

    expect(fillButton.disabled).toBe(false);
    expect(orderMoreButton.disabled).toBe(false);
  });

  it('should have a disabled Fill and enabled Order More Button if the status is OUT_OF_STOCK', () => {
    render(<PrescriptionsDataGrid prescriptionsList={mockPrescriptionsList} />);
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
    render(<PrescriptionsDataGrid prescriptionsList={mockPrescriptionsList} />);
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
    render(<PrescriptionsDataGrid prescriptionsList={mockPrescriptionsList} />);
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
    render(<PrescriptionsDataGrid prescriptionsList={mockPrescriptionsList} />);
    const filledStatusRow = screen
      .getByText('Filled')
      .closest('.MuiDataGrid-row');

    const { getByText } = within(filledStatusRow);
    const pickUpButton = getByText('Mark Picked Up');

    expect(pickUpButton.disabled).toBe(false);
  });

  it('should have no buttons if the status is PICKED_UP', () => {
    render(<PrescriptionsDataGrid prescriptionsList={mockPrescriptionsList} />);
    const pickedUpStatusRow = screen
      .getByText('Picked Up')
      .closest('.MuiDataGrid-row');

    const { queryByRole } = within(pickedUpStatusRow);
    const button = queryByRole('button');

    expect(button).toBeNull();
  });
});
