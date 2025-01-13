// Import redux tools
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';



// Import reducers
import ordersReducer from './reducers/ordersReducer';
// import inventoryReducer from './reducers/inventoryReducer';
// import prescriptionsReducer from './reducers/prescriptionsReducer';

// combine all reducers in store
const rootReducer = combineReducers({
  orders: ordersReducer,
  // inventory: inventoryReducer,
  // prescriptions: prescriptionsReducer,
});

// export store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),

});

