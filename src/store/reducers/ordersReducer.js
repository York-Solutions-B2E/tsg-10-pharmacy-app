import { createSlice } from '@reduxjs/toolkit';
import { getAllOrders } from '../actions/ordersActions';

const initialState = {
  ordersList: [],
  isOrderListLoading: false,
  orderListErrorMessage: null,
};

const ordersSlice = createSlice({
  name: 'ordersStateSlice',
  initialState: initialState,

  reducers: {
    resetOrdersState: () => initialState,
  },
  extraReducers: (builder) => {
    getAllOrdersCases(builder);
  },
});

const getAllOrdersCases = (builder) => {
  builder.addCase(getAllOrders.pending, (state, action) => {
    // Clears any previous errors and set loading
    state.orderListErrorMessage = null;
    state.isOrderListLoading = true;
  });

  builder.addCase(getAllOrders.fulfilled, (state, action) => {
    // Set the lists of specializations and doctors options
    console.log(
      'ordersSlice. getAllOrders.fulfilled. action.payload:',
      action.payload
    );
    state.ordersList = action.payload;

    // Clear any previous errors and set loading to false
    state.orderListErrorMessage = null;
    state.isOrderListLoading = false;
  });

  builder.addCase(getAllOrders.rejected, (state, action) => {
    console.log('ordersSlice. getAllOrders.rejected. action:', action);

    state.orderListErrorMessage = action.payload;
    state.isOrderListLoading = false;
  });
};

// export any actions in the reducer (not counting extraReducers)
export const { resetOrdersState } = ordersSlice.actions;

// export the reducer
export default ordersSlice.reducer;
