import { useAppContext } from './HOC/AppContext';
import NavBar from './components/NavBar';
import AppRouter from './AppRouter';

const App = () => {
  const { navigate } = useAppContext();
  return (
    <>
      <NavBar navigate={navigate} />
      <h1>Hello</h1>
      <AppRouter />
    </>
  );
};

export default App;
