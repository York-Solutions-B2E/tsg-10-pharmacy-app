import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMedications } from '../API/MedicationAPI';
import { getAllOrders } from '../API/OrdersAPI';
import OrdersTable from '../components/data-display/OrdersTable';
import OrderForm from '../components/forms/OrderForm';
import { useAppContext } from '../HOC/AppContext';
import { getAllOrders as getAllOrdersAction } from '../store/actions/ordersActions';

const OrdersPage = () => {
  const { ordersList, medicationsList, updateOrders, updateMedications } =
    useAppContext();

  const dispatch = useDispatch();

  const ordersListFromReducer = useSelector((state) => state.orders.ordersList);
  const orderListErrorMessage = useSelector(
    (state) => state.orders.orderListErrorMessage
  );
  const isOrderListLoading = useSelector(
    (state) => state.orders.isOrderListLoading
  );

  console.log('ordersListFromReducer:', ordersListFromReducer);
  console.log('orderListErrorMessage:', orderListErrorMessage);
  console.log('isOrderListLoading:', isOrderListLoading);

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
    dispatch(getAllOrdersAction());
    // loadDataOnMount();
  }, []);

  const orderPageStyling = {
    padding: '30px',
  };



  return (
    <Box sx={orderPageStyling} data-testid="orders-page">
      <Typography
        variant="h4"
        sx={{ textAlign: 'center', marginBottom: '40px' }}
      >
        Medication Orders
      </Typography>
      <OrderForm inventoryList={medicationsList} />
      <OrdersTable ordersList={ordersListFromReducer} />
    </Box>
  );
};

export default OrdersPage;
