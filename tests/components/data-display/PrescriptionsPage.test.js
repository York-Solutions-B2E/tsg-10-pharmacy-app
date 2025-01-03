import { fireEvent, render, screen, within } from '@testing-library/react';
import PrescriptionsDataGrid from '../../../src/components/data-display/PrescriptionsDataGrid';

const mockPrescriptionsList = [
  {
    id: '1',
    prescriptionNumber: 'fff333',
    patientId: 'pat001',
    medicine: {
      id: '2',
      name: 'Paracetamol',
      medCode: 'med001',
    },
    quantity: '60',
    instructions: 'Take 1 tablet every 4 hours',
    status: 'NEW',
  },
  {
    id: '2',
    prescriptionNumber: 'fff334',
    patientId: 'pat002',
    medicine: {
      id: '1',
      name: 'Aspirin',
      medCode: 'med002',
    },
    quantity: '30',
    instructions: 'Take 1 tablet every 6 hours',
    status: 'OUT_OF_STOCK',
  },
  {
    id: '3',
    prescriptionNumber: 'fff335',
    patientId: 'pat003',
    medicine: {
      id: '3',
      name: 'Ibuprofen',
      medCode: 'med003',
    },
    quantity: '90',
    instructions: 'Take 1 tablet every 8 hours',
    status: 'AWAITING_SHIPMENT',
  },
  {
    id: '4',
    prescriptionNumber: 'fff336',
    patientId: 'pat004',
    medicine: {
      id: '4',
      name: 'Codeine',
      medCode: 'med004',
    },
    quantity: '120',
    instructions: 'Take 1 tablet every 12 hours',
    status: 'STOCK_RECEIVED',
  },
  {
    id: '5',
    prescriptionNumber: 'fff337',
    patientId: 'pat005',
    medicine: {
      id: '5',
      name: 'Morphine',
      medCode: 'med005',
    },
    quantity: '150',
    instructions: 'Take 1 tablet every 24 hours',
    status: 'FILLED',
  },
  {
    id: '6',
    prescriptionNumber: 'fff338',
    patientId: 'pat007',
    medicine: {
      id: '7',
      name: 'Oxycodone',
      medCode: 'med007',
    },
    quantity: '210',
    instructions: 'Take 1 tablet every 72 hours',
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
      expect(getByText(prescription.medicine.medCode)).toBeInTheDocument();
    });
  });

  it('should render row with OUT_OF_STOCK status with correct background', () => {
    render(<PrescriptionsDataGrid prescriptionsList={mockPrescriptionsList} />);
    const outOfStockRow = screen
      .getByText('Out of Stock')
      .closest('.MuiDataGrid-row');
    expect(outOfStockRow).toHaveClass('row-out-of-stock');
  });

  // TEST BUTTON CLICKS
  it('should call handleClickFillPrescription when Fill button is clicked', () => {
    render(<PrescriptionsDataGrid prescriptionsList={mockPrescriptionsList} />);
    const newStatusRow = screen.getByText('New').closest('.MuiDataGrid-row');

    const { getByText } = within(newStatusRow);
    const fillButton = getByText('Fill');

    // TODO: replace with api function being called
    const consoleSpy = jest.spyOn(console, 'log');

    expect(fillButton.disabled).toBe(false);
    fireEvent.click(fillButton);
    expect(consoleSpy).toHaveBeenCalledWith('Fill Prescription, id is:', '1');

    consoleSpy.mockRestore();
  });

  it('should call handleClickOrderMore when Order More button is clicked', () => {
    render(<PrescriptionsDataGrid prescriptionsList={mockPrescriptionsList} />);
    const outOfStockStatusRow = screen
      .getByText('Out of Stock')
      .closest('.MuiDataGrid-row');

    const { getByText } = within(outOfStockStatusRow);
    const orderMoreButton = getByText('Order More');

    // TODO: replace with navigation function being called
    const consoleSpy = jest.spyOn(console, 'log');

    expect(orderMoreButton.disabled).toBe(false);
    fireEvent.click(orderMoreButton);
    expect(consoleSpy).toHaveBeenCalledWith(
      'Order More Medicine, medicine id is:',
      '1'
    );

    consoleSpy.mockRestore();
  });

  it('should call handleClickMarkPickedUp when Mark Picked Up button is clicked', () => {
    render(<PrescriptionsDataGrid prescriptionsList={mockPrescriptionsList} />);
    const fillStatusRow = screen
      .getByText('Filled')
      .closest('.MuiDataGrid-row');

    const { getByText } = within(fillStatusRow);
    const markPickedUpButton = getByText('Mark Picked Up');

    // TODO: replace with api function being called
    const consoleSpy = jest.spyOn(console, 'log');

    expect(markPickedUpButton.disabled).toBe(false);
    fireEvent.click(markPickedUpButton);
    expect(consoleSpy).toHaveBeenCalledWith(
      'Prescription Picked up, id is:',
      '5'
    );

    consoleSpy.mockRestore();
  });

  // TEST BUTTON RENDERING
  it('NEW status should have an enabled Fill and Order More Button', () => {
    render(<PrescriptionsDataGrid prescriptionsList={mockPrescriptionsList} />);
    const newStatusRow = screen.getByText('New').closest('.MuiDataGrid-row');

    const { getByText } = within(newStatusRow);
    const fillButton = getByText('Fill');
    const orderMoreButton = getByText('Order More');

    expect(fillButton.disabled).toBe(false);
    expect(orderMoreButton.disabled).toBe(false);
  });

  it('OUT_OF_STOCK status should have a disabled Fill and enabled Order More Button', () => {
    render(<PrescriptionsDataGrid prescriptionsList={mockPrescriptionsList} />);
    const OutOfStockStatusRow = screen
      .getByText('Out of Stock')
      .closest('.MuiDataGrid-row');

    const { getByText } = within(OutOfStockStatusRow);
    const fillButton = getByText('Fill');
    const orderMoreButton = getByText('Order More');

    expect(fillButton.disabled).toBe(true);
    expect(orderMoreButton.disabled).toBe(false);
  });

  it('AWAITING_SHIPMENT status should have a disabled Fill and Order More Button', () => {
    render(<PrescriptionsDataGrid prescriptionsList={mockPrescriptionsList} />);
    const newStatusRow = screen
      .getByText('Awaiting Shipment')
      .closest('.MuiDataGrid-row');

    const { getByText } = within(newStatusRow);
    const fillButton = getByText('Fill');
    const orderMoreButton = getByText('Order More');

    expect(fillButton.disabled).toBe(true);
    expect(orderMoreButton.disabled).toBe(true);
  });

  it('STOCK_RECEIVED status should have an enabled Fill and Order More Button', () => {
    render(<PrescriptionsDataGrid prescriptionsList={mockPrescriptionsList} />);
    const newStatusRow = screen
      .getByText('Stock Received')
      .closest('.MuiDataGrid-row');

    const { getByText } = within(newStatusRow);
    const fillButton = getByText('Fill');
    const orderMoreButton = getByText('Order More');

    expect(fillButton.disabled).toBe(false);
    expect(orderMoreButton.disabled).toBe(false);
  });

  it('FILLED status should have an enabled Mark Picked Up Button', () => {
    render(<PrescriptionsDataGrid prescriptionsList={mockPrescriptionsList} />);
    const filledRow = screen.getByText('Filled').closest('.MuiDataGrid-row');

    const { getByText } = within(filledRow);
    const pickUpButton = getByText('Mark Picked Up');

    expect(pickUpButton.disabled).toBe(false);
  });

  it('PICKED_UP status should have no buttons', () => {
    render(<PrescriptionsDataGrid prescriptionsList={mockPrescriptionsList} />);
    const pickedUpRow = screen
      .getByText('Picked Up')
      .closest('.MuiDataGrid-row');

    const { queryByRole } = within(pickedUpRow);
    const button = queryByRole('button');

    expect(button).toBeNull();
  });

  // Button Rendering Ensure the correct buttons are rendered for each prescription status
  //// -- NEW status should render Fill button & Order More button
  //// -- OUT_OF_STOCK status should disable Fill Button and render Order More button
  //// -- AWAITING_SHIPMENT status should disable Fill Button and Order More button
  //// -- STOCK_RECEIVED status should render Fill button & Order More button
  //// -- FILLED status should render marked picked up button
  // -- PICKED_UP status should render nothing
});
