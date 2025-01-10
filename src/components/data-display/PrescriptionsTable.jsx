import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import {
  fillPrescription,
  getAllActivePrescriptions,
  markPickedUp,
} from '../../API/PrescriptionAPI';
import { useAppContext } from '../../HOC/AppContext';
import ButtonWithText from '../buttons/ButtonWithText';
import ConfirmActionModal from '../ConfirmActionModal';
import StatusChip from './StatusChip';

const PrescriptionsTable = ({ prescriptionsList }) => {
  const { updatePrescriptions, navigate } = useAppContext();
  const [openModal, setOpenModal] = useState(false);
  const [outOfStockPrescription, setOutOfStockPrescription] =
    useState(prescriptionsList);

  // ******** Click Handlers
  const handleClickFillPrescription = async (prescription) => {
    const fillPrescriptionResponse = await fillPrescription(prescription);

    // If the fill prescription call is not successful, log the error
    if (fillPrescriptionResponse.status !== 200) {
      console.error(
        'Fill Prescription error:',
        fillPrescriptionResponse.body?.message
      );

      if (
        fillPrescriptionResponse.body?.message === 'Cannot reduce stock below 0'
      ) {
        setOpenModal(true);
        setOutOfStockPrescription(prescription);
        return;
      }
    }

    // If the fill prescription call is successful, refresh the prescriptions list
    const refreshStateResponse = await getAllActivePrescriptions();

    // If the refresh call is not successful, log the error
    if (refreshStateResponse?.status !== 200) {
      console.error(
        'Error refreshing prescriptions list:',
        refreshStateResponse.body?.message
      );
    }

    // If the refresh call is successful, update the prescriptions list
    updatePrescriptions(refreshStateResponse.body);
  };

  const handleClickOrderMore = (prescription) => {
    navigate('/orders', { state: prescription.medicine });
  };

  const handleClickMarkPickedUp = async (prescription) => {
    // Call the API to mark the prescription as picked up
    const pickedUpResponse = await markPickedUp(prescription);

    // If the call is successful, refresh the prescriptions list
    if (pickedUpResponse.status === 200) {
      const refreshStateResponse = await getAllActivePrescriptions();

      if (refreshStateResponse?.status === 200) {
        updatePrescriptions(refreshStateResponse.body);
      }

      if (refreshStateResponse?.status !== 200) {
        console.error(
          'Error refreshing prescriptions list:',
          refreshStateResponse.body?.message
        );
      }
    }

    // If the call is not successful, log the error
    if (pickedUpResponse.status !== 200) {
      console.error('Marked Pickup failed!', pickedUpResponse.body?.message);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleConfirmModal = () => {
    handleClickOrderMore(outOfStockPrescription);
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
      flex: 0.75,
      minWidth: 140,
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'patientId',
      headerName: 'Patient ID',
      minWidth: 140,
      flex: 0.75,
    },
    {
      field: 'medicine.name',
      headerName: 'Medicine',
      minWidth: 140,
      flex: 0.75,
      renderCell: (params) => {
        return params.row.medicine.name;
      },
    },
    {
      field: 'medicine.code',
      headerName: 'Med Code',
      minWidth: 120,
      flex: 0.75,
      renderCell: (params) => {
        return params.row.medicine.code;
      },
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      minWidth: 80,
    },
    {
      field: 'instructions',
      flex: 1,
      width: 140,
      headerName: 'Instructions',
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
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
      maxWidth: 270,
      minWidth: 240,
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
    }
  };

  // ******** RETURN
  return (
    <Box sx={{ height: 700, maxWidth: '80%', margin: 'auto' }}>
      <ConfirmActionModal
        color={'primary'}
        title={'Low Stock!'}
        message={
          'The stock for this medicine is below the minimum required. Would you like to order more?'
        }
        open={openModal}
        onDismiss={handleCloseModal}
        onConfirmAction={handleConfirmModal}
        confirmButtonText={'Order More'}
      />
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
