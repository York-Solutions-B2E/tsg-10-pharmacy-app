import { Navigate, Route, Routes } from 'react-router-dom';
import InventoryPage from './pages/MedicationsPage';
import OrdersPage from './pages/OrdersPage';
import PrescriptionsPage from './pages/PrescriptionsPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/prescriptions" element={<PrescriptionsPage />} />
      <Route path="/inventory" element={<InventoryPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/*" element={<Navigate to="/prescriptions" replace />} />
    </Routes>
  );
};

export default AppRouter;
