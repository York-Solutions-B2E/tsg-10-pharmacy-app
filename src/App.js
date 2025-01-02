import CssBaseline from '@mui/material/CssBaseline';
import NavBar from './components/NavBar';
import AppRouter from './AppRouter';

const App = () => {
  return (
    <>
      <CssBaseline />
      <NavBar />
      <h1>Hello</h1>
      <AppRouter />
    </>
  );
};

export default App;
