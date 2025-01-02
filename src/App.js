import { BrowserRouter } from 'react-router-dom';
import AppRouter from './AppRouter';

const App = () => {
  return (
    <>
      <h1>Hello</h1>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  );
};

export default App;
