import { Box } from '@mui/material';
import ordersList from '../../dummy-data/order-list.json';
import OrdersDataGrid from '../components/data-display/OrdersDataGrid';

const OrdersPage = () => {
  const appointmentPageStyling = {
    padding: '30px 30px',
  };

  return (
    <Box sx={appointmentPageStyling}>
      <h1>OrdersPage</h1>
      <OrdersDataGrid prescriptionsList={ordersList} />
    </Box>
  );
};

export default OrdersPage;
