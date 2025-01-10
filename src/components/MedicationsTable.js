import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import React from 'react';
import StatusChip from './data-display/StatusChip';
import { Box } from '@mui/material';

const MedicationsTable = ({
  medications: medicationsList,
  editMedicine,
  orderMore,
}) => {
  const columns = [
    { field: 'name', headerName: 'Medication', minWidth: 140, flex: 1 },
    { field: 'code', headerName: 'Code', minWidth: 120, flex: 1 },
    { field: 'stockQuantity', headerName: 'Stock Count', minWidth: 80, flex: 1 },
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
      maxWidth: 270,
      minWidth: 240,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box>
          <button
            onClick={() => editMedicine(params.row)}
            style={{
              background: 'linear-gradient(to right, #1e3c72, #2a5298)',
              color: 'white',
              borderRadius: '12px',
              padding: '8px 16px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            + Edit Stock
          </button>
          &nbsp;&nbsp;
          <button
            onClick={() => orderMore(params.row)}
            style={{
              background: 'linear-gradient(to right, #1e3c72, #2a5298)',
              color: 'white',
              borderRadius: '12px',
              padding: '8px 16px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Order More
          </button>
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

  return (
    <Box sx={{ height: 650, maxWidth: '60%', margin: 'auto' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
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
