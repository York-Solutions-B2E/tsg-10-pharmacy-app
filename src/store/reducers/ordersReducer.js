import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOrderListLoading: false,
  ordersList: ["this", "is", "a", "test"],
  orderListErrorMessage: null,
};

const ordersSlice = createSlice({
  name: 'ordersStateSlice',
  initialState: initialState,

  reducers: {
    resetOrdersState: () => initialState,
  },
  //   extraReducers: (builder) => {
  //     getSpecializationsAndDoctorsCases(builder);
  //     getDoctorAvailabilityCases(builder);
  //   },
});

// const getSpecializationsAndDoctorsCases = (builder: ActionReducerMapBuilder<any>) => {
//   builder.addCase(getSpecializationsAndDoctors.pending, (state, action) => {
//     // Clears any previous errors and set loading
//     state.errorMessage = null;
//     state.isLoading = true;
//   });
//   builder.addCase(getSpecializationsAndDoctors.fulfilled, (state, action) => {
//     // Set the lists of specializations and doctors options
//     state.availableSpecializations = action.payload.specializations;
//     state.availableDoctors = action.payload.doctors;

//     // Clear any previous errors and set loading to false
//     state.errorMessage = null;
//     state.isLoading = false;
//   });
//   builder.addCase(getSpecializationsAndDoctors.rejected, (state, action) => {
//     state.errorMessage = action.payload;
//     state.isLoading = false;
//   });
// };

// const getDoctorAvailabilityCases = (builder: ActionReducerMapBuilder<any>) => {
//   builder.addCase(getDoctorAvailability.pending, (state, action) => {
//     // Clears any previous errors and set loading
//     state.errorMessage = null;
//     state.isLoading = true;
//   });
//   builder.addCase(getDoctorAvailability.fulfilled, (state, action) => {
//     // Set the selected doctor's availability
//     state.selectedDoctorAvailability = action.payload;
//     // Clear any previous errors and set loading to false
//     state.errorMessage = null;
//     state.isLoading = false;
//   });
//   builder.addCase(getDoctorAvailability.rejected, (state, action) => {
//     state.errorMessage = action.payload;
//     state.isLoading = false;
//   });
// };

// export any actions in the reducer (not counting extraReducers)



export const { resetOrdersState, clearOrdersErrorMessages } = ordersSlice.actions;

// export the reducer
export default ordersSlice.reducer;
