import { Box } from '@mui/material';
import PrescriptionsTable from '../components/data-display/PrescriptionsTable';

const PrescriptionsPage = () => {
  const appointmentPageStyling = {
    padding: '30px 30px',
  };

  return (
    <Box sx={appointmentPageStyling} data-testid="prescriptions-page">
      <h1>PrescriptionsPage</h1>
      <PrescriptionsTable prescriptionsList={[]} />
    </Box>
  );
};

export default PrescriptionsPage;
