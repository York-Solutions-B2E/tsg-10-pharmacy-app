import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import dayjs from 'dayjs';
import StatusChip from './data-display/StatusChip';

const MedicationsTable = ({ medications, editMedicine, orderMore }) => {
  const columns = [
    { field: 'name', headerName: 'Medication', width: 150 },
    { field: 'code', headerName: 'Code', width: 100 },
    { field: 'count', headerName: 'Count', width: 100 },
    {
      field: 'nextDelivery',
      headerName: 'Next Delivery',
      width: 150,
      valueFormatter: (param) => dayjs(param).format('MMM DD, YYYY'),
    },
    {
      field: 'sufficiency',
      headerName: 'Sufficiency',
      width: 150,
      renderCell: (params) => {
        return <StatusChip status={params.row.sufficiency} />;
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 250,
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
            onClick={() => orderMore(params.id)}
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

  const rows = medications.map((medication) => ({
    id: medication.id,
    name: medication.name,
    code: medication.code,
    count: medication.count,
    nextDelivery: medication.nextDelivery,
    sufficiency: medication.sufficiency,
  }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
};

export default MedicationsTable;
