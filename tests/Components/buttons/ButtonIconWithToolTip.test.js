// import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { fireEvent, render, screen } from '@testing-library/react';
import ButtonIconWithToolTip from '../../../src/Components/buttons/ButtonIconWithToolTip';

describe('Test ButtonIconWithToolTip', () => {
  test('Test that Button renders', () => {
    render(<ButtonIconWithToolTip onClick={() => {}} />);
  });

  test('Test IconButton receives the correct color prop', () => {
    render(<ButtonIconWithToolTip onClick={() => {}} color="secondary" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'MuiButtonBase-root MuiIconButton-root MuiIconButton-colorSecondary'
    );
  });

  test('Test IconButton is disabled when disabled prop is true', () => {
    render(<ButtonIconWithToolTip onClick={() => {}} disabled />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  test('Test Tooltip displays the correct message', () => {
    render(
      <ButtonIconWithToolTip
        onClick={() => {}}
        toolTipMessage="Test ToolTip Message"
        icon={<AddIcon />}
      />
    );

    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('aria-label', 'Test ToolTip Message');
  });

  test('Test the onClick function is called when the button is clicked', () => {
    const handleClick = jest.fn();
    render(<ButtonIconWithToolTip onClick={handleClick} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('Test test the icon is rendered when provided', () => {
    render(<ButtonIconWithToolTip onClick={() => {}} icon={<AddIcon />} />);

    const iconTestId = screen.getByTestId('AddIcon');
    expect(iconTestId).toBeInTheDocument();
  });
});
