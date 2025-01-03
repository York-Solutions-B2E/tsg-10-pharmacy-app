import { Navigate, Route, Routes } from 'react-router-dom';
import PrescriptionsPage from './pages/PrescriptionsPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/prescriptions" element={<PrescriptionsPage />} />
      <Route path="/inventory" element={<div>inventory</div>} />
      <Route path="/orders" element={<div>orders</div>} />
      <Route path="/*" element={<Navigate to="/prescriptions" replace />} />
    </Routes>
  );
};

export default AppRouter;
