import { Autocomplete, Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import inventoryList from '../../../dummy-data/inventory-list.json';
import ButtonWithText from '../buttons/ButtonWithText';
import NumberInput from './NumberInput';

const containerStyling = {
  display: 'flex',
  border: '1px solid rgb(204, 204, 204)',
  width: 'fit-content',
  margin: '0 auto 100px',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '12px 24px',
  borderRadius: '12px',
};

const OrderForm = () => {
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState('');

  const [inputValue, setInputValue] = useState('');
  const [minQuantity, setMinQuantity] = useState(1);
  const [quantityMessage, setQuantityMessage] = useState('');
  const [numberError, setNumberError] = useState(false);

  useEffect(() => {
    // Set the default delivery date to 3 days from today
    setDeliveryDate(dayjs().add(3, 'day'));
  }, []);

  // Format the options based on inventory for the Autocomplete component
  const formatOptions = inventoryList.map((item) => ({
    inventoryId: item.id,
    medicineId: item.medicine.id,
    label: `${item.medicine.name} (${item.medicine.code})`,
    medCode: item.medicine.code,
    medicine: item.medicine.name,
    minQuantity: item.minimumOrderCount,
  }));

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
    setQuantityMessage(`Quantity must be at least ${1}`);
    setNumberError(false);

    // Set the quantity to 1 if the quantity is null
    if (quantity === null) {
      setQuantity(1);
    }

    // If the selected medicine is cleared, reset the quantity and minQuantity
    if (newValue === null) {
      setMinQuantity(1);
      setQuantity(null);
      setQuantityMessage('');
    }

    // Set the minQuantity and quantity message based on the selected medicine
    if (newValue?.minQuantity) {
      setMinQuantity(newValue?.minQuantity);
      setQuantity(newValue?.minQuantity);
      setQuantityMessage(`Quantity must be at least ${newValue?.minQuantity}`);
    }
  };

  // Handler for NumberInput component
  const handleChangeQuantity = (newQuantity) => {
    setQuantity(newQuantity);
    setNumberError(false);

    // Check if the quantity is less than the minQuantity
    if (newQuantity < minQuantity) {
      setNumberError(true);
    }
  };

  // *** Form submission ***
  const handleOrderSubmit = async () => {
    console.log('Clicked on Order Submit');

    // validation
    if (!selectedMedicine) {
      console.log('No medicine selected');
      // TODO: Throw error message
      return;
    }

    if (quantity < minQuantity || quantity === null) {
      console.log('Quantity less than min');
      setNumberError(true);
      // TODO: Throw error message
      return;
    }

    if (!deliveryDate) {
      console.log('No delivery date selected');
      // TODO: Throw error message
      return;
    }

    if (deliveryDate < dayjs()) {
      console.log('Delivery date is in the past');
      // TODO: Throw error message
      return;
    }

    // Prepare order data
    const orderData = {
      medicineId: selectedMedicine?.medicineId,
      inventoryId: selectedMedicine?.inventoryId,
      quantity,
      deliveryDate,
    };

    console.log('Order Submitted. OrderData:', orderData);
    // TODO: Send order data to the server
    // const response = await placeOrder(orderData);
    // if (response.status !== 201) {}
    // TODO: trigger error message

    // ? is success it 201?
    // TODO: trigger success message
    // if (response.status === 201) {}

    // Reset the form on successful submission
    setSelectedMedicine(null);
    setQuantity(null);
    setQuantityMessage('');
  };

  return (
    <Box sx={containerStyling}>
      <h3>Order Form</h3>
      <Autocomplete
        id="controllable-states-demo"
        sx={{ width: 300 }}
        value={selectedMedicine}
        onChange={(event, newValue) => {
          handleChangeSelection(event, newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          handleInputValueChange(event, newInputValue);
        }}
        options={formatOptions}
        renderInput={(params) => <TextField {...params} label="Medicine" />}
        filterOptions={(options, { inputValue }) =>
          options.filter(
            (option) =>
              option.medCode.toLowerCase().includes(inputValue.toLowerCase()) ||
              option.medicine.toLowerCase().includes(inputValue.toLowerCase())
          )
        }
      />
      <NumberInput
        placeholder="Select Quantity"
        value={quantity}
        onChange={(event, val) => handleChangeQuantity(val)}
        min={minQuantity}
        helperText={quantityMessage}
        error={numberError}
      />
      <Typography sx={{ textAlign: 'center' }}>
        Expected delivery date: <br />{' '}
        {dayjs(deliveryDate).format('MMM DD, YYYY')}
      </Typography>
      <ButtonWithText onClick={handleOrderSubmit} buttonText="Place Order" />
    </Box>
  );
};

export default OrderForm;
