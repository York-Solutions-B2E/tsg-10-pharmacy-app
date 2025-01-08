import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';
import OrdersAPI from '../../../src/API/OrdersAPI';
import OrderForm from '../../../src/components/forms/OrderForm';

jest.mock('../../../src/API/OrdersAPI'); // Mock the module where placeOrder is defined
const { placeOrder } = OrdersAPI;

const placeOrderSpy = jest.spyOn(OrdersAPI, 'placeOrder');

describe('OrderForm Component', () => {
  const mockInventoryList = [
    {
      id: 1,
      medicine: {
        id: 1,
        name: 'ChocoRelief',
        code: 'CRX-001',
        createdAt: '2025-01-06T21:30:42.035039Z',
        updatedAt: '2025-01-06T21:30:42.035039Z',
      },
      stockQuantity: 100,
      sufficientStock: true,
      minimumOrderCount: 0,
      deliveryDate: '2025-01-11',
    },
    {
      id: 2,
      medicine: {
        id: 2,
        name: 'MintyCure',
        code: 'MCX-002',
        createdAt: '2025-01-06T21:30:42.037949Z',
        updatedAt: '2025-01-06T21:30:42.037949Z',
      },
      stockQuantity: 200,
      sufficientStock: false,
      minimumOrderCount: 120,
      deliveryDate: '2025-01-16',
    },
    {
      id: 3,
      medicine: {
        id: 3,
        name: 'Caramelex',
        code: 'CEX-003',
        createdAt: '2025-01-06T21:30:42.038488Z',
        updatedAt: '2025-01-06T21:30:42.038488Z',
      },
      stockQuantity: 150,
      sufficientStock: true,
      minimumOrderCount: 0,
      deliveryDate: '2025-01-13',
    },
  ];

  const mockFormOptions = mockInventoryList.map((item) => ({
    inventoryId: item.id,
    medicineId: item.medicine.id,
    label: `${item.medicine.name} (${item.medicine.code})`,
    medCode: item.medicine.code,
    medicine: item.medicine.name,
    minQuantity: item.minimumOrderCount,
  }));

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render the OrderForm component', () => {
    render(<OrderForm inventoryList={mockInventoryList} />);
    expect(screen.getByTestId('order-form')).toBeInTheDocument();
  });

  it('should show errors if submission without data', () => {
    render(<OrderForm inventoryList={mockInventoryList} />);

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
    render(<OrderForm inventoryList={mockInventoryList} />);

    const autocompleteInput = screen.getByLabelText('Medicine');

    userEvent.type(autocompleteInput, 'Medic');

    waitFor(() => {
      expect(autocompleteInput.inputValue).toBe('Medic');
      expect(autocompleteInput.value).toBe('');
    });
  });

  it('should change AutoComplete value on input selection', async () => {
    render(<OrderForm inventoryList={mockInventoryList} />);

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
    render(<OrderForm inventoryList={mockInventoryList} />);

    const quantityInput = screen.getByPlaceholderText('Select Quantity');

    // Change the quantity
    userEvent.type(quantityInput, '100');

    waitFor(() => {
      expect(quantityInput.value).toBe('100');
    });
  });

  it('should change the delivery date on DateInput change', async () => {
    render(<OrderForm inventoryList={mockInventoryList} />);

    const deliveryDateInput = screen.getByLabelText('Delivery Date');

    // Change the delivery date
    fireEvent.change(deliveryDateInput, {
      target: { value: dayjs().add(3, 'day') },
    });

    waitFor(() => {
      expect(deliveryDateInput.value).toBe(dayjs().add(3, 'day').toString());
    });
  });

  it('should force minimum quantity to be minimum required count', async () => {
    render(<OrderForm inventoryList={mockInventoryList} />);

    const medicineSelection = mockFormOptions[1].label;
    const minimumQuantity = mockFormOptions[1].minQuantity; // 120

    const autocompleteInput = screen.getByLabelText('Medicine');
    const quantityInput = screen.getByPlaceholderText('Select Quantity');

    // Type and Select a medicine with a minimum quantity
    userEvent.type(autocompleteInput, medicineSelection);
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
    render(<OrderForm inventoryList={mockInventoryList} />);

    const medicineSelection = mockFormOptions[0].label;

    const autocompleteInput = screen.getByLabelText('Medicine');
    const quantityInput = screen.getByPlaceholderText('Select Quantity');

    // Type and Select a medicine with a minimum quantity
    userEvent.type(autocompleteInput, medicineSelection);
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
  it('should submit the form with valid data and call placeOrder', async () => {
    render(<OrderForm inventoryList={mockInventoryList} />);

    const medicineSelection = mockFormOptions[0].label;
    const autocompleteInput = screen.getByLabelText('Medicine');
    const quantityInput = screen.getByPlaceholderText('Select Quantity');
    const deliveryDateInput = screen.getByLabelText('Delivery Date');

    // Type and Select a medicine
    userEvent.type(autocompleteInput, medicineSelection);
    userEvent.click(await screen.findByText(medicineSelection));

    // Change the quantity
    await userEvent.type(quantityInput, '100');

    // Change the delivery date
    fireEvent.change(deliveryDateInput, {
      target: { value: dayjs().add(3, 'day') },
    });

    waitFor(() => {
      expect(autocompleteInput.value).toBe(medicineSelection);
      expect(quantityInput.value).toBe('100');
      expect(deliveryDateInput.value).toBe(dayjs().add(3, 'day'));
    });

    // Click the submit button
    fireEvent.click(screen.getByText('Place Order'));

    // Check if the form was submitted
    waitFor(() => {
      expect(placeOrderSpy).toHaveBeenCalledTimes(1);
      expect(placeOrderSpy).toHaveBeenCalledWith({
        inventoryId: 1,
        medicineId: 1,
        quantity: 150,
        deliveryDate: dayjs().add(3, 'day'),
      });
    });
  });

  it.skip('should show an error message when the API call fails', async () => {
    render(<OrderForm inventoryList={mockInventoryList} />);

    // Select a medicine
    fireEvent.change(screen.getByLabelText('Medicine'), {
      target: { value: mockFormOptions[0].label },
    });
    fireEvent.click(screen.getByText(mockFormOptions[0].label));

    // Set quantity
    fireEvent.change(screen.getByPlaceholderText('Select Quantity'), {
      target: { value: '150' },
    });

    expect(placeOrderSpy).toHaveBeenCalledTimes(1);
    // expect(triggerErrorModal).toHaveBeenCalledTimes(1);
    // expect(triggerErrorModal).toHaveBeenCalledWith('Order placed successfully');
  });

  it.skip('should show an success message when the API call succeeds', async () => {
    placeOrder.mockResolvedValue({ status: 201 });
    render(<OrderForm inventoryList={mockInventoryList} />);

    // Select a medicine
    fireEvent.change(screen.getByLabelText('Medicine'), {
      target: { value: mockFormOptions[0].label },
    });
    fireEvent.click(screen.getByText(mockFormOptions[0].label));

    // Set quantity
    fireEvent.change(screen.getByPlaceholderText('Select Quantity'), {
      target: { value: '150' },
    });

    // expect(triggerSuccessMessage).toHaveBeenCalledTimes(1);
    // expect(triggerSuccessMessage).toHaveBeenCalledWith('Order placed successfully');
  });
});
