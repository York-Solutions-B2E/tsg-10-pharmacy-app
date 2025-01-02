import { useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import AppRouter from './AppRouter';

const App = () => {
  const navigate = useNavigate();
  return (
    <>
      <NavBar navigate={navigate} />
      <h1>Hello</h1>
      <AppRouter />
    </>
  );
};

export default App;
