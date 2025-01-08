import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import ButtonWithText from '../buttons/ButtonWithText';
import StatusChip from './StatusChip';
import { markOrderReceived } from '../../API/OrdersAPI';
import { getAllOrders } from '../../API/OrdersAPI';
import { useAppContext } from '../../HOC/AppContext';

const OrdersTable = ({ ordersList }) => {
  const { updateOrders } = useAppContext();
  // const navigate = useNavigate();

  // ******** Click Handlers
  const handleClickOrderReceived = async (order) => {
    console.log('Order:', order);

    const orderRequest = {
      id: order.id,
      inventoryId: order.inventory.id,
      quantity: order.quantity,
      deliveryDate: dayjs(order.deliveryDate),
      status: order.status,
    };
    console.log('Order Request:', orderRequest);

    // TODO: Implement the order received api call, api function takes full order object
    const response = await markOrderReceived(orderRequest);

    if (response.status === 200) {
      // TODO: Refresh the orders list
      console.log('Order Marked Received:', response);
      const refreshOrdersList = await getAllOrders();
      console.log('Refresh Orders List:', refreshOrdersList);
      updateOrders(refreshOrdersList.body);
    }

    if (response.status !== 200) {
      // TODO: Show error message
      console.log('Error in marking order received');
    }
  };
  // END ******** click handlers

  // ******** Columns headers and GridColDef
  const columns = [
    {
      field: 'medicine.name',
      headerName: 'Medicine',
      flex: 1,
      width: 140,
      renderCell: (params) => {
        return params.row.inventory.medicine.name;
      },
    },
    {
      field: 'medicine.code',
      headerName: 'Med Code',
      flex: 0.75,
      width: 100,
      renderCell: (params) => {
        return params.row.inventory.medicine.code;
      },
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      flex: 0.75,
      width: 100,
    },
    {
      field: 'deliveryDate',
      headerName: 'Delivery Date',
      flex: 1,
      width: 100,
      renderCell: (params) => {
        return dayjs(params.row.deliveryDate).format('MMM DD, YYYY');
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.75,
      width: 60,
      renderCell: (params) => {
        return <StatusChip status={params.row.status} />;
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex: 1,
      maxWidth: 200,
      minWidth: 220,
      cellClassName: 'actions',
      getActions: (params) => {
        const order = params.row;

        if (order.status === 'RECEIVED') {
          return [];
        }

        return [
          <ButtonWithText
            onClick={() => {
              handleClickOrderReceived(order);
            }}
            buttonText={'Mark Received'}
          />,
        ];
      },
    },
  ];
  // END ******** Columns headers and data

  // ******** RETURN
  return (
    <Box sx={{ height: 700, margin: 'auto', maxWidth: '800px' }}>
      <DataGrid
        rows={ordersList}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 15,
            },
          },
        }}
        pageSizeOptions={[15, 30]}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default OrdersTable;
