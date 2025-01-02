import { Button, Tooltip } from '@mui/material';

const buttonStyling = {
  margin: '15px 0',
};

/**
 * @param {Object} props
 * @param {() => void} props.onClick
 * @param {"text" | "contained" | "outlined"} [props.variant]
 * @param {"primary" | "secondary" | "error" | "inherit" | "default" | "info" | "success" | "warning"} [props.color]
 * @param {boolean} [props.disabled]
 * @param {string} [props.toolTipMessage]
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
    toolTipMessage,
    startIcon,
    endIcon,
  } = props;

  return (
    <Tooltip title={toolTipMessage}>
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
    </Tooltip>
  );
};

export default ButtonWithText;
