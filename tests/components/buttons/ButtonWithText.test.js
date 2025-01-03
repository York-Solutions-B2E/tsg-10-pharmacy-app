// import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ButtonWithText from '../../../src/components/buttons/ButtonWithText';

describe('Test ButtonWithText', () => {
  it('Should render the Button element', () => {
    render(<ButtonWithText onClick={() => {}} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('Should render the correct color prop', () => {
    render(<ButtonWithText onClick={() => {}} color="secondary" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedSecondary'
    );
  });

  it('Should render the correct button variant', () => {
    render(<ButtonWithText onClick={() => {}} variant="outlined" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'MuiButtonBase-root MuiButton-root MuiButton-outlined'
    );
  });

  it('Should disable the button when the disabled prop is true', () => {
    render(<ButtonWithText onClick={() => {}} disabled />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('Should display the correct Tool Tip message', async () => {
    render(
      <ButtonWithText
        onClick={() => {}}
        toolTipMessage="Test ToolTip Message"
        icon={<AddIcon />}
      />
    );

    userEvent.hover(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText('Test ToolTip Message')).toBeVisible();
    });
  });

  it('Should call the onClick function when the button is clicked', async () => {
    const handleClick = jest.fn();
    render(<ButtonWithText onClick={handleClick} />);

    const button = screen.getByRole('button');

    expect(button).not.toBeDisabled();
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('Should render the startIcon when provided', () => {
    render(<ButtonWithText onClick={() => {}} startIcon={<AddIcon />} />);

    expect(screen.getByTestId('AddIcon')).toBeInTheDocument();
  });

  it('Should render the endIcon when provided', () => {
    render(<ButtonWithText onClick={() => {}} endIcon={<AddIcon />} />);
    expect(screen.getByTestId('AddIcon')).toBeInTheDocument();
  });

  it('Should render the Button Text when provided', () => {
    render(<ButtonWithText onClick={() => {}} buttonText="Text Button Text" />);
    expect(screen.getByText('Text Button Text')).toBeInTheDocument();
  });
});
