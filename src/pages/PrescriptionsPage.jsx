import { Box } from '@mui/material';
import { useEffect } from 'react';
import { getAllActivePrescriptions } from '../API/PrescriptionAPI';
import PrescriptionsTable from '../components/data-display/PrescriptionsTable';
import { useAppContext } from '../HOC/AppContext';
import { usePoll } from '../hooks/usePoll';
import Typography from '@mui/material/Typography';

const PrescriptionsPage = () => {
  const { prescriptionsList, updatePrescriptions } = useAppContext();

  const pollResult = usePoll(getAllActivePrescriptions);

  useEffect(() => {
    console.log('pollResult:', pollResult);

    if (pollResult && pollResult.ok) {
      console.log('pollResult.body:', pollResult.body);

      updatePrescriptions(pollResult.body);
    }
  }, [pollResult]);

  return (
    <Box sx={{ padding: '30px 30px' }} data-testid="prescriptions-page">
      <Typography variant='h4' sx={{textAlign: 'center', marginBottom: '40px'}}>Active Prescriptions</Typography>
      <PrescriptionsTable prescriptionsList={prescriptionsList} />
    </Box>
  );
};

export default PrescriptionsPage;
