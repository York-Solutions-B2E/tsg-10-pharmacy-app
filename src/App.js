import { useNavigate } from 'react-router-dom';
import AppRouter from './AppRouter';
import NavBar from './components/NavBar';

const App = () => {
  const navigate = useNavigate();
  return (
    <>
      <NavBar navigate={navigate} />
      <AppRouter />
    </>
  );
};

export default App;
