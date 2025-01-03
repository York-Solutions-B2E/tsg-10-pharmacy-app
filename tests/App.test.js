import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import * as appContext from '../src/HOC/AppContext';
import App from '../src/App';

describe('App', () => {
  beforeAll(() => {
    jest
      .spyOn(appContext, 'useAppContext')
      .mockImplementation(() => ({ navigate: 'navigate' }));
  });

  afterAll(() => {
    appContext.useAppContext.mockRestore();
  });

  afterEach(() => {
    appContext.useAppContext.mockReset();
  });

  it('renders Hello heading', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
