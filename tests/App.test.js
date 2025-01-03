import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../src/App';

describe('App', () => {
  it('renders Hello heading', () => {
    jest.spyOn(console, 'warn').mockImplementation();
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText('Hello')).toBeInTheDocument();
    console.warn.mockRestore();
  });
});
