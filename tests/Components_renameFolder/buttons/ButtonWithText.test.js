// import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { fireEvent, render, screen } from '@testing-library/react';
import ButtonWithText from '../../../src/Components/buttons/ButtonWithText';

describe('Test ButtonWithText', () => {
  test('Test that Button renders', () => {
    render(<ButtonWithText onClick={() => {}} />);
  });

  test('Test Button receives the correct color prop', () => {
    render(<ButtonWithText onClick={() => {}} color="secondary" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedSecondary'
    );
  });

  test('Test Button renders the correct variant', () => {
    render(<ButtonWithText onClick={() => {}} variant="outlined" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'MuiButtonBase-root MuiButton-root MuiButton-outlined'
    );
  });

  test('Test Button is disabled when disabled prop is true', () => {
    render(<ButtonWithText onClick={() => {}} disabled />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  test('Test Tooltip displays the correct message', () => {
    render(
      <ButtonWithText
        onClick={() => {}}
        toolTipMessage="Test ToolTip Message"
        icon={<AddIcon />}
      />
    );

    const buttonToolTip = screen.getByRole('button').closest('span');

    expect(buttonToolTip).toHaveAttribute('aria-label', 'Test ToolTip Message');
  });

  test('Test the onClick function is called when the button is clicked', () => {
    const handleClick = jest.fn();
    render(<ButtonWithText onClick={handleClick} />);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('Test test the startIcon is rendered when provided', () => {
    render(<ButtonWithText onClick={() => {}} startIcon={<AddIcon />} />);

    expect(screen.getByTestId('AddIcon')).toBeInTheDocument();
  });

  test('Test test the endIcon is rendered when provided', () => {
    render(<ButtonWithText onClick={() => {}} endIcon={<AddIcon />} />);
    expect(screen.getByTestId('AddIcon')).toBeInTheDocument();
  });

  test('Test test the Button Text is rendered when provided', () => {
    render(<ButtonWithText onClick={() => {}} buttonText="Text Button Text" />);
    expect(screen.getByText('Text Button Text')).toBeInTheDocument();
  });
});
