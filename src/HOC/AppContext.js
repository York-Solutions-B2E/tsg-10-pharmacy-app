import { createContext, useCallback, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

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
    ordersList,
    medicationsList,
    prescriptionsList,
    updateOrders,
    updateMedications,
    updatePrescriptions,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
