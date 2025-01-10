import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { getAllActivePrescriptions } from '../API/PrescriptionAPI';
import PrescriptionsTable from '../components/data-display/PrescriptionsTable';
import { useAppContext } from '../HOC/AppContext';
import { usePoll } from '../hooks/usePoll';

const PrescriptionsPage = () => {
  const { prescriptionsList, updatePrescriptions } = useAppContext();

  const pollResult = usePoll(getAllActivePrescriptions);

  // refetch the state every 2 seconds
  useEffect(() => {
    if (pollResult && pollResult.ok) {
      updatePrescriptions(pollResult.body);
    }
  }, [pollResult]);

  return (
    <Box sx={{ padding: '30px 30px' }} data-testid="prescriptions-page">
      <Typography
        variant="h4"
        sx={{ textAlign: 'center', marginBottom: '40px' }}
      >
        Active Prescriptions
      </Typography>
      <PrescriptionsTable prescriptionsList={prescriptionsList} />
    </Box>
  );
};

export default PrescriptionsPage;
