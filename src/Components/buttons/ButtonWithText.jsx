import { Button } from '@mui/material';

const buttonStyling = {
  margin: '15px 0',
};

/**
 * @param {Object} props
 * @param {() => void} props.onClick
 * @param {"text" | "contained" | "outlined"} [props.variant]
 * @param {"primary" | "secondary" | "error" | "inherit" | "default" | "info" | "success" | "warning"} [props.color]
 * @param {boolean} [props.disabled]
 * @param {React.ReactNode} [props.startIcon]
 * @param {React.ReactNode} [props.endIcon]
 * @param {string} [props.buttonText]
 */
const ButtonWithText = (props) => {
  const {
    onClick,
    variant = 'contained',
    color = 'primary',
    disabled = false,
    buttonText = 'click me',
    startIcon,
    endIcon,
  } = props;

  return (
    <Button
      sx={buttonStyling}
      variant={variant}
      color={color}
      disabled={disabled}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
    >
      {buttonText}
    </Button>
  );
};

export default ButtonWithText;
