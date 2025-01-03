import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import ButtonWithText from '../buttons/ButtonWithText';
import StatusChip from './StatusChip';

const PrescriptionsDataGrid = ({ prescriptionsList }) => {
  // const navigate = useNavigate();

  // ******** Click Handlers
  const handleClickFillPrescription = (prescription) => {
    console.log('Fill Prescription, id is:', prescription.id);
    // TODO: Implement the fill prescription api call, api function takes full prescription object
  };

  const handleClickOrderMore = (prescription) => {
    console.log(
      'Order More Medicine, medicine id is:',
      prescription.medicine.id
    );

    // navigate('/orders', { state: prescription.medicine });
    // TODO: Navigate to the order more page with the medicine id
  };

  const handleClickMarkPickedUp = (prescription) => {
    console.log('Prescription Picked up, id is:', prescription.id);
    // TODO: Implement the picked up api call, api function takes full prescription object
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
        buttonText={'Mark Picked Up'}
      />
    );
  };

  // Renders the action buttons based on the prescription status
  const renderActionButtonsForPrescriptions = (prescription) => {
    const prescriptionStatus = prescription.status;

    // If the prescription is PICKED_UP, there is no action to take
    if (prescriptionStatus === 'PICKED_UP') {
      return [];
    }

    // If the prescription is FILLED, the only action is to mark it as picked up
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
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.75,
      width: 100,
      minWidth: 150,
      renderCell: (params) => {
        return <StatusChip status={params.row.status} />;
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
