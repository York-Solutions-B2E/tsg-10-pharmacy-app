import { Autocomplete, Box, FormControl, FormHelperText } from '@mui/material';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { getAllOrders, placeOrder } from '../../API/OrdersAPI';
import { useAppContext } from '../../HOC/AppContext';
import ButtonWithText from '../buttons/ButtonWithText';
import NumberInput from './NumberInput';

const containerStyling = {
  display: 'flex',
  border: '1px solid rgb(204, 204, 204)',
  width: '500px',
  margin: '0 auto 100px',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '12px 24px',
  borderRadius: '12px',
};

const OrderForm = ({ inventoryList }) => {
  const { updateOrders, location } = useAppContext();

  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState(null);

  const [inputValue, setInputValue] = useState('');
  const [minQuantity, setMinQuantity] = useState(1);
  const [quantityMessage, setQuantityMessage] = useState(
    'Quantity must be at least 1'
  );
  const [numberError, setNumberError] = useState(false);
  const [medicineErrorMessage, setMedicineErrorMessage] = useState('');
  const [deliveryDateErrorMessage, setDeliveryDateErrorMessage] = useState('');

  // Format the options based on inventory for the Autocomplete component
  const formatOptions = inventoryList.map((item) => ({
    inventoryId: item.id,
    medicineId: item.medicine.id,
    label: `${item.medicine.name} (${item.medicine.code})`,
    medCode: item.medicine.code,
    medicine: item.medicine.name,
    minQuantity: item.minimumOrderCount,
  }));

  useEffect(() => {
    if (location.state !== null) {
      console.log('location state:', location.state);

      const medicineId = location.state.id;
  
      const medicineToSelect = formatOptions.find(
        (item) => item.medicineId === medicineId 
      )

      console.log('medicineToSelect:', medicineToSelect);

      // null because the event is null
      handleChangeSelection(null, medicineToSelect);
      

    }

  }, []);

  // *** Click handlers ***
  // Handles the text change in the Autocomplete field
  const handleInputValueChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  // Handles the selection of a medicine in the Autocomplete component
  const handleChangeSelection = (event, newValue) => {
    // clear the quantity and error message first
    setSelectedMedicine(newValue);
    setMinQuantity(1);
    setQuantityMessage('Quantity must be at least 1');
    setNumberError(false);
    setMedicineErrorMessage('');

    // Set the quantity to 1 if the quantity is null
    if (quantity === null) {
      setQuantity(1);
    }

    // Set the minQuantity and quantity message based on the selected medicine
    if (newValue?.minQuantity) {
      setMinQuantity(newValue?.minQuantity);
      setQuantityMessage(`Quantity must be at least ${newValue?.minQuantity}`);
      if (quantity < newValue?.minQuantity) {
        setQuantity(newValue?.minQuantity);
      }
    }
  };

  // Handler for NumberInput component
  const handleChangeQuantity = (newQuantity) => {
    setQuantity(newQuantity);
    setNumberError(false);
  };

  const handleChangeDate = (newDate) => {
    setDeliveryDate(newDate);
    setDeliveryDateErrorMessage('');
  };

  // *** Form submission ***
  const formValidation = () => {
    let isValid = true;

    // validation
    if (!selectedMedicine) {
      setMedicineErrorMessage('No medicine selected');
      isValid = false;
    }

    if (quantity < minQuantity) {
      setNumberError(true);
      setQuantityMessage(`Quantity must be at least ${minQuantity}`);
      isValid = false;
    }

    if (!deliveryDate) {
      setDeliveryDateErrorMessage('No delivery date selected');
      console.error('No delivery date selected');
      // TODO: Throw error message
      isValid = false;
    }

    if (deliveryDate < dayjs()) {
      console.error('Delivery date is in the past');
      // TODO: Throw error message?
      isValid = false;
    }
    return isValid;
  };

  const handleOrderSubmit = async () => {
    if (!formValidation()) {
      console.error('Form validation failed');
      return;
    }

    // Prepare order data
    const orderData = {
      inventoryId: selectedMedicine?.inventoryId,
      quantity,
      deliveryDate,
    };

    const response = await placeOrder(orderData);

    if (response.status !== 201) {
      console.error('Error in placing order');
      // TODO: trigger error message
      alert('Error in placing order');
      return;
    }

    // TODO: trigger success message

    const refreshOrdersList = await getAllOrders();

    if (refreshOrdersList.status !== 200) {
      console.error(
        'Error in fetching orders:',
        refreshOrdersList.body?.message
      );
      return;
    }

    updateOrders(refreshOrdersList.body);

    // Reset the form on successful submission
    setSelectedMedicine(null);
    setQuantity(null);
    setDeliveryDate(null);
    setMinQuantity(1);
    setQuantityMessage('Quantity must be at least 1');
    setDeliveryDateErrorMessage('');
    setMedicineErrorMessage('');
  };

  return (
    <Box sx={containerStyling} data-testid="order-form">
      <h3>Order Form</h3>
      <Autocomplete
        id="controllable-states-demo"
        sx={{ width: '100%' }}
        value={selectedMedicine}
        onChange={(event, newValue) => {
          handleChangeSelection(event, newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          handleInputValueChange(event, newInputValue);
        }}
        options={formatOptions}
        renderInput={(params) => (
          <TextField
            helperText={medicineErrorMessage}
            error={medicineErrorMessage}
            {...params}
            label="Medicine"
          />
        )}
        filterOptions={(options, { inputValue }) =>
          options.filter(
            (option) =>
              option.medCode.toLowerCase().includes(inputValue.toLowerCase()) ||
              option.medicine.toLowerCase().includes(inputValue.toLowerCase())
          )
        }
      />
      <Box
        sx={{
          margin: '20px 0 12px',
          display: 'flex',
          flexDirection: 'row',
          WebkitBoxAlign: 'center',
          alignItems: 'flex-start',
          width: '100%',
          justifyContent: 'space-evenly',
        }}
      >
        <NumberInput
          placeholder="Select Quantity"
          value={quantity}
          onChange={(event, val) => handleChangeQuantity(val)}
          min={minQuantity}
          helperText={quantityMessage}
          error={numberError}
        />

        <FormControl error={deliveryDateErrorMessage}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Delivery Date"
              disablePast={true}
              minDate={dayjs().add(1, 'day')} // disable today
              value={deliveryDate}
              onChange={(newValue) => handleChangeDate(newValue)}
            />
            <FormHelperText
              error={deliveryDateErrorMessage}
              id="my-helper-text"
            >
              {deliveryDateErrorMessage}
            </FormHelperText>
          </LocalizationProvider>
        </FormControl>
      </Box>
      <ButtonWithText onClick={handleOrderSubmit} buttonText="Place Order" />
    </Box>
  );
};

export default OrderForm;
