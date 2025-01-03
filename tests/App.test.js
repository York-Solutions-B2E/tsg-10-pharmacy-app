import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../src/App';

describe('App', () => {
  it('should render the App Component', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const navBar = screen.getByTestId('navbar-test');
    expect(navBar).toBeInTheDocument();
  });
});
