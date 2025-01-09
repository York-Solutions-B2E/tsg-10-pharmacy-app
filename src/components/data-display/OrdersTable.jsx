import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { getAllOrders, markOrderReceived } from '../../API/OrdersAPI';
import { useAppContext } from '../../HOC/AppContext';
import ButtonWithText from '../buttons/ButtonWithText';
import StatusChip from './StatusChip';

const OrdersTable = ({ ordersList }) => {
  const { updateOrders } = useAppContext();

  // ******** Click Handlers
  const handleClickOrderReceived = async (order) => {
    const orderRequest = {
      id: order.id,
      inventoryId: order.inventory.id,
      quantity: order.quantity,
      deliveryDate: dayjs(order.deliveryDate),
      status: order.status,
    };

    const markOrderReceivedResult = await markOrderReceived(orderRequest);

    // If the response is not 200, log the error
    if (markOrderReceivedResult.status !== 200) {
      // TODO: Show error message
      console.error(
        'Error in marking order received:',
        markOrderReceivedResult.body?.message
      );
      return;
    }

    // If the response is 200, refresh the orders list
    const refreshOrdersList = await getAllOrders();

    // catch any errors in getting the orders list
    if (refreshOrdersList.status !== 200) {
      console.error(
        'Error in getting orders list:',
        refreshOrdersList.body.message
      );
      return;
    }

    updateOrders(refreshOrdersList.body);
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
