import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import * as appContext from '../src/HOC/AppContext';
import App from '../src/App';

describe('App', () => {
  beforeAll(() => {
    jest
      .spyOn(appContext, 'useAppContext')
      .mockImplementation(() => ({ navigate: 'navigate' }));

    jest.spyOn(console, 'warn').mockImplementation();
  });

  afterAll(() => {
    appContext.useAppContext.mockRestore();
    console.warn.mockRestore();
  });

  afterEach(() => {
    appContext.useAppContext.mockReset();
  });

  it('should render the App Component', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const app = screen.getByTestId('app-test-id');
    expect(app).toBeInTheDocument();
  });
});
