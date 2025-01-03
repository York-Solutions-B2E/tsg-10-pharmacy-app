import { render, screen, cleanup } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import NavBar from '../../src/components/NavBar';

describe('NavBar', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render', () => {
    render(<NavBar />);

    expect(screen.getByText(/tsg pharmacy/i)).toBeInTheDocument();
  });

  it('should navigate to prescriptions page', async () => {
    const mockNavigate = jest.fn();
    render(<NavBar navigate={mockNavigate} />);

    const prescriptionButton = screen.getByText(/prescriptions/i);
    expect(prescriptionButton).toBeInTheDocument();

    await userEvent.click(prescriptionButton);
    expect(mockNavigate).toHaveBeenCalledWith('/prescriptions');
  });

  it('should navigate to inventory page', async () => {
    const mockNavigate = jest.fn();
    render(<NavBar navigate={mockNavigate} />);

    const inventoryButton = screen.getByText(/inventory/i);
    expect(inventoryButton).toBeInTheDocument();

    await userEvent.click(inventoryButton);
    expect(mockNavigate).toHaveBeenCalledWith('/inventory');
  });

  it('should navigate to orders page', async () => {
    const mockNavigate = jest.fn();
    render(<NavBar navigate={mockNavigate} />);

    const ordersButton = screen.getByText(/orders/i);
    expect(ordersButton).toBeInTheDocument();

    await userEvent.click(ordersButton);
    expect(mockNavigate).toHaveBeenCalledWith('/orders');
  });
});
