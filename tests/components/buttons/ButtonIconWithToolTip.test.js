import AddIcon from '@mui/icons-material/Add';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ButtonIconWithToolTip from '../../../src/components/buttons/ButtonIconWithToolTip';

describe('Test ButtonIconWithToolTip', () => {
  it('Should render the Button element', () => {
    render(<ButtonIconWithToolTip onClick={() => {}} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('Should render the correct color prop', () => {
    render(<ButtonIconWithToolTip onClick={() => {}} color="secondary" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'MuiButtonBase-root MuiIconButton-root MuiIconButton-colorSecondary'
    );
  });

  it('Should disable the button when the disabled prop is true', () => {
    render(<ButtonIconWithToolTip onClick={() => {}} disabled />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('Should display the correct Tool Tip message', async () => {
    render(
      <ButtonIconWithToolTip
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
    render(<ButtonIconWithToolTip onClick={handleClick} />);

    const button = screen.getByRole('button');
    
    expect(button).not.toBeDisabled();
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('Should render the Icon when provided', () => {
    render(<ButtonIconWithToolTip onClick={() => {}} icon={<AddIcon />} />);

    const iconTestId = screen.getByTestId('AddIcon');
    expect(iconTestId).toBeInTheDocument();
  });
});
