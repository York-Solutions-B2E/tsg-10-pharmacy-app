import { Box } from '@mui/material';
import { useEffect } from 'react';
import { getAllActivePrescriptions } from '../API/PrescriptionAPI';
import PrescriptionsTable from '../components/data-display/PrescriptionsTable';
import { useAppContext } from '../HOC/AppContext';

const PrescriptionsPage = () => {
  const { prescriptionsList, updatePrescriptions } = useAppContext();

  console.log(prescriptionsList);

  const getPrescriptionsListOnMount = async () => {
    const response = await getAllActivePrescriptions();

    if (response.status !== 200) {
      console.error('Error fetching prescriptions:', response.body?.message);
      return;
    }

    updatePrescriptions(response.body);
  };

  useEffect(() => {
    getPrescriptionsListOnMount();
  }, []);

  return (
    <Box sx={{ padding: '30px 30px' }} data-testid="prescriptions-page">
      <h1>PrescriptionsPage</h1>
      <PrescriptionsTable prescriptionsList={prescriptionsList} />
    </Box>
  );
};

export default PrescriptionsPage;
