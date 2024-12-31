import { Route, Routes } from 'react-router-dom';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/prescriptions" element={<div>prescriptions</div>} />
      <Route path="/inventory" element={<div>inventory</div>} />
      <Route path="/orders" element={<div>orders</div>} />
      <Route path="/*" element={<div>prescriptions</div>} />
    </Routes>
  );
};

export default AppRouter;
