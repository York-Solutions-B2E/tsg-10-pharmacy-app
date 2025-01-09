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

  const loadDataOnMount = async () => {
    const getAllOrdersResponse = await getAllOrders();
    const getAllMedicationsResponse = await getAllMedications();

    if (getAllOrdersResponse.status !== 200) {
      console.error(
        'Error in getting orders list:',
        getAllOrdersResponse.body.message
      );
      return;
    }

    updateOrders(getAllOrdersResponse.body);

    if (getAllMedicationsResponse.status !== 200) {
      console.error(
        'Error in getting medications list:',
        getAllMedicationsResponse.body.message
      );
      return;
    }

    updateMedications(getAllMedicationsResponse.body);
  };

  useEffect(() => {
    loadDataOnMount();
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
