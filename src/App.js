import AppRouter from './AppRouter';
import NavBar from './components/NavBar';
import { useAppContext } from './HOC/AppContext';

const App = () => {
  const { navigate } = useAppContext();
  return (
    <>
      <NavBar navigate={navigate} />
      <AppRouter />
    </>
  );
};

export default App;
