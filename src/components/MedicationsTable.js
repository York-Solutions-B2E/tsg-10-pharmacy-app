import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import React from 'react';
import ButtonWithText from '../components/buttons/ButtonWithText';
import StatusChip from './data-display/StatusChip';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  rowSufficientStock: {},
  rowInsufficientStock: {
    backgroundColor: '#f0d0d0', // Light red for insufficient stock
  },
});


const MedicationsTable = ({ medicationsList, editMedicine, orderMore }) => {
    const classes = useStyles();

  const columns = [
    { field: 'name', headerName: 'Medication', minWidth: 140, flex: 1 },
    { field: 'code', headerName: 'Code', minWidth: 120, flex: 1 },
    {
      field: 'stockQuantity',
      headerName: 'Stock Count',
      minWidth: 80,
      flex: 1,
    },
    {
      field: 'nextDelivery',
      headerName: 'Next Delivery',
      minWidth: 150,
      flex: 1,
      valueFormatter: (param) =>
        param ? dayjs(param).format('MMM DD, YYYY') : '',
    },
    {
      field: 'sufficientStock',
      headerName: 'Sufficiency',
      minWidth: 150,
      renderCell: (params) => {
        if (params.row.sufficientStock) {
          return <StatusChip status={'In Stock'} color="success" />;
        }

        if (!params.row.sufficientStock && !params.row.nextDelivery) {
          return <StatusChip status={'OUT_OF_STOCK'} />;
        }

        if (!params.row.sufficientStock && params.row.nextDelivery) {
          return <StatusChip status={'ORDERED'} />;
        }
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',

      maxWidth: 330,
      minWidth: 290,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <ButtonWithText
            onClick={() => {
              editMedicine(params.row);
            }}
            toolTipMessage="update stock count"
            color={'primary'}
            buttonText={'Edit Stock'}
          />
          &nbsp;&nbsp;
          <ButtonWithText
            onClick={() => {
              orderMore(params.row);
            }}
            color={'primary'}
            buttonText={'Order More'}
          />
        </Box>
      ),
    },
  ];

  const rows = medicationsList.map((inventoryItem) => ({
    id: inventoryItem.id,
    medicineId: inventoryItem.medicine.id,
    name: inventoryItem.medicine.name,
    code: inventoryItem.medicine.code,
    stockQuantity: inventoryItem.stockQuantity,
    nextDelivery: inventoryItem.deliveryDate,
    sufficientStock: inventoryItem.sufficientStock,
  }));

  const getRowClassName = (params) => {
    return params.row.sufficientStock
      ? classes.rowSufficientStock
      : classes.rowInsufficientStock;
  };

  return (
    <Box sx={{ height: 650, maxWidth: '75%', margin: 'auto' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        getRowClassName={getRowClassName}
        initialState={{
          sorting: {
            sortModel: [{ field: 'name', sort: 'asc' }],
          },
        }}
      />
    </Box>
  );
};

export default MedicationsTable;
