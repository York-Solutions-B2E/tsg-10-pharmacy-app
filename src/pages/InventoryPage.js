import { Box, TextField, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import React, { useEffect, useState } from 'react';
import MedicationAPI from '../API/MedicationAPI';
import CustomModal from '../components/CustomModal';
import MedicationsTable from '../components/MedicationsTable';
import { useAppContext } from '../HOC/AppContext';
import { usePoll } from '../hooks/usePoll';

const InventoryPage = () => {
  const { medicationsList, updateMedications, navigate } = useAppContext();

  const [open, setOpen] = useState(false);
  const [currentMedication, setCurrentMedication] = useState(null);

  const pollResult = usePoll(MedicationAPI.getAllMedications);

  // refetch the state every 2 seconds
  useEffect(() => {
    console.log("refresh useEffect triggered. Poll result: ", pollResult);
    if (pollResult && pollResult.ok) {
      updateMedications(pollResult.body);
    }
  }, [pollResult]);

  const handleOpen = (medication) => {
    console.log('Opening modal');
    console.log(medication);
    setCurrentMedication(medication);
    setOpen(true);
  };

  const handleSubmit = async () => {
    const updateStockResult = await MedicationAPI.updateMedicationStock(
      { id: currentMedication.id },
      currentMedication.stockQuantity
    );

    if (updateStockResult.status !== 200) {
      console.error(
        'Error updating medication stock:',
        updateStockResult.body.message
      );
      return;
    }

    setOpen(false);
    const medicationsResponse = await MedicationAPI.getAllMedications();

    if (medicationsResponse.status !== 200) {
      console.error(
        'Error fetching medications:',
        medicationsResponse.body.message
      );
      return;
    }

    updateMedications(medicationsResponse.body);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentMedication(null);
  };

  const editMedication = (medication) => {
    handleOpen(medication);
  };

  const orderMoreMedication = (medication) => {
    console.log('Ordering more of:', medication);
    navigate('/orders', { state: { id: medication.medicineId } });
  };

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
            value={currentMedication ? currentMedication.stockQuantity : 0}
            onChange={(e) => {
              const updatedMedication = {
                ...currentMedication,
                stockQuantity: e.target.value,
              };
              setCurrentMedication(updatedMedication);
            }}
            slotProps={{
              htmlInput: { step: 1, min: 0, 'data-testid': 'totalStockInput' },
            }}
          />
        </Tooltip>
      </CustomModal>
      <Box
        // width={'80%'}
        alignContent={'center'}
        margin={'auto'}
        padding={'30px'}
      >
        <Typography
          variant="h4"
          sx={{ textAlign: 'center', marginBottom: '40px' }}
        >
          Medication Inventory
        </Typography>
        <MedicationsTable
          medicationsList={medicationsList}
          orderMore={orderMoreMedication}
          editMedicine={editMedication}
        />
      </Box>
    </div>
  );
};

export default InventoryPage;
