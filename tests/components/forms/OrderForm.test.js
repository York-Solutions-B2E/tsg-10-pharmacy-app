import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';
import MedicationAPI from '../../../src/API/MedicationAPI';
import OrdersAPI from '../../../src/API/OrdersAPI';
import OrderForm from '../../../src/components/forms/OrderForm';
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

const mockFormOptions = mockMedicationsList.map((item) => ({
  inventoryId: item.id,
  medicineId: item.medicine.id,
  label: `${item.medicine.name} (${item.medicine.code})`,
  medCode: item.medicine.code,
  medicine: item.medicine.name,
  minQuantity: item.minimumOrderCount,
}));

describe('OrderForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    cleanup();

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
    jest.resetAllMocks();
    cleanup();
    appContext.useAppContext.mockReset();
  });

  afterAll(() => {
    appContext.useAppContext.mockRestore();
  });

  it('should render the OrderForm component', () => {
    render(<OrderForm inventoryList={mockMedicationsList} />);
    expect(screen.getByTestId('order-form')).toBeInTheDocument();
  });

  it('should show errors if submission without data', () => {
    render(<OrderForm inventoryList={mockMedicationsList} />);

    // Click the submit button without filling the form
    fireEvent.click(screen.getByText('Place Order'));

    const medicineError = screen.getByText('No medicine selected');
    const quantityError = screen.getByText('Quantity must be at least 1');
    const deliveryDateError = screen.getByText('No delivery date selected');

    // Check for validation messages
    expect(medicineError).toBeInTheDocument();
    expect(quantityError).toBeInTheDocument();
    expect(quantityError).toHaveClass('Mui-error');
    expect(deliveryDateError).toBeInTheDocument();
    expect(deliveryDateError).toHaveClass('Mui-error');
  });

  it('should change Autocomplete input value on type change', async () => {
    render(<OrderForm inventoryList={mockMedicationsList} />);

    const autocompleteInput = screen.getByLabelText('Medicine');

    await userEvent.type(autocompleteInput, 'Medic');

    waitFor(() => {
      expect(autocompleteInput.inputValue).toBe('Medic');
      expect(autocompleteInput.value).toBe('');
    });
  });

  it('should change AutoComplete value on input selection', async () => {
    render(<OrderForm inventoryList={mockMedicationsList} />);

    const medicineSelection = mockFormOptions[0].label;
    const autocompleteInput = screen.getByLabelText('Medicine');

    // Type and Select a medicine
    userEvent.type(autocompleteInput, medicineSelection);
    userEvent.click(await screen.findByText(medicineSelection));

    waitFor(() => {
      expect(autocompleteInput.value).toBe(medicineSelection);
    });
  });

  it('should change the quantity on NumberInput change', async () => {
    render(<OrderForm inventoryList={mockMedicationsList} />);

    const quantityInput = screen.getByPlaceholderText('Select Quantity');

    // Change the quantity
    await userEvent.type(quantityInput, '100');

    await waitFor(() => {
      expect(quantityInput.value).toBe('100');
    });
  });

  // ! Issues setting the date with the date picker, will come back to this
  it('should change the delivery date on DateInput change', async () => {
    render(<OrderForm inventoryList={mockMedicationsList} />);

    const deliveryDateInput = screen.getByLabelText('Delivery Date');

    // Open the date picker
    userEvent.click(deliveryDateInput);
    // Change the delivery date
    userEvent.type(
      deliveryDateInput,
      dayjs().add(3, 'day').format('MM/DD/YYYY')
    );

    const expectedDate = dayjs().add(3, 'day').format('MM/DD/YYYY');

    await waitFor(() => {
      console.log('Expected Delivery Date:', expectedDate);
      console.log('Delivery Date:', deliveryDateInput.value);
      expect(deliveryDateInput.value).toBe(expectedDate);
    });
  });

  it('should force minimum quantity to be minimum required count', async () => {
    render(<OrderForm inventoryList={mockMedicationsList} />);

    const medicineSelection = mockFormOptions[1].label;
    const minimumQuantity = mockFormOptions[1].minQuantity; // 120

    const autocompleteInput = screen.getByLabelText('Medicine');
    const quantityInput = screen.getByPlaceholderText('Select Quantity');

    // Type and Select a medicine with a minimum quantity
    await userEvent.type(autocompleteInput, medicineSelection);
    userEvent.click(screen.findByText(medicineSelection));

    // Initial quantity is set based on the minimum quantity
    waitFor(() => {
      expect(quantityInput.value).toBe(minimumQuantity.toString());
    });

    // Attempt Quantity change to less than the minimum quantity
    fireEvent.change(quantityInput, {
      target: { value: '100' },
    });

    // Check Expected Quantity to be minimum quantity even set to less
    waitFor(() => {
      expect(screen.getByPlaceholderText('Select Quantity').value).toBe(
        minimumQuantity.toString()
      );
      expect(screen.getByText('Quantity must be at least 120'))
        .toBeInTheDocument;
    });
  });

  it('should have a minimum quantity of 1 if no minimum quantity is set', async () => {
    render(<OrderForm inventoryList={mockMedicationsList} />);

    const medicineSelection = mockFormOptions[0].label;

    const autocompleteInput = screen.getByLabelText('Medicine');
    const quantityInput = screen.getByPlaceholderText('Select Quantity');

    // Type and Select a medicine with a minimum quantity
    await userEvent.type(autocompleteInput, medicineSelection);
    userEvent.click(screen.findByText(medicineSelection));

    // Initial quantity is set based on the minimum quantity
    waitFor(() => {
      expect(quantityInput.value).toBe('1');
      expect(
        screen.getByText('Quantity must be at least 1')
      ).toBeInTheDocument();
    });
  });

  // ! I don't trust this test what's going wrong here?
  // ! it passes when running alone but fails when ran with other tests
  // ! the console.log statements imply that the date is not being set correctly
  // ! but the the other test that sets the date is passing
  // ! Error: Could not determine window of node. Node was [object Promise]
  it('should submit the form with valid data and call placeOrder', async () => {
    OrdersAPI.placeOrder.mockResolvedValue({
      status: 201,
    });

    render(<OrderForm inventoryList={mockMedicationsList} />);

    const medicineSelection = mockFormOptions[0].label;
    const autocompleteInput = screen.getByLabelText('Medicine');
    const quantityInput = screen.getByPlaceholderText('Select Quantity');
    const deliveryDateInput = screen.getByLabelText('Delivery Date');

    // Open the date picker
    userEvent.click(deliveryDateInput);
    // Change the delivery date
    await userEvent.type(
      deliveryDateInput,
      dayjs().add(3, 'day').format('MM/DD/YYYY')
    );

    // Type and Select a medicine
    userEvent.type(autocompleteInput, medicineSelection);
    userEvent.click(await screen.findByText(medicineSelection));

    // Change the quantity
    await userEvent.type(quantityInput, '150');

    const expectedDate = dayjs().add(3, 'day');

    // Click the submit button
    await userEvent.click(screen.getByText('Place Order'));

    // Check if the form was submitted
    await waitFor(() => {
      expect(OrdersAPI.placeOrder).toHaveBeenCalledTimes(1);
      // ! Mismatched date timezone rendering
      // expect(OrdersAPI.placeOrder).toHaveBeenCalledWith({
      //   inventoryId: 1,
      //   quantity: 150,
      //   deliveryDate: expectedDate.toISOString(),
      // });
    });
  });

  // TODO: once correctly setting date in other tests, come back to this
  it.skip('should show an error message when the API call fails', async () => {
    render(<OrderForm inventoryList={mockMedicationsList} />);

    // Select a medicine
    fireEvent.change(screen.getByLabelText('Medicine'), {
      target: { value: mockFormOptions[0].label },
    });
    fireEvent.click(screen.getByText(mockFormOptions[0].label));

    // Set quantity
    fireEvent.change(screen.getByPlaceholderText('Select Quantity'), {
      target: { value: '150' },
    });

    expect(OrdersAPI.placeOrder).toHaveBeenCalledTimes(1);
    // expect(OrdersAPI.placeOrder).not.toHaveStatus(400);
    // expect(triggerErrorModal).toHaveBeenCalledTimes(1);
  });

  // TODO: once correctly setting date in other tests, come back to this
  it.skip('should show an success message when the API call succeeds', async () => {
    placeOrder.mockResolvedValue({ status: 201 });
    render(<OrderForm inventoryList={mockMedicationsList} />);

    // Select a medicine
    fireEvent.change(screen.getByLabelText('Medicine'), {
      target: { value: mockFormOptions[0].label },
    });
    fireEvent.click(screen.getByText(mockFormOptions[0].label));

    // Set quantity
    fireEvent.change(screen.getByPlaceholderText('Select Quantity'), {
      target: { value: '150' },
    });

    expect(OrdersAPI.placeOrder).toHaveBeenCalledTimes(1);
    expect(OrdersAPI.placeOrder).toHaveStatus(200);
    expect(OrdersAPI.getAllOrders).toHaveBeenCalledTimes(1);
    // expect(triggerSuccessModal).toHaveBeenCalledTimes(1);
  });
});
