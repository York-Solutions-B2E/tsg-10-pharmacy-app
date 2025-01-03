import AppRouter from './AppRouter';
import NavBar from './components/NavBar';
import { useAppContext } from './HOC/AppContext';

const App = () => {
  const { navigate } = useAppContext();
  return (
    <div data-testid="app-test-id"> 
      <NavBar navigate={navigate} />
      <AppRouter />
    </div>
  );
};

export default App;
