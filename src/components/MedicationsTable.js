import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import React from 'react';
import StatusChip from './data-display/StatusChip';

const MedicationsTable = ({
  medications: medicationsList,
  editMedicine,
  orderMore,
}) => {
  console.log('medications:', medicationsList);

  const columns = [
    { field: 'name', headerName: 'Medication', width: 150 },
    { field: 'code', headerName: 'Code', width: 100 },
    { field: 'stockQuantity', headerName: 'Count', width: 100 },
    {
      field: 'nextDelivery',
      headerName: 'Next Delivery',
      width: 150,
      valueFormatter: (param) =>
        param ? dayjs(param).format('MMM DD, YYYY') : '',
    },
    {
      field: 'sufficientStock',
      headerName: 'Sufficiency',
      width: 150,
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
      width: 250,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        // console.log(params.row),
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
            onClick={() => orderMore(params.row.medicine)}
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
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
};

export default MedicationsTable;
