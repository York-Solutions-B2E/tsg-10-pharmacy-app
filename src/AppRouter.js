import { Route, Routes, Navigate } from 'react-router-dom';
import InventoryPage from './pages/MedicationsPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/prescriptions" element={<div>prescriptions</div>} />
      <Route path="/inventory" element={<InventoryPage />} />
      <Route path="/orders" element={<div>orders</div>} />
      <Route path="/*" element={<Navigate to="/prescriptions" replace />} />
    </Routes>
  );
};

export default AppRouter;
