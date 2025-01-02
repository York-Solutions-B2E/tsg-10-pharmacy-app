import { Chip, Tooltip, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import prescriptionsList from '../../../dummy-data/prescription-list.json';
import ButtonWithText from '../buttons/ButtonWithText';

// ******** FUNCTION START
const PrescriptionsDataGrid = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(undefined);

  // ******** Click Handlers
  const handleClickFillPrescription = (prescription) => {
    console.log('Fill Prescription, id is:', prescription.id);
  };

  const handleClickOrderMore = (prescription) => {
    console.log('Order More, id is:', prescription.id);
  };

  const handleClickMarkPickedUp = (prescription) => {
    console.log('Picked up, id is:', prescription.id);
  };
  // END ******** click handlers

  // ******** GridActionButtons
  const FillPrescriptionButton = (prescription) => {
    let isDisabled = false;

    if (
      prescription.status === 'AWAITING_SHIPMENT' ||
      prescription.status === 'OUT_OF_STOCK'
    ) {
      isDisabled = true;
    }

    return (
      <ButtonWithText
        onClick={() => {
          handleClickFillPrescription(prescription);
        }}
        toolTipMessage="Fill this prescription"
        color={'success'}
        disabled={isDisabled}
        buttonText={'Fill'}
      />
    );
  };

  const OrderMoreButton = (prescription) => {
    let isDisabled = false;

    if (prescription.status === 'AWAITING_SHIPMENT') {
      isDisabled = true;
    }
    return (
      <ButtonWithText
        onClick={() => {
          handleClickOrderMore(prescription);
        }}
        toolTipMessage={'Order more of this medicine'}
        disabled={isDisabled}
        buttonText={'Order More'}
      />
    );
  };

  const MarkPickedUpButton = (prescription) => {
    return (
      <ButtonWithText
        onClick={() => {
          handleClickMarkPickedUp(prescription);
        }}
        buttonText={'Marked Picked Up'}
      />
    );
  };

  // NEW, OUT_OF_STOCK, AWAITING_SHIPMENT, STOCK_RECEIVED, FILLED, PICKED_UP, CANCELLED
  // -* STOCK_RECEIVED is for post Awaiting Shipment status (not new, but not yet filled)
  // -* CANCELLED theoretically will never be in the list, but it's here to show what the statuses are.
  const renderActionButtonsForPrescriptions = (prescription) => {
    const prescriptionStatus = prescription.status;

    // If the prescription is picked up, there is no action to take
    if (prescriptionStatus === 'PICKED_UP') {
      return [];
    }

    // If the prescription is filled, the only action is to mark it as picked up
    if (prescriptionStatus === 'FILLED') {
      return [MarkPickedUpButton(prescription)];
    }

    // If the prescription NEW, OUT_OF_STOCK, AWAITING_SHIPMENT, STOCK_RECEIVED
    // The actions are Fill Prescription and Order More
    // buttons are disabled based on the status
    return [
      FillPrescriptionButton(prescription),
      OrderMoreButton(prescription),
    ];
  };
  // END ******** GridActionButtons

  // ******** Status Badge
  const renderStatusBadge = (status) => {
    let color = '';
    let chipText = '';

    switch (status) {
      case 'NEW':
        color = 'success';
        chipText = 'New';
        break;
      case 'OUT_OF_STOCK':
        color = 'error';
        chipText = 'Out of Stock';
        break;
      case 'AWAITING_SHIPMENT':
        color = 'warning';
        chipText = 'Awaiting Shipment';
        break;
      case 'STOCK_RECEIVED':
        color = 'success';
        chipText = 'Stock Received';
        break;
      case 'FILLED':
        color = 'primary';
        chipText = 'Filled';
        break;
      case 'PICKED_UP':
        color = 'primary';
        chipText = 'Picked Up';
        break;
      case 'CANCELLED':
        color = 'error';
        chipText = 'Cancelled';
        break;
    }

    return <Chip label={chipText} color={color} variant="filled" />;
  };
  // END ******** Status Badge

  // ******** Columns headers and GridColDef
  const columns = [
    {
      field: 'prescriptionNumber',
      headerName: 'Prescription',
      type: 'number',
      width: 110,
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'patientId',
      headerName: 'Patient ID',
      width: 110,
    },
    {
      field: 'medicine.name',
      headerName: 'Medicine',
      width: 140,
      renderCell: (params) => {
        return params.row.medicine.name;
      },
    },
    {
      field: 'medicine.medCode',
      headerName: 'Med Code',
      width: 100,
      renderCell: (params) => {
        return params.row.medicine.medCode;
      },
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 100,
    },
    {
      field: 'instructions',
      flex: 1,
      headerName: 'Instructions',
      // width: 80,
      renderCell: (params) => {
        <Tooltip title={params.row.instructions}>
          <Typography>{params.row.instructions}</Typography>
        </Tooltip>;
        return params.row.instructions;
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.75,
      width: 100,
      renderCell: (params) => {
        return renderStatusBadge(params.row.status);
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex: 1,
      maxWidth: 240,
      minWidth: 220,
      cellClassName: 'actions',
      getActions: (params) => {
        const prescription = params.row;
        return renderActionButtonsForPrescriptions(prescription);
      },
    },
  ];
  // END ******** Columns headers and data

  // Row Styling
  const getRowClassName = (params) => {
    switch (params.row.status) {
      case 'OUT_OF_STOCK':
        return 'row-out-of-stock';
      // case 'AWAITING_SHIPMENT':
      //   return 'row-awaiting-shipment';
    }
  };

  // ******** RETURN
  return (
    <Box sx={{ height: 700, width: '100%' }}>
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
        getRowClassName={getRowClassName}
        pageSizeOptions={[15, 30]}
        disableRowSelectionOnClick
        // slots={{ noRowsOverlay: CustomNoRowsOverlay }}
      />
    </Box>
  );
};

export default PrescriptionsDataGrid;
