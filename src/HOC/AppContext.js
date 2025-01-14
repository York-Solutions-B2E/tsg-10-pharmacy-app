import { createContext, useCallback, useContext, useState } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { store } from '../store/store';

export const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [ordersList, setOrdersList] = useState([]);
  const [medicationsList, setMedicationsList] = useState([]);
  const [prescriptionsList, setPrescriptionsList] = useState([]);

  const updateOrders = useCallback((newOrders) => {
    setOrdersList(newOrders);
  }, []);

  const updateMedications = useCallback((newMedications) => {
    setMedicationsList(newMedications);
  }, []);

  const updatePrescriptions = useCallback((newPrescriptions) => {
    setPrescriptionsList(newPrescriptions);
  }, []);

  const contextValue = {
    navigate,
    location,
    dispatch,
    ordersList,
    medicationsList,
    prescriptionsList,
    updateOrders,
    updateMedications,
    updatePrescriptions,
  };

  return (
    <Provider store={store}>
      <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
    </Provider>
  );
};

export default AppProvider;
