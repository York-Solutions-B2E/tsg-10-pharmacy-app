import { Box } from '@mui/material';
import ordersList from '../../dummy-data/order-list.json';
import OrdersTable from '../components/data-display/OrdersTable';

const OrdersPage = () => {
  const appointmentPageStyling = {
    padding: '30px 30px',
  };

  return (
    <Box sx={appointmentPageStyling} data-testid="orders-page">
      <h1>OrdersPage</h1>
      <OrdersTable ordersList={ordersList} />
    </Box>
  );
};

export default OrdersPage;
