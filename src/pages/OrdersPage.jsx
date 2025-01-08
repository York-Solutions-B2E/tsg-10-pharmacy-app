import { Box } from '@mui/material';
import { useEffect } from 'react';
import { getAllMedications } from '../API/MedicationAPI';
import { getAllOrders } from '../API/OrdersAPI';
import OrdersTable from '../components/data-display/OrdersTable';
import OrderForm from '../components/forms/OrderForm';
import { useAppContext } from '../HOC/AppContext';

const OrdersPage = () => {
  const { ordersList, medicationsList, updateOrders, updateMedications } =
    useAppContext();

  useEffect(() => {
    getAllOrders()
      .then((orders) => {
        updateOrders(orders.body);
      })
      .catch((error) => {
        console.error(error);
      });

    getAllMedications()
      .then((medications) => {
        updateMedications(medications.body);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const orderPageStyling = {
    padding: '30px 30px',
  };

  return (
    <Box sx={orderPageStyling} data-testid="orders-page">
      <h1>OrdersPage</h1>
      <OrderForm inventoryList={medicationsList} />
      <OrdersTable ordersList={ordersList} />
    </Box>
  );
};

export default OrdersPage;
