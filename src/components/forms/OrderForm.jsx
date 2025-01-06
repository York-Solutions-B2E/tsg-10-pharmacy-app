import { Autocomplete, Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import inventoryList from '../../../dummy-data/inventory-list.json';
import ButtonWithText from '../buttons/ButtonWithText';

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
  const [inputValue, setInputValue] = useState('');
  const [quantity, setQuantity] = useState(0);

  const formatOptions = inventoryList.map((item) => ({
    inventoryId: item.id,
    medicineId: item.medicine.id,
    label: `${item.medicine.name} (${item.medicine.code})`,
    medCode: item.medicine.code,
    medicine: item.medicine.name,
  }));

  // *** Click handlers ***
  const handleSelectMedicine = () => {
    console.log('Selected Medicine:', selectedMedicine);
  };

  const handleSelectQuantity = () => {
    console.log('Selected Quantity:', quantity);
  };

  const handleInputValueChange = (event, newInputValue) => {
    console.log('In handleInputValueChange, newInputValue:', newInputValue);
    setInputValue(newInputValue);
  };

  const handleChangeSelection = (event, newValue) => {
    setSelectedMedicine(newValue);
    console.log('In onChange, newValue', newValue);
  };

  // *** Form submission ***
  const handleOrderSubmit = () => {
    console.log('Clicked on Order Submit');
    
    console.log('Selected Medicine:', selectedMedicine);
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
        renderInput={(params) => <TextField {...params} label="Controllable" />}
        filterOptions={(options, { inputValue }) =>
          options.filter(
            (option) =>
              option.medCode.toLowerCase().includes(inputValue.toLowerCase()) ||
              option.medicine.toLowerCase().includes(inputValue.toLowerCase())
          )
        }
      />

      <ButtonWithText
        onClick={handleOrderSubmit}
        buttonText="Order"
      />
    </Box>
  );
};

export default OrderForm;
