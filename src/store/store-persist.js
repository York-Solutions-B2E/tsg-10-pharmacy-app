// Import redux tools
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';

// Import persist reducer tools
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

// Import reducers

// combine all reducers in store
const rootReducer = combineReducers({
  ordersReducer,
  inventoryReducer,
  prescriptionsReducer,
});

// // configure persistent store
// const persistentConfig = {
//   key: 'root',
//   storage: storage,
// };

// // create a persisted reducer
// const persistedReducer = persistReducer(persistentConfig, rootReducer);

// export store
export const store = configureStore({
  reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
});

export const persistor = persistStore(store);
