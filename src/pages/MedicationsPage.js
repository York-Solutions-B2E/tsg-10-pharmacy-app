import React, { useState } from 'react';
import MedicationsTable from '../components/MedicationsTable';
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';

const MedicationsPage = () => {
  const [medications, setMedications] = useState([]);

  const orderMoreMedication = (medication) => {
    console.log('Add medication button clicked');
  };

  const editMedicine = (id) => {
    console.log('Edit medication button clicked');
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
      <Box width={'80%'} alignContent={'center'} margin={'auto'}>
        <h1>Medications</h1>
        <h5>These are all of the medications that we provide.</h5>
        <MedicationsTable
          medications={medications}
          orderMore={orderMoreMedication}
          editMedicine={editMedicine}
        />
      </Box>
    </div>
  );
};

export default MedicationsPage;
