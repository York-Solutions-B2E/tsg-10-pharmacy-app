import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AppProvider from './HOC/AppContext';
import { SnackbarProvider } from 'notistack';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <SnackbarProvider maxSnack={3}>
          <App />
        </SnackbarProvider>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
