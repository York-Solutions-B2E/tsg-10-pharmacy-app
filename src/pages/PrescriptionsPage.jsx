import { Box } from '@mui/material';
import { useEffect } from 'react';
import { getAllActivePrescriptions } from '../API/PrescriptionAPI';
import PrescriptionsTable from '../components/data-display/PrescriptionsTable';
import { useAppContext } from '../HOC/AppContext';

const PrescriptionsPage = () => {
  const { prescriptionsList, updatePrescriptions } = useAppContext();

  console.log(prescriptionsList);
  

  useEffect(() => {
    getAllActivePrescriptions()
      .then((response) => {
        updatePrescriptions(response.body);
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Box sx={{ padding: '30px 30px' }} data-testid="prescriptions-page">
      <h1>PrescriptionsPage</h1>
      <PrescriptionsTable prescriptionsList={[]} />
    </Box>
  );
};

export default PrescriptionsPage;
