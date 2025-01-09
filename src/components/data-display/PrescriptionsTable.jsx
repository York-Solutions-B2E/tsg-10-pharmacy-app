import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import {
  fillPrescription,
  getAllActivePrescriptions,
} from '../../API/PrescriptionAPI';
import { useAppContext } from '../../HOC/AppContext';
import ButtonWithText from '../buttons/ButtonWithText';
import StatusChip from './StatusChip';

const PrescriptionsTable = ({ prescriptionsList }) => {
  const { updatePrescriptions, navigate } = useAppContext();

  // ******** Click Handlers
  const handleClickFillPrescription = async (prescription) => {
    const fillPrescriptionResponse = await fillPrescription(prescription);

    // If the fill prescription call is successful, refresh the prescriptions list
    if (fillPrescriptionResponse.status === 200) {
      const refreshStateResponse = await getAllActivePrescriptions();

      console.log('Refresh State Response:', refreshStateResponse);
      
      // If the refresh call is successful, update the prescriptions list
      if (refreshStateResponse?.status === 200) {
        updatePrescriptions(refreshStateResponse.body);
      }

      // If the refresh call is not successful, log the error
      if (refreshStateResponse?.status !== 200) {
        console.error(
          'Error refreshing prescriptions list:',
          refreshStateResponse.body?.message
        );
      }
    }

    // If the fill prescription call is not successful, log the error
    if (fillPrescriptionResponse.status !== 200) {
      console.error(
        'Fill Prescription error:',
        fillPrescriptionResponse.body?.message
      );
    }
  };

  const handleClickOrderMore = (prescription) => {
    console.log(
      'Order More Medicine, medicine id is:',
      prescription.medicine.id
    );

    navigate('/orders', { state: prescription.medicine });
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
    // If the prescription is PICKED_UP, there is no action to take
    if (prescription.status === 'PICKED_UP') {
      return [];
    }

    // If the prescription is FILLED, the only action is to mark it as picked up
    if (prescription.status === 'FILLED') {
      return [MarkPickedUpButton(prescription)];
    }

    // If the prescription NEW, OUT_OF_STOCK, AWAITING_SHIPMENT, STOCK_RECEIVED
    // The actions are Fill Prescription and Order More
    // buttons are disabled based on the status
    return [
      FillPrescriptionButton(prescription),
      OrderMoreButton(prescription),
    ];
  }; // END ******** GridActionButtons

  // ******** Columns headers and GridColDef
  const columns = [
    {
      field: 'prescriptionNumber',
      headerName: 'Prescription',
      type: 'string',
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
      field: 'medicine.code',
      headerName: 'Med Code',
      width: 100,
      renderCell: (params) => {
        return params.row.medicine.code;
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
  ]; // END ******** Columns headers and data

  // Error Row Styling
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

export default PrescriptionsTable;
