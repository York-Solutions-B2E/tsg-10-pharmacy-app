import { Button } from "@mui/material";

const buttonStyling = {
  margin: "15px 0",
};

/**
 * @param {Object} props
 * @param {() => void} props.onClick
 * @param {"text" | "contained" | "outlined"} [props.variant]
 * @param {boolean} [props.disabled]
 * @param {React.ReactNode} [props.startIcon]
 * @param {React.ReactNode} [props.endIcon]
 * @param {string} [props.buttonText]
 */
const ButtonWithText = (props) => {
  const { onClick, variant = "contained", disabled = false, buttonText = "click me", startIcon, endIcon } = props;

  return (
    <Button sx={buttonStyling} variant={variant} color="primary" disabled={disabled} startIcon={startIcon} endIcon={endIcon} onClick={onClick}>
      {buttonText}
    </Button>
  );
};

export default ButtonWithText;
