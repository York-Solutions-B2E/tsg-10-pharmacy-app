import React, { useState } from 'react';
import MedicationsTable from '../components/MedicationsTable';
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import CustomModal from '../components/CustomModal';
import { TextField } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import MedicationAPI from '../API/MedicationAPI';
import { useAppContext } from '../HOC/AppContext';
import { useNavigate } from 'react-router-dom';

const InventoryPage = () => {
  const [medications, setMedications] = useState([]);

  const [open, setOpen] = useState(false);
  const [currentMedication, setCurrentMedication] = useState(null);

  const { navigate } = useNavigate();

  const handleOpen = (medication) => {
    console.log('Opening modal');
    console.log(medication);
    setCurrentMedication(medication);
    setOpen(true);
  };

  const handleSubmit = () => {
    // TODO: Set id to inventory ID
    MedicationAPI.updateMedicationStock(
      { id: currentMedication.id },
      currentMedication.count
    )
      .catch((error) => {
        console.error('Error updating medication stock:', error);
      })
      .then((response) => {
        if (response.ok) {
          navigate('/orders', { state: currentMedication.id });
        } else {
          console.error(
            'Error updating medication stock:',
            response.body.message
          );
        }
      });
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentMedication(null);
  };

  const editMedication = (medication) => {
    handleOpen(medication);
  };

  const orderMoreMedication = (id) => {
    setMedications(medications.filter((med) => med.id !== id));
  };

  useEffect(() => {
    const initialMedication = [
      {
        id: 1,
        nextDelivery: '2022-12-31',
        code: '12345',
        count: 30,
        sufficiency: 'In Stock',
        name: 'Medication 1',
      },
      {
        id: 2,
        nextDelivery: '2022-12-31',
        code: '67890',
        count: 0,
        sufficiency: 'Insufficient Stock',
        name: 'Medication 2',
      },
      {
        id: 3,
        nextDelivery: '2022-12-31',
        code: '54321',
        count: 0,
        sufficiency: 'On Order',
        name: 'Medication 3',
      },
    ];
    setMedications(initialMedication);
  }, []);

  return (
    <div>
      <CustomModal
        isOpen={open}
        onRequestClose={handleClose}
        onRequestConfirm={handleSubmit}
        contentLabel="Edit Inventory"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Typography variant="h6">
            {currentMedication ? currentMedication.name : ''}
          </Typography>
          <Typography>
            {currentMedication ? currentMedication.code : ''}
          </Typography>
        </Box>
        <Tooltip
          title="Set the total number of pills in stock."
          placement="top"
          arrow
        >
          <TextField
            type="number"
            id="totalStockInput"
            label=""
            value={currentMedication ? currentMedication.count : 0}
            onChange={(e) => {
              const updatedMedication = {
                ...currentMedication,
                count: e.target.value,
              };
              setCurrentMedication(updatedMedication);
            }}
            slotProps={{
              htmlInput: { step: 1, min: 0, 'data-testid': 'totalStockInput' },
            }}
          />
        </Tooltip>
      </CustomModal>
      <Box width={'80%'} alignContent={'center'} margin={'auto'}>
        <h1>Medications</h1>
        <h5>These are all of the medications that we provide.</h5>
        <MedicationsTable
          medications={medications}
          orderMore={orderMoreMedication}
          editMedicine={editMedication}
        />
      </Box>
    </div>
  );
};

export default InventoryPage;
