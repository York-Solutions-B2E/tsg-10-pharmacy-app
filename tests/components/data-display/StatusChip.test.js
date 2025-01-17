// import React from 'react';
import { render, screen } from '@testing-library/react';
import StatusChip from '../../../src/components/data-display/StatusChip';

describe('Test StatusChip', () => {
  it('should render New when NEW status is passed in', () => {
    render(<StatusChip status="NEW" />);
    const chip = screen.getByText('New');
    const chipWrapper = chip.closest('.MuiChip-root');

    expect(chip).toBeInTheDocument();
    expect(chipWrapper).toHaveClass('MuiChip-colorSuccess');
  });

  it('should render Out of Stock when OUT_OF_STOCK status is passed in', () => {
    render(<StatusChip status="OUT_OF_STOCK" />);
    const chip = screen.getByText('Out of Stock');
    const chipWrapper = chip.closest('.MuiChip-root');

    expect(chip).toBeInTheDocument();
    expect(chipWrapper).toHaveClass('MuiChip-colorError');
  });

  it('should render Awaiting Shipment when AWAITING_SHIPMENT status is passed in', () => {
    render(<StatusChip status="AWAITING_SHIPMENT" />);
    const chip = screen.getByText('Awaiting Shipment');
    const chipWrapper = chip.closest('.MuiChip-root');

    expect(chip).toBeInTheDocument();
    expect(chipWrapper).toHaveClass('MuiChip-colorWarning');
  });

  it('should render Stock Received when STOCK_RECEIVED status is passed in', () => {
    render(<StatusChip status="STOCK_RECEIVED" />);
    const chip = screen.getByText('Stock Received');
    const chipWrapper = chip.closest('.MuiChip-root');

    expect(chip).toBeInTheDocument();
    expect(chipWrapper).toHaveClass('MuiChip-colorSuccess');
  });

  it('should render Filled when FILLED status is passed in', () => {
    render(<StatusChip status="FILLED" />);
    const chip = screen.getByText('Filled');
    const chipWrapper = chip.closest('.MuiChip-root');

    expect(chip).toBeInTheDocument();
    expect(chipWrapper).toHaveClass('MuiChip-colorPrimary');
  });

  it('should render Picked Up when PICKED_UP status is passed in', () => {
    render(<StatusChip status="PICKED_UP" />);
    const chip = screen.getByText('Picked Up');
    const chipWrapper = chip.closest('.MuiChip-root');

    expect(chip).toBeInTheDocument();
    expect(chipWrapper).toHaveClass('MuiChip-colorPrimary');
  });

  it('should render Cancelled when CANCELLED status is passed in', () => {
    render(<StatusChip status="CANCELLED" />);
    const chip = screen.getByText('Cancelled');
    const chipWrapper = chip.closest('.MuiChip-root');

    expect(chip).toBeInTheDocument();
    expect(chipWrapper).toHaveClass('MuiChip-colorError');
  });

  // ? Added for Inventory & order statuses (TBD if needed)

  it('should render Insufficient Stock when INSUFFICIENT_STOCK status is passed in', () => {
    render(<StatusChip status="INSUFFICIENT_STOCK" />);
    const chip = screen.getByText('Insufficient Stock');
    const chipWrapper = chip.closest('.MuiChip-root');

    expect(chip).toBeInTheDocument();
    expect(chipWrapper).toHaveClass('MuiChip-colorError');
  });

  it('should render Ordered when ORDERED status is passed in', () => {
    render(<StatusChip status="ORDERED" />);
    const chip = screen.getByText('Ordered');
    const chipWrapper = chip.closest('.MuiChip-root');

    expect(chip).toBeInTheDocument();
    expect(chipWrapper).toHaveClass('MuiChip-colorWarning');
  });

  it('should render Received when RECEIVED status is passed in', () => {
    render(<StatusChip status="RECEIVED" />);
    const chip = screen.getByText('Received');
    const chipWrapper = chip.closest('.MuiChip-root');

    expect(chip).toBeInTheDocument();
    expect(chipWrapper).toHaveClass('MuiChip-colorPrimary');
  });

  it('should render status when status is not in the switch case, defaulting to primary color', () => {
    render(<StatusChip status="TEST_STATUS" />);
    const chip = screen.getByText('TEST_STATUS');
    const chipWrapper = chip.closest('.MuiChip-root');

    expect(chip).toBeInTheDocument();
    expect(chipWrapper).toHaveClass('MuiChip-colorPrimary');
  });

  it('should render status and custom color with 2 arguments are provided', () => {
    render(<StatusChip status="TEST_STATUS" color="error" />);
    const chip = screen.getByText('TEST_STATUS');
    const chipWrapper = chip.closest('.MuiChip-root');

    expect(chip).toBeInTheDocument();
    expect(chipWrapper).toHaveClass('MuiChip-colorError');
  });
});
