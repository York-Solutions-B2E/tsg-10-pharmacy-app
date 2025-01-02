import React from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

const MedicationsTable = ({ medications, editMedicine, orderMore }) => {
  const columns = [
    { field: 'name', headerName: 'Medication', width: 150 },
    { field: 'code', headerName: 'Code', width: 100 },
    { field: 'count', headerName: 'Count', width: 100 },
    { field: 'nextDelivery', headerName: 'Next Delivery', width: 150,
      valueFormatter: (param) => new Date(param).toLocaleDateString()
    },
    { 
      field: 'sufficiency', 
      headerName: 'Sufficiency', 
      width: 150,
      renderCell: (params) => {
        let backgroundColor;
        let textColor;
        switch (params.value) {
          case 'In Stock':
            backgroundColor = 'lightgreen';
            textColor = 'darkgreen';
            break;
          case 'Insufficient Stock':
            backgroundColor = '#ffcccb'; // light red
            textColor = 'darkred';
            break;
          case 'On Order':
            backgroundColor = '#ffdab9'; // light orange
            textColor = 'darkorange';
            break;
          default:
            backgroundColor = 'grey';
        }
        return (
          <Box
            sx={{
              display: 'inline-block',
              padding: '2px 8px',
              borderRadius: '12px',
              backgroundColor: backgroundColor,
              color: textColor,
              textAlign: 'center',
              lineHeight: '2',
            }}
          >
            {params.value}
          </Box>
        );
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
            onClick={() => editMedicine(params.id)}
            style={{
              background: 'linear-gradient(to right, #1e3c72, #2a5298)',
              color: 'white',
              borderRadius: '12px',
              padding: '8px 16px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            + Add Stock
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
