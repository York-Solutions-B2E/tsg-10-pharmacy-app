import { Route, Routes, Navigate } from 'react-router-dom';
import MedicationsPage from './pages/MedicationsPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/prescriptions" element={<div>prescriptions</div>} />
      <Route path="/inventory" element={<MedicationsPage />} />
      <Route path="/orders" element={<div>orders</div>} />
      <Route path="/*" element={<Navigate to="/prescriptions" replace />} />
    </Routes>
  );
};

export default AppRouter;
