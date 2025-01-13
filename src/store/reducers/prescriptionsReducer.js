import { createSlice } from '@reduxjs/toolkit';
import { getAllActivePrescriptions } from '../actions/prescriptionsActions';

const initialState = {
  isPrescriptionsListLoading: false,
  prescriptionsList: [],
  prescriptionListErrorMessage: null,
};

const prescriptionsSlice = createSlice({
  name: 'prescriptionsStateSlice',
  initialState: initialState,

  reducers: {
    resetPrescriptionsState: () => initialState,
  },
  extraReducers: (builder) => {
    getAllActivePrescriptionsCases(builder);
  },
});

const getAllActivePrescriptionsCases = (builder) => {
  builder.addCase(getAllActivePrescriptions.pending, (state, action) => {
    // Clears any previous errors and set loading
    state.prescriptionListErrorMessage = null;
    state.isPrescriptionsListLoading = true;
  });

  builder.addCase(getAllActivePrescriptions.fulfilled, (state, action) => {
    console.log(
      'prescriptionsSlice. getAllActivePrescriptions.fulfilled. action.payload:',
      action.payload
    );
    state.ordersList = action.payload;

    // Clear any previous errors and set loading to false
    state.prescriptionListErrorMessage = null;
    state.isPrescriptionsListLoading = false;
  });

  builder.addCase(getAllActivePrescriptions.rejected, (state, action) => {
    console.log(
      'prescriptionsSlice. getAllActivePrescriptions.rejected. action:',
      action
    );

    state.prescriptionListErrorMessage = action.payload?.message;
    state.isPrescriptionsListLoading = false;
  });
};

// export any actions in the reducer (not counting extraReducers)
export const { resetPrescriptionsState } = prescriptionsSlice.actions;

// export the reducer
export default prescriptionsSlice.reducer;
