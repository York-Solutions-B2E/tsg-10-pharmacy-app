import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import ButtonWithText from '../buttons/ButtonWithText';
import StatusChip from './StatusChip';

const OrdersDataGrid = ({ prescriptionsList }) => {
  // const navigate = useNavigate();

  // ******** Click Handlers

  const handleClickOrderReceived = (order) => {
    console.log('Order Received, id is:', order.id);
    // TODO: Implement the order received api call, api function takes full order object
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
        return new Date(params.row.deliveryDate).toLocaleDateString('en-US');
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
        rows={prescriptionsList}
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
        // slots={{ noRowsOverlay: CustomNoRowsOverlay }}
      />
    </Box>
  );
};

export default OrdersDataGrid;
