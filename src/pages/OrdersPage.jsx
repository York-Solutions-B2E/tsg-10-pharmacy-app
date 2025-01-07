import { Box } from '@mui/material';
import inventoryList from '../../dummy-data/inventory-list.json';
import ordersList from '../../dummy-data/order-list.json';
import OrdersTable from '../components/data-display/OrdersTable';
import OrderForm from '../components/forms/OrderForm';

const OrdersPage = () => {
  const appointmentPageStyling = {
    padding: '30px 30px',
  };

  return (
    <Box sx={appointmentPageStyling} data-testid="orders-page">
      <h1>OrdersPage</h1>
      <OrderForm inventoryList={inventoryList} />
      <OrdersTable ordersList={ordersList} />
    </Box>
  );
};

export default OrdersPage;
