import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { getAllActivePrescriptions } from '../API/PrescriptionAPI';
import PrescriptionsTable from '../components/data-display/PrescriptionsTable';
import { useAppContext } from '../HOC/AppContext';
import { usePoll } from '../hooks/usePoll';
import { useDispatch, useSelector } from 'react-redux';
import { getAllActivePrescriptions } from '../store/actions/prescriptionsActions';

const PrescriptionsPage = () => {
  const { prescriptionsList, updatePrescriptions } = useAppContext();

  const dispatch = useDispatch();
  const prescriptionsListFromReducer = useSelector(
    (state) => state.prescriptions.prescriptionsList
  );
  const prescriptionsListErrorMessage = useSelector(
    (state) => state.prescriptions.prescriptionsListErrorMessage
  );
  const prescriptionsListIsLoading = useSelector(
    (state) => state.prescriptions.prescriptionsListIsLoading
  );

  useEffect(() => {
    dispatch(getAllActivePrescriptions());
  }, []);

  // const pollResult = usePoll(getAllActivePrescriptions);

  // // refetch the state every 2 seconds
  // useEffect(() => {
  //   if (pollResult && pollResult.ok) {
  //     updatePrescriptions(pollResult.body);
  //   }
  // }, [pollResult]);

  return (
    <Box sx={{ padding: '30px 30px' }} data-testid="prescriptions-page">
      <Typography
        variant="h4"
        sx={{ textAlign: 'center', marginBottom: '40px' }}
      >
        Active Prescriptions
      </Typography>
      <PrescriptionsTable prescriptionsList={prescriptionsListFromReducer} />
    </Box>
  );
};

export default PrescriptionsPage;
