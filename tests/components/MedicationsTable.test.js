import { fireEvent, render, screen } from '@testing-library/react';
import MedicationsTable from '../../src/components/MedicationsTable';
import mockMedicationsList from '../__mocks__/mockMedicationsList';

const orderMoreFunc = jest.fn();

describe('MedicationsTable', () => {
  test('renders the table with medications', () => {
    render(
      <MedicationsTable
        medicationsList={mockMedicationsList}
        orderMore={orderMoreFunc}
        editMedicine={orderMoreFunc}
      />
    );

    // Check if the medication names are rendered
    expect(
      screen.getByText(mockMedicationsList[0].medicine.name)
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockMedicationsList[1].medicine.name)
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockMedicationsList[2].medicine.name)
    ).toBeInTheDocument();
  });

  test('calls orderMore when the "Order More" button is clicked', () => {
    render(
      <MedicationsTable
        medicationsList={mockMedicationsList}
        orderMore={orderMoreFunc}
        editMedicine={() => {}}
      />
    );

    // Click the "Order More" button for the first medication
    // sorted alphabetically, so first button is for Caramelex (index 2)
    fireEvent.click(screen.getAllByText('Order More')[0]);

    // Check if the onRemove function was called with the correct id
    expect(orderMoreFunc).toHaveBeenCalledWith({
      id: mockMedicationsList[2].id,
      medicineId: mockMedicationsList[2].medicine.id,
      name: mockMedicationsList[2].medicine.name,
      code: mockMedicationsList[2].medicine.code,
      nextDelivery: mockMedicationsList[2].deliveryDate,
      stockQuantity: mockMedicationsList[2].stockQuantity,
      sufficientStock: mockMedicationsList[2].sufficientStock,
    });
  });

  test('editMedicine is called when the "Add Stock" button is clicked', () => {
    const editMedicineFunc = jest.fn();
    render(
      <MedicationsTable
        medicationsList={mockMedicationsList}
        orderMore={() => {}}
        editMedicine={editMedicineFunc}
      />
    );

    // Click the button for the first medication
    fireEvent.click(screen.getAllByText(/Edit Stock/i)[0]);

    // Check if the function was called with the correct id
    expect(editMedicineFunc).toHaveBeenCalledWith({
      id: mockMedicationsList[2].id,
      medicineId: mockMedicationsList[2].medicine.id,
      name: mockMedicationsList[2].medicine.name,
      code: mockMedicationsList[2].medicine.code,
      nextDelivery: mockMedicationsList[2].deliveryDate,
      stockQuantity: mockMedicationsList[2].stockQuantity,
      sufficientStock: mockMedicationsList[2].sufficientStock,
    });
  });
});
